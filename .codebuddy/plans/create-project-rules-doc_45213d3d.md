---
name: create-project-rules-doc
overview: 在 docs 目录下创建一个名为 PROJECT_RULES.md 的项目开发规范文档，涵盖目录、组件、页面和资源的规范。
todos:
  - id: explore-codebase
    content: 使用 [subagent:code-explorer] 调研现有 Vue 组件风格、Alova 配置及目录结构
    status: completed
  - id: plan-doc-structure
    content: 使用 [mcp:sequentialthinking] 规划规范文档的详细章节大纲与核心准则
    status: completed
    dependencies:
      - explore-codebase
  - id: ensure-docs-dir
    content: 使用 [mcp:execute_command] 检查并创建项目根目录下的 docs 文件夹
    status: completed
  - id: write-dir-rules
    content: 编写文档中的目录结构与自动路由规范章节
    status: completed
    dependencies:
      - plan-doc-structure
      - ensure-docs-dir
  - id: write-comp-logic-rules
    content: 编写组件开发规范（含 Naive UI）与 Pinia/Alova 逻辑规范章节
    status: completed
    dependencies:
      - plan-doc-structure
  - id: write-asset-style-rules
    content: 编写 UnoCSS 样式规范与资源管理（Icons/Assets）规范章节
    status: completed
    dependencies:
      - plan-doc-structure
  - id: finalize-doc
    content: 完成 PROJECT_RULES.md 的最终校对与文件保存
    status: completed
    dependencies:
      - write-dir-rules
      - write-comp-logic-rules
      - write-asset-style-rules
---

## 产品概述

在项目 `docs` 目录下创建 `PROJECT_RULES.md` 文档，旨在为基于 Vue 3 + Naive UI + Alova 的技术栈提供统一的开发规范指南，确保团队协作的代码一致性和项目结构的整洁。

## 核心内容

- **目录结构规范**：定义 `src` 下各模块（components, pages, store, hooks, assets 等）的职能分配。
- **组件开发规范**：明确 Vue 3 Composition API (Script Setup) 的编写习惯、Naive UI 组件的使用建议以及组件命名规则。
- **页面与路由规范**：基于 `unplugin-vue-router` 的自动路由逻辑，说明页面文件布局与路由参数定义方式。
- **状态管理与数据流**：规定 Pinia Store 的定义规范及 Alova 请求模块的封装与调用方式。
- **样式与资源规范**：说明 UnoCSS 的使用准则、静态资源管理以及图标（Iconify）的使用方式。

## 技术栈背景

- **核心框架**：Vue 3 (SFC, Script Setup) + TypeScript
- **UI 框架**：Naive UI
- **状态管理**：Pinia
- **请求层**：Alova
- **样式方案**：UnoCSS
- **构建插件**：unplugin-auto-import, unplugin-vue-components, unplugin-vue-router

## 系统架构（文档结构）

```mermaid
graph TD
    A[PROJECT_RULES.md] --> B[目录结构]
    A --> C[组件规范]
    A --> D[路由与页面]
    A --> E[状态管理]
    A --> F[网络请求]
    A --> G[样式与资源]
    
    B --> B1[src/pages 自动路由]
    B --> B2[src/components 分层]
    C --> C1[Naive UI 使用习惯]
    D --> D1[unplugin-vue-router 约定]
    E --> E1[Pinia Setup 模式]
    F --> F1[Alova 钩子封装]
    G --> G1[UnoCSS 原子化]
```

## Agent Extensions

### SubAgent

- **code-explorer**
- Purpose: 深入探索当前项目的实际代码结构、命名习惯及 Alova/Pinia 的具体实现方式。
- Expected outcome: 获取最真实的项目现状，确保编写的规范文档与现有代码高度契合。

### MCP

- **Sequential Thinking MCP Server**
- Purpose: 系统性地规划文档的目录大纲和每一章节的核心要点。
- Expected outcome: 生成逻辑严密、覆盖全面的规范文档大纲。
- **Windows CLI MCP Server**
- Purpose: 执行目录检查及文档文件的创建操作。
- Expected outcome: 确保 docs 目录存在并成功创建 PROJECT_RULES.md 文件。