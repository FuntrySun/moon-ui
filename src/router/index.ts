import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import { useAuthStore } from '@/stores/auth'

// 增强路由，注入布局组件
function setupLayouts(routes: readonly any[]) {
  return routes.map((route) => {
    const newRoute = { ...route }
    // 如果没有子路由，说明是叶子路由，我们需要给它包装一层布局
    if (!newRoute.children) {
      const isBlank = newRoute.meta?.layout === 'blank'
      return {
        path: newRoute.path,
        component: isBlank ? BlankLayout : DefaultLayout,
        children: [
          {
            ...newRoute,
            path: '' // 将原路由路径设为空，使其作为子路由渲染
          }
        ]
      }
    }
    
    // 如果有子路由，递归处理
    if (newRoute.children && newRoute.children.length > 0) {
      newRoute.children = setupLayouts(newRoute.children)
    }
    
    return newRoute
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // 公开页面列表（不需要登录）
  const publicPages = ['/auth/login', '/auth/register']
  const isPublicPage = publicPages.includes(to.path)
  
  // 检查是否需要认证（默认所有页面都需要认证，除非明确指定）
  const requiresAuth = to.meta.requiresAuth !== false
  
  // 如果是公开页面
  if (isPublicPage) {
    // 已登录用户访问登录/注册页，重定向到首页
    if (authStore.isAuthenticated) {
      next('/')
    } else {
      next()
    }
    return
  }
  
  // 如果页面需要认证但用户未登录
  if (requiresAuth && !authStore.isAuthenticated) {
    // 保存原访问路径，登录成功后跳转回来
    const redirect = to.fullPath
    next({
      path: '/auth/login',
      query: { redirect }
    })
    return
  }
  
  // 其他情况正常放行
  next()
})

export default router
