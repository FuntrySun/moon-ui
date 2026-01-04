---
name: fix-unocss-icons-in-dashboard
overview: 修复仪表盘页面中 UnoCSS 无法加载的 Carbon 图标名称。
todos:
  - id: explore-icon-usage
    content: 使用 [subagent:code-explorer] 在 src/pages/index.vue 中查找待修复的图标
    status: completed
  - id: fix-hdd-icon
    content: 将 i-carbon-hdd 替换为 i-carbon-h-d-d
    status: completed
    dependencies:
      - explore-icon-usage
  - id: fix-user-icon
    content: 将 i-carbon-user-plus 替换为 i-carbon-user-follow
    status: completed
    dependencies:
      - explore-icon-usage
  - id: verify-changes
    content: 验证文件内容确保图标名称修改正确
    status: completed
    dependencies:
      - fix-hdd-icon
      - fix-user-icon
---

## 产品概述

修复仪表盘页面（Dashboard）中由于图标命名不规范导致的 UnoCSS 图标加载失败问题。

## 核心功能

- **图标名称纠正**：将 `src/pages/index.vue` 中不正确的 Carbon 图标类名进行替换。
- 将 `i-carbon-hdd` 修正为 `i-carbon-h-d-d`。
- 将 `i-carbon-user-plus` 修正为 `i-carbon-user-follow`。
- **视觉效果**：修复后，仪表盘页面原本显示异常或空白的图标（硬盘图标和用户添加图标）将能够正常渲染，恢复预期的视觉设计。

## 技术栈

- **框架**: Vue 3 (Tauri)
- **样式方案**: UnoCSS
- **图标库**: @iconify-json/carbon

## 实现细节

由于这是一个针对现有项目的修复任务，我们将直接修改受影响的源文件。

### 修改范围

```
moon-ui/
└── src/
    └── pages/
        └── index.vue  # 目标修改文件
```

### 关键逻辑

- **字符串替换**: 通过精确匹配 UnoCSS 的图标类名，将其替换为 Iconify Carbon 集合中的标准命名规范。
- **UnoCSS 预设**: 确保 UnoCSS 的预设（PresetIcons）能够正确解析连字符形式的图标名称。

## Agent Extensions

### SubAgent

- **code-explorer**
- Purpose: 用于在 `src/pages/index.vue` 中精确查找 `i-carbon-hdd` 和 `i-carbon-user-plus` 的位置。
- Expected outcome: 确认图标在文件中的具体行号和使用上下文，确保替换不影响其他属性。