import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'

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

export default router
