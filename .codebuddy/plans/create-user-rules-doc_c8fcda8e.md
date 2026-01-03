---
name: create-user-rules-doc
overview: 在 docs 目录下创建一个名为 USER_RULES.md 的用户使用/贡献指南文档。
todos:
  - id: explore-project
    content: 使用 [subagent:code-explorer] 调研项目安装启动命令及现有文档风格
    status: completed
  - id: plan-content
    content: 使用 [mcp:sequentialthinking] 规划 USER_RULES.md 的详细大纲和各章节内容
    status: completed
    dependencies:
      - explore-project
  - id: check-docs-dir
    content: 使用 [mcp:Windows CLI MCP Server] 确认 docs 目录是否存在，若不存在则创建
    status: completed
    dependencies:
      - plan-content
  - id: create-user-rules
    content: 使用 [mcp:Windows CLI MCP Server] 在 docs 目录下创建 USER_RULES.md 文件
    status: completed
    dependencies:
      - check-docs-dir
  - id: write-content
    content: 将规划好的 Markdown 内容写入 USER_RULES.md 文件并保存
    status: completed
    dependencies:
      - create-user-rules
  - id: verify-doc
    content: 使用 [mcp:Windows CLI MCP Server] 读取并核对文档内容是否完整且格式正确
    status: completed
    dependencies:
      - write-content
---

## 产品概述

在项目的 `docs` 目录下创建一个名为 `USER_RULES.md` 的文档，旨在为新用户、外部贡献者和非核心开发人员提供清晰的项目使用与贡献指南。

## 核心内容

- **快速入门**：提供详细的项目启动、安装依赖及运行本地开发环境的步骤。
- **贡献流程**：定义如何提交 Issue、创建分支规范、Pull Request 流程以及代码审查标准。
- **环境要求**：列出项目运行所需的软件版本（如 Node.js, npm/pnpm 版本）及系统配置。
- **社区准则**：简述项目协作中的行为准则与沟通渠道。
- **常见问题**：针对新用户可能遇到的常见环境配置或运行错误提供解决方案。

## 方案选择

- **文档格式**：Markdown (.md) - 标准的文档编写格式，易于在 GitHub/GitLab 等平台阅读。
- **目录结构**：位于 `docs/` 目录下，确保文档体系的一致性。

## 架构说明

该文档作为项目元数据的一部分，不涉及运行代码。它通过清晰的层级结构（Headers）和代码块（Code Blocks）来确保信息的易读性和可操作性。

## 实施详情

### 目录结构

```
moon-ui/
├── docs/
│   ├── PROJECT_RULES.md  # 既有项目规则
│   └── USER_RULES.md     # 新增用户指南
```

## Agent Extensions

### SubAgent

- **code-explorer**
- Purpose: 探索现有 `docs/` 目录结构和 `package.json` 中的脚本命令，确保指南内容的准确性。
- Expected outcome: 获取安装依赖、启动项目的具体命令。

### MCP

- **Sequential Thinking MCP Server**
- Purpose: 系统化地构思文档的大纲和具体内容，确保覆盖所有用户关注点。
- Expected outcome: 形成结构完整、逻辑严密的文档内容草案。
- **Windows CLI MCP Server**
- Purpose: 执行文件创建和目录检查操作。
- Expected outcome: 在指定路径成功创建 `USER_RULES.md` 文件。