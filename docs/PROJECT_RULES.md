# Moon UI 项目开发规范

本文档旨在统一 Moon UI 项目的开发习惯，涵盖目录结构、组件封装、页面创建及静态资源管理等核心准则。

## 1. 目录创建规则

项目采用模块化结构，核心源码位于 `src` 目录：

- `src/pages/`: **业务页面**。遵循 `unplugin-vue-router` 规则，文件夹/文件即路由。
- `src/components/`: **全局通用组件**。用于跨页面复用的基础组件或复杂业务组件。
- `src/layouts/`: **布局组件**。管理页面的整体框架（如 `DefaultLayout`, `BlankLayout`）。
- `src/assets/`: **静态资源**。存放源码中引用的图片、SVG、全局样式等。
- `src/hooks/`: **全局 Composables**。存放可复用的组合式逻辑。
- `src/services/`: **业务服务层**。存放 API 调用（Alova）及核心业务逻辑。
- `src/stores/`: **状态管理**。使用 Pinia 管理全局状态。
- `src/types/`: **类型定义**。统一存放 TypeScript 的 Interface 和 Type。
- `src/utils/`: **工具函数**。纯函数工具类。

**局部性原则**：
- 如果组件/逻辑仅在某个页面使用，应存放在该页面文件夹下的 `components/` 或 `composables/` 目录中。
- 如果静态资源/类型定义仅用于某个页面，应存放在该页面文件夹下的 `assets/`或 `types/`目录中。
---

## 2. 组件封装规则

### 命名规范
- **文件命名**：使用 PascalCase（大驼峰），如 `UserCard.vue`。
- **组件引用**：在模板中建议使用 PascalCase 以保持一致。

### 结构规范
- 使用 `<script setup lang="ts">`。
- **Props**: 必须显式定义类型，推荐使用 `withDefaults` 设置默认值。
- **Emits**: 必须显式定义，提升类型安全性。

### 封装准则
- **高内聚低耦合**：组件应只关注自身功能，通过 Props 接收数据，通过 Emits 向上通信。
- **自动导入**：项目配置了 `unplugin-vue-components`，在 `src/components` 和 `src/pages/**/components` 下的组件无需手动 import 即可直接使用。
- **UI 库**：优先使用 Naive UI 组件进行扩展，避免重复造轮子。

---

## 3. 页面创建规则

### 路由自动化
- 页面文件存放于 `src/pages`。
- `unplugin-vue-router` 会根据文件结构自动生成路由：
  - `src/pages/index.vue` -> `/`
  - `src/pages/about/index.vue` -> `/about`
  - `src/pages/auth/login.vue` -> `/auth/login`

### 页面结构
- 页面应作为“容器组件”，负责组合业务组件和处理页面级状态。
- 复杂的业务逻辑应抽离到 `composables`。

---

## 4. 静态资源存放规则

### 资源分类
- `public/`: 存放不经过 Webpack/Vite 编译的资源，如 `favicon.ico`、大型静态数据。
- `src/assets/`: 存放参与编译的资源。
  - `src/assets/images/`: 业务图片。
  - `src/assets/icons/`: SVG 图标或字体图标。
  - `src/assets/styles/`: 全局 CSS/SCSS。

### 引用规范
- 在代码中使用 `@/assets/` 别名引用资源。
- **图标使用**：优先使用 UnoCSS 的图标类（如 `i-carbon-user`），减少静态图片的使用。

---

## 5. 技术栈准则 (补充)

- **样式**：优先使用 **UnoCSS** 原子化类名，减少 `style` 块的使用。
- **网络请求**：使用 **Alova** 进行请求封装，统一处理拦截器和错误提示。
- **状态管理**：使用 **Pinia**，并根据需要配置持久化插件。
