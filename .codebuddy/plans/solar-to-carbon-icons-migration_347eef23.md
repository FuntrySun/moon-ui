---
name: solar-to-carbon-icons-migration
overview: 将项目中所有 Solar 图标集替换为 Carbon 图标集，共涉及 27 处图标使用，分布在 4 个文件中。
todos:
  - id: scan-solar-icons
    content: 使用 [subagent:code-explorer] 扫描项目中所有 Solar 图标使用位置
    status: completed
  - id: generate-mapping
    content: 分析并生成 Solar 到 Carbon 的详细图标映射表
    status: completed
    dependencies:
      - scan-solar-icons
  - id: review-mapping
    content: 提供映射表供用户确认，确保图标语义匹配准确
    status: completed
    dependencies:
      - generate-mapping
  - id: execute-replacement
    content: 使用 [mcp:Windows CLI MCP Server] 批量替换所有图标类名
    status: completed
    dependencies:
      - review-mapping
  - id: verify-replacement
    content: 验证替换后的图标显示效果和功能完整性
    status: completed
    dependencies:
      - execute-replacement
---

## 产品概述

将 Moon UI 项目中使用的所有 Solar 图标集迁移至 Carbon 图标集，确保视觉一致性和功能完整性。项目已安装 @iconify-json/carbon 包并使用 UnoCSS presetIcons 处理图标。

## 核心功能

- 分析现有 Solar 图标使用情况（共 27 处，分布在 4 个文件中）
- 为每个 Solar 图标匹配最相似的 Carbon 图标
- 生成详细的图标映射表供确认
- 批量替换所有图标引用
- 验证替换后的视觉效果和功能正常性

## 技术栈

- 图标系统：UnoCSS presetIcons + @iconify-json/carbon
- 图标格式：使用 `i-carbon-icon-name` 类名格式
- 文件操作：基于现有项目结构进行替换

## 技术架构

### 系统架构

本次迁移为 UI 层面的图标替换任务，不涉及架构变更，遵循项目现有的 UnoCSS 图标处理机制。

### 模块划分

- **图标映射模块**：负责 Solar 到 Carbon 的图标匹配逻辑
- **文件替换模块**：批量更新 4 个文件中的图标类名
- **验证模块**：确保替换后图标显示正常

### 数据流

```mermaid
flowchart LR
    A[扫描项目文件] --> B[提取 Solar 图标列表]
    B --> C[匹配 Carbon 图标]
    C --> D[生成映射表]
    D --> E[用户确认]
    E --> F[批量替换文件]
    F --> G[验证显示效果]
```

## 实现细节

### 核心目录结构

涉及的文件分布：

```
project-root/
├── src/
│   ├── components/          # 组件中的图标使用
│   ├── pages/               # 页面中的图标使用
│   └── layouts/             # 布局中的图标使用
```

### 关键代码结构

**图标映射数据结构**：定义 Solar 图标到 Carbon 图标的映射关系，包含原图标名称、推荐的 Carbon 图标名称及匹配理由。

```typescript
interface IconMapping {
  solarIcon: string;      // 原 Solar 图标名称
  carbonIcon: string;     // 推荐的 Carbon 图标名称
  reason: string;         // 匹配理由
  fileLocations: string[]; // 使用该图标的文件路径
}
```

### 技术实现计划

#### 1. 图标匹配分析

- **问题陈述**：需要为 27 个 Solar 图标找到视觉和语义最相似的 Carbon 图标
- **解决方案**：通过分析图标名称语义和视觉特征，结合 Carbon 图标库文档进行智能匹配
- **关键技术**：使用 [subagent:code-explorer] 扫描项目文件，提取所有 Solar 图标使用位置
- **实施步骤**：

1. 扫描项目中所有使用 `i-solar-*` 格式的类名
2. 统计每个图标的使用频次和上下文
3. 在 Carbon 图标库中查找对应图标
4. 生成带有匹配理由的映射表

- **测试策略**：人工审核映射表的合理性，确保图标语义一致

#### 2. 批量替换执行

- **问题陈述**：需要在 4 个文件中精准替换 27 处图标引用
- **解决方案**：使用正则表达式批量替换 `i-solar-*` 为对应的 `i-carbon-*`
- **关键技术**：[mcp:Windows CLI MCP Server] 执行文件内容替换命令
- **实施步骤**：

1. 基于确认后的映射表生成替换脚本
2. 逐文件执行类名替换
3. 保留原有的图标尺寸和样式类

- **测试策略**：替换后对比文件差异，确保仅修改了图标类名

### 集成要点

- UnoCSS 会自动识别 `i-carbon-*` 格式的类名并加载对应图标
- 无需修改 UnoCSS 配置，因为 @iconify-json/carbon 已安装
- 图标类名格式从 `i-solar-icon-name` 变更为 `i-carbon-icon-name`

## 代理扩展

### SubAgent

- **code-explorer**
- 目的：扫描项目中所有使用 Solar 图标的文件和位置
- 预期结果：生成完整的 Solar 图标使用清单，包含文件路径、行号和上下文

### MCP

- **Windows CLI MCP Server**
- 目的：执行文件内容批量替换操作
- 预期结果：将所有 Solar 图标类名精准替换为对应的 Carbon 图标类名