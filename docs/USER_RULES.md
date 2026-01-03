# Moon UI 开发者个人开发准则 (USER_RULES)

本文档定义了我作为开发者在 Moon UI 项目中的核心技术实现标准。所有代码编写必须严格遵循以下原则，以确保系统的高度可维护性与视觉一致性。

## 1. 命名规范 (Naming Convention)

全量推行 **camelCase（小驼峰）** 命名法，禁止在业务逻辑中使用下划线或大驼峰（组件名除外）。

- **变量与常量**：使用 `camelCase`。例如：`const userInfo = ...`, `const isLoading = true`。
- **函数名**：使用 `camelCase`。例如：`function handleButtonClick() { ... }`。
- **Props 与 Emits**：在 Vue 组件定义中强制使用 `camelCase`。
- **响应式数据**：`ref` 和 `reactive` 定义的对象属性均使用 `camelCase`。

---

## 2. API 封装规范 (API & Alova)

强制执行 **Service 层集中管理机制**。禁止在页面组件（`.vue`）或局部逻辑中直接通过 Alova 实例发起原始请求。

- **存储位置**：所有请求必须封装在 `src/services/` 目录下。
- **封装形式**：每个 Service 文件导出具名的 Alova Method 实例。
- **调用方式**：页面仅负责通过 `useRequest` 等 Hook 调用这些预定义的 Service。

**示例：**
```typescript
// @/services/auth.ts
export const loginApi = (data: LoginParams) => alovaInstance.Post('/auth/login', data);

// @/pages/login.vue
const { loading, send } = useRequest(loginApi(formData), { immediate: false });
```

---

## 3. 状态管理规范 (State Management)

强制采用 **功能领域驱动 (Domain-driven)** 的 Store 拆分模式，禁止按页面路由创建 Store。

- **拆分维度**：按业务领域划分为 `auth` (鉴权), `user` (用户信息), `sys` (系统配置/主题), `config` (全局常量) 等。
- **目录结构**：存放于 `src/stores/`，每个领域一个文件。
- **持久化**：仅对必要的系统配置或鉴权信息开启持久化插件。

---

## 4. 样式开发规范 (Styling & UnoCSS)

强制执行 **原子化 CSS 优先原则**，严格禁止在 `<style>` 块中编写硬编码的样式值。

- **间距与尺寸**：必须使用 UnoCSS 的工具类。例如：使用 `m-16px` 代替 `margin: 16px`，使用 `w-full` 代替 `width: 100%`。
- **颜色**：强制引用 UnoCSS 预设色值或主题变量。例如：`text-blue-500`, `bg-gray-100`。
- **禁止项**：
  - 禁止在 `<style>` 中出现 `px`, `rem`, `vh` 等硬编码数值。
  - 禁止在 `<style>` 中直接定义业务颜色（如 `#ff5500`），应扩展 `uno.config.ts`。
- **例外**：仅允许在处理极为复杂的第三方库样式覆盖或 CSS 动画时使用少量必要的自定义 CSS。

---

## 5. 开发心法

- **逻辑抽离**：复杂的页面逻辑必须抽离到同目录下的 `composables/`。
- **类型安全**：所有 Service 入参及 Store 状态必须定义对应的 `Interface`。
- **视觉一致**：UI 调整优先通过修改全局配置而非局部样式实现。
