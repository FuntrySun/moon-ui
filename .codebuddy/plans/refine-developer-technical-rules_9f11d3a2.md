---
name: refine-developer-technical-rules
overview: 将用户定义的 4 项核心开发准则（命名、接口封装、状态管理、样式规范）重写进 docs/USER_RULES.md，并确保与 PROJECT_RULES.md 互补。
todos:
  - id: explore-existing-rules
    content: 使用 [subagent:code-explorer] 调研 `PROJECT_RULES.md` 和现有 `USER_RULES.md` 内容
    status: completed
  - id: analyze-technical-standards
    content: 使用 [mcp:Sequential Thinking MCP Server] 梳理四项核心准则的详细技术标准
    status: completed
    dependencies:
      - explore-existing-rules
  - id: draft-naming-and-api-rules
    content: 起草小驼峰命名与 Alova 强制封装的技术实现细节
    status: completed
    dependencies:
      - analyze-technical-standards
  - id: draft-store-and-style-rules
    content: 起草功能领域 Store 与 UnoCSS 原子化 CSS 的使用规范
    status: completed
    dependencies:
      - analyze-technical-standards
  - id: rewrite-user-rules-file
    content: 使用 [mcp:Windows CLI MCP Server] 执行命令重写 `docs/USER_RULES.md`
    status: completed
    dependencies:
      - draft-naming-and-api-rules
      - draft-store-and-style-rules
  - id: verify-document-consistency
    content: 检查新文档与项目全局规则的互补性及排版视觉效果
    status: completed
    dependencies:
      - rewrite-user-rules-file
---

## Product Overview

开发者技术实现准则文档（USER_RULES.md），旨在为前端项目提供一套明确的、面向技术实现的编码标准。

## Core Features

- **命名规范标准**：定义变量、函数、属性及文件命名的统一小驼峰（camelCase）规则，确保代码风格一致。
- **接口封装规范**：建立 Alova 强制封装机制，指导如何进行 API 调用与 Hook 化管理。
- **状态管理规范**：明确基于功能领域（Domain-based）的 Store 划分原则与状态流转模式。
- **样式开发规范**：规范 UnoCSS 原子化 CSS 的使用，替代传统 CSS 编写方式。
- **文档互补结构**：采用结构化 Markdown 排版，通过清晰的标题、代码示例和列表，确保与现有项目规则互补且易于阅读。

## Tech Stack

- **API Client**: Alova.js (强制封装)
- **CSS Framework**: UnoCSS (原子化 CSS)
- **State Management**: Functional Domain Store (如 Pinia 或 Zustand)
- **Naming Convention**: camelCase (小驼峰)
- **Documentation**: Markdown

## Architecture Design

### Module Division

- **Naming Module**: 定义基础语法层的命名约束。
- **Network Module**: 基于 Alova 的接口层封装逻辑。
- **Storage Module**: 业务领域驱动的状态存储结构。
- **Styling Module**: 原子化样式引用与类名规范。

## Implementation Details

### Core Directory Structure

```
project-root/
└── docs/
    ├── USER_RULES.md       # 目标文件：开发者技术准则
    └── PROJECT_RULES.md    # 关联文件：项目全局规则
```

### Technical Implementation Plan

1. **内容整合**：将分散的开发偏好转化为结构化的技术准则。
2. **逻辑对齐**：通过顺序思考确保 USER_RULES 与 PROJECT_RULES 之间无冲突且全覆盖。
3. **示例编写**：为 Alova 封装和 UnoCSS 使用提供直观的代码片段示例。

## Agent Extensions

### SubAgent

- **code-explorer**
- Purpose: 深入探索 `PROJECT_RULES.md` 和旧版 `USER_RULES.md` 的内容，确保新规不与其冲突。
- Expected outcome: 获取现有规则的完整上下文，识别需要补充或重写的技术点。

### MCP

- **Sequential Thinking MCP Server**
- Purpose: 梳理四项核心开发准则（命名、接口、状态、样式）的具体落地逻辑。
- Expected outcome: 生成结构严密、逻辑自洽的文档大纲与核心条款。
- **Windows CLI MCP Server**
- Purpose: 执行文件读取与写入命令，直接修改或重写 `docs/USER_RULES.md`。
- Expected outcome: 成功更新文档内容，确保文件路径与格式正确。