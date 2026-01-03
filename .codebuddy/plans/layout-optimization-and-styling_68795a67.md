---
name: layout-optimization-and-styling
overview: 修复 DefaultLayout.vue 的布局问题，并根据用户要求将面包屑样式调整为卡片式风格。
design:
  architecture:
    component: tdesign
  styleKeywords:
    - 卡片式设计
    - 现代简约
    - 粘性定位
  fontSystem:
    fontFamily: PingFang SC
    heading:
      size: 24px
      weight: 600
    subheading:
      size: 16px
      weight: 500
    body:
      size: 14px
      weight: 400
  colorSystem:
    primary:
      - "#0052D9"
    background:
      - "#F3F3F3"
      - "#FFFFFF"
    text:
      - "#1F1F1F"
      - "#5F5F5F"
    functional:
      - "#E7E7E7"
todos:
  - id: explore-layout
    content: 使用 [subagent:code-explorer] 分析 DefaultLayout.vue 及其面包屑子组件结构
    status: completed
  - id: side-menu-collapsed
    content: "修改侧边栏组件状态，将其默认值设置为收起 (collapsed: true)"
    status: completed
    dependencies:
      - explore-layout
  - id: fix-footer-sticky
    content: 使用 [mcp:sequentialthinking] 规划并修复 Footer 的 CSS 粘性定位问题
    status: completed
    dependencies:
      - explore-layout
  - id: breadcrumb-card-style
    content: 重写面包屑样式，实现白色背景、圆角及阴影的卡片视觉效果
    status: completed
    dependencies:
      - explore-layout
  - id: layout-spacing-adjustment
    content: 调整内容区域与卡片式面包屑之间的间距，优化呼吸感
    status: completed
    dependencies:
      - breadcrumb-card-style
  - id: verify-layout
    content: 使用 [mcp:windows-cli-mcp-server] 检查并保存最终代码变更
    status: completed
    dependencies:
      - side-menu-collapsed
      - fix-footer-sticky
      - layout-spacing-adjustment
---

## 产品概览

针对 `DefaultLayout.vue` 进行布局优化与样式升级，旨在提升用户界面的整洁度与交互体验。重点修复布局细节问题，并引入更具现代感的卡片式面包屑设计。

## 核心功能

- **侧边栏默认状态调整**：将左侧导航菜单默认设置为收起状态，以扩大内容展示区域。
- **Footer 布局修复**：确保页脚（Footer）在内容不足时依然能正确实现粘性定位（Sticky/Fixed），保持页面底部整洁。
- **面包屑样式卡片化**：将传统面包屑导航重构为悬浮卡片风格，包含阴影效果、圆角处理及适当的内边距。
- **全局布局一致性**：优化整体容器的间距与对齐方式，确保内容区域在各种分辨率下的视觉平衡。

## 技术栈

- **前端框架**: Vue 3 (SFC)
- **样式处理**: CSS / Tailwind CSS (基于项目现有配置)
- **组件库**: 适配项目现有的 UI 组件库逻辑

## 技术细节

### 模块划分

- **布局模块 (Layout)**: 修改 `DefaultLayout.vue`，调整 `Sider` 状态逻辑及 `Footer` 定位逻辑。
- **导航模块 (Breadcrumb)**: 独立样式定制或重写面包屑组件样式类，实现卡片化视觉。

### 数据流

1. 初始化加载时，布局组件读取配置，设置侧边栏 `collapsed` 状态为 `true`。
2. 路由变化时，面包屑组件根据当前路由路径生成卡片式导航项。

## 设计方案

布局采用侧边栏+顶部导航+主体内容的经典结构。面包屑导航从简单的文本链接转变为独立的白色半透明卡片，增强层级感。

- **面包屑卡片设计**: 采用 `box-shadow` (0 2px 12px 0 rgba(0,0,0,0.1))，设置 `border-radius: 8px`，背景色为白色或极浅灰色。
- **侧边栏状态**: 默认宽度缩小（Collapsed），悬浮展开或点击切换。
- **Footer 优化**: 使用 `flex-direction: column` 配合 `min-height: 100vh` 确保页脚始终位于视口底部。

## Agent Extensions

### SubAgent

- **code-explorer**
- Purpose: 定位 `DefaultLayout.vue` 的准确路径并检索关联的面包屑组件代码。
- Expected outcome: 确认布局文件结构及样式定义位置。

### MCP

- **Sequential Thinking MCP Server**
- Purpose: 逻辑化拆解布局修复与卡片式样式重构的步骤。
- Expected outcome: 确保代码修改顺序正确，不影响现有功能。
- **Windows CLI MCP Server**
- Purpose: 读取源码并验证文件修改情况。
- Expected outcome: 完成文件的读取、修改与保存。