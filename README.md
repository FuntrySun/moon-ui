# 🌙 Moon UI

<p align="center">
  <img src="./src/assets/vue.svg" width="120" height="120" alt="Moon UI Logo">
</p>

<p align="center">
  基于 <b>Tauri 2.0</b> + <b>Vue 3</b> + <b>Rust</b> 构建的现代化跨平台桌面应用开发模板。
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Tauri-2.0.0-FFC131?logo=tauri&logoColor=white" alt="Tauri">
  <img src="https://img.shields.io/badge/Vue-3.5.13-4FC08D?logo=vue.js&logoColor=white" alt="Vue">
  <img src="https://img.shields.io/badge/Rust-2021-000000?logo=rust&logoColor=white" alt="Rust">
  <img src="https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/pnpm-10.27.0-F69220?logo=pnpm&logoColor=white" alt="pnpm">
</p>

---

## 🚀 项目特性

- ⚡ **极致体验**: 基于 Tauri 2.0，相比 Electron 拥有更小的包体积和更低的内存占用。
- 🎨 **颜值担当**: 内置 [Naive UI](https://www.naiveui.com/) 组件库，配合 [UnoCSS](https://unocss.dev/) 原子化 CSS 引擎，快速构建精美界面。
- 📦 **自动导入**: 全面集成 `unplugin-auto-import` 和 `unplugin-vue-components`，函数、组件无需手动 import。
- 🛣️ **自动路由**: 使用 `unplugin-vue-router` 实现基于文件的自动路由管理。
- 🔗 **高效请求**: 封装 [Alova.js](https://alova.js.org/)，支持自动进度追踪、响应式状态管理和更优雅的请求拦截。
- 🛠️ **系统集成**: 深度封装 Tauri 原生 API（文件系统、对话框、剪贴板、窗口控制、系统信息等）。
- 🌙 **主题适配**: 完美支持明亮/暗黑/跟随系统主题切换。
- 🧹 **代码规范**: 内置 ESLint 9 + Prettier，支持保存自动格式化。

## 🛠️ 技术栈清单

### 前端 (Frontend)
- **核心框架**: `Vue 3.5` (Composition API)
- **构建工具**: `Vite 6.0`
- **状态管理**: `Pinia 3.0` + `Persistedstate` (持久化)
- **网络请求**: `Alova 3.4`
- **组件库**: `Naive UI 2.43`
- **样式引擎**: `UnoCSS 66.5`
- **路由管理**: `Vue Router 4.6` (基于文件自动扫描)

### 后端 (Backend / Desktop)
- **跨平台框架**: `Tauri 2.0`
- **核心语言**: `Rust 2021`
- **系统插件**:
  - `fs`: 原生文件系统操作
  - `dialog`: 原生系统对话框
  - `clipboard-manager`: 系统剪贴板管理
  - `os`: 系统信息获取
  - `shell`: 外部命令执行
  - `opener`: 外部链接/文件打开

## 📂 项目结构

```text
moon-ui/
├── public/               # 公共静态资源
├── src/                  # 前端源码
│   ├── api/              # 接口请求定义
│   ├── assets/           # 静态资源 (图片、样式等)
│   ├── hooks/            # 组合式函数 (useTheme, useUpload, etc.)
│   ├── pages/            # 页面组件 (基于文件自动路由)
│   ├── router/           # 路由配置 (unplugin-vue-router)
│   ├── store/            # Pinia 状态管理 (Token、持久化)
│   ├── utils/            # 工具类
│   │   ├── http/         # Alova 请求工具封装
│   │   └── sys/          # Tauri 原生 API 封装 (Window, Path, etc.)
│   ├── App.vue           # 根组件
│   ├── main.ts           # 项目入口文件
│   └── vite-env.d.ts     # 环境变量类型定义
├── src-tauri/            # Rust 后端源码
│   ├── src/              # Rust 核心逻辑 (lib.rs, main.rs)
│   ├── Cargo.toml        # Rust 依赖配置
│   └── tauri.conf.json   # Tauri 应用配置
├── .env*                 # 环境变量配置 (Development/Production)
├── eslint.config.js      # ESLint 9 扁平化配置
├── tsconfig.json         # TypeScript 配置文件
└── vite.config.ts        # Vite 配置文件
```

## 🛠️ 开发与构建

### 前提条件
- 已安装 [Rust](https://www.rust-lang.org/tools/install) 环境
- 已安装 [Node.js](https://nodejs.org/)
- **包管理器**: 必须使用 [pnpm](https://pnpm.io/)

### 快速开始
```bash
# 安装依赖
pnpm install

# 启动开发服务器 (Tauri 模式)
pnpm tauri dev

# 代码格式化
pnpm format

# 项目打包
pnpm tauri build
```

## 📄 开源协议
[MIT License](./LICENSE)
