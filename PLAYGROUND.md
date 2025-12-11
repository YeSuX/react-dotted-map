# React Dotted Map - Playground 完整指南

本文档介绍 playground 目录的完整结构和使用方法。

## 📁 目录结构

```
src/playground/
├── PlaygroundApp.tsx           # 主应用入口，包含导航和所有示例
├── README.md                   # Playground 使用文档
├── index.ts                    # 导出所有示例组件
│
├── 快速开始示例/
│   ├── BasicExample.tsx        # 基础用法：最简单的地图渲染
│   ├── RenderPropsExample.tsx  # Render Props 模式：添加自定义 Pin 点
│   └── HookExample.tsx         # Hook 模式：程序化控制和交互
│
├── 使用场景示例/
│   ├── CountryFilterExample.tsx      # 按国家过滤和着色
│   ├── UserDistributionExample.tsx   # 用户分布可视化
│   ├── InteractiveMapExample.tsx     # 交互式地图（悬停/点击）
│   └── RegionComparisonExample.tsx   # 区域对比（多国对比）
│
├── 高级功能示例/
│   ├── GridShapeExample.tsx          # 网格类型和形状对比
│   ├── CustomRegionExample.tsx       # 自定义地理边界
│   └── FactoryExample.tsx            # Factory 模式综合示例
```

## 🎯 示例概览

### 1. 快速开始示例

#### BasicExample - 基础用法

- **对应 README 章节**: 🚀 快速开始 → 1. 基础组件用法
- **核心内容**:
  - 使用 `useMapFactory` 生成地图配置
  - 使用 `<DottedMap>` 组件自动渲染
  - 基本样式配置（颜色、形状、大小）

#### RenderPropsExample - Render Props 模式

- **对应 README 章节**: 🚀 快速开始 → 2. Render Props 模式
- **核心内容**:
  - 使用 children 函数获取地图实例
  - 通过 `instance.addPin()` 添加自定义 Pin 点
  - 使用 `instance.getSVG()` 自定义渲染
  - 展示全球主要城市（纽约、伦敦、东京、巴黎、悉尼）

#### HookExample - Hook 模式

- **对应 README 章节**: 🚀 快速开始 → 3. Hook 模式
- **核心内容**:
  - 使用 `useDottedMap` Hook 获取地图实例
  - 程序化添加随机 Pin 点
  - 状态管理和交互控制
  - 显示统计信息（Pin 点总数）

### 2. 使用场景示例

#### CountryFilterExample - 按国家过滤和着色

- **对应 README 章节**: 🚀 快速开始 → 4. 按国家过滤和着色
- **核心内容**:
  - 使用 `countries` 参数过滤特定国家
  - 使用 `countryColors` 为不同国家设置颜色
  - 展示 USA、CHN、JPN、GBR 四国
  - 带有颜色图例的完整 UI

#### UserDistributionExample - 用户分布可视化

- **对应 README 章节**: 🎨 使用场景 → 场景 1: 数据可视化
- **核心内容**:
  - 模拟 10 个全球用户数据
  - 区分付费用户和免费用户（不同颜色）
  - 动态数据可视化
  - 统计信息展示

#### InteractiveMapExample - 交互式地图

- **对应 README 章节**: 🎨 使用场景 → 场景 2: 交互式地图
- **核心内容**:
  - 点击和悬停交互
  - 状态管理（选中/悬停状态）
  - 动态信息卡片显示
  - 城市详细信息（人口、国家）
  - 按钮交互控制

#### RegionComparisonExample - 区域对比

- **对应 README 章节**: 🎨 使用场景 → 场景 3: 区域对比
- **核心内容**:
  - 对比 USA、CHN、IND、BRA 四个主要经济体
  - 使用 `hexagon` 形状
  - 展示经济数据（GDP、人口）
  - 数据卡片网格布局

### 3. 高级功能示例

#### GridShapeExample - 网格类型和形状对比

- **核心内容**:
  - 展示三种网格类型：`square`、`diagonal`、`vertical`
  - 展示两种形状：`circle`、`hexagon`
  - 2x2 网格对比布局
  - 视觉差异对比

#### CustomRegionExample - 自定义地理边界

- **对应 README 章节**: ⚙️ 高级用法 → 自定义区域边界
- **核心内容**:
  - 使用 `region` 参数限制经纬度范围
  - 展示三个区域：北美、欧洲、东亚
  - 独立渲染各区域
  - 显示边界坐标信息

#### FactoryExample - Factory 模式综合示例

- **核心内容**:
  - 使用 `<DottedMapFactory>` 组件
  - 多种配置场景：
    - 世界地图
    - 特定国家（USA）
    - 自定义 Pin 点（主要城市）
    - 区域地图（亚太）
    - 按国家着色（Canvas 模式）
    - 高性能 Canvas 渲染

## 🚀 运行 Playground

### 开发模式

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:5173` 查看完整 playground。

### 构建

```bash
# 构建库
npm run build

# 构建演示站点
npm run build:demo
```

## 🎨 PlaygroundApp 功能

主应用 `PlaygroundApp.tsx` 提供了完整的导航和展示系统：

### 功能特性

1. **分类导航**

   - 快速开始（Quick Start）
   - 使用场景（Use Cases）
   - 高级功能（Advanced）

2. **示例切换**

   - "Show All" 显示所有示例
   - 单独显示任一示例
   - 按钮式导航，状态高亮

3. **响应式布局**

   - 最大宽度 1400px，居中显示
   - 卡片式设计
   - 移动端友好

4. **视觉设计**
   - 清晰的层次结构
   - 一致的颜色方案（Tailwind 色板）
   - 优雅的阴影和圆角

## 📖 学习路径建议

### 初学者路径

1. **BasicExample** - 理解最基本用法
2. **RenderPropsExample** - 学习如何添加 Pin 点
3. **HookExample** - 掌握程序化控制
4. **CountryFilterExample** - 了解国家过滤功能

### 实战应用路径

1. **UserDistributionExample** - 数据可视化场景
2. **InteractiveMapExample** - 交互式应用
3. **RegionComparisonExample** - 多区域对比
4. **CustomRegionExample** - 自定义区域展示

### 高级定制路径

1. **GridShapeExample** - 理解网格和形状选项
2. **FactoryExample** - 掌握 Factory 模式
3. 阅读 `src/services/` 源码 - 深入底层实现

## 🔧 自定义和扩展

### 添加新示例

1. 在 `src/playground/` 创建新文件 `YourExample.tsx`
2. 导出 default 组件
3. 在 `index.ts` 中导出
4. 在 `PlaygroundApp.tsx` 的 `examples` 数组中添加配置：

```tsx
{
  key: "yourExample",
  label: "Your Example",
  component: YourExample,
  category: "Use Cases" // 或其他分类
}
```

### 修改样式主题

在 `PlaygroundApp.tsx` 中修改全局样式变量：

```tsx
const theme = {
  primary: "#3b82f6", // 主色
  background: "#f8fafc", // 背景色
  card: "#ffffff", // 卡片背景
  text: "#0f172a", // 主文本
  textSecondary: "#64748b", // 次要文本
};
```

## 📊 示例对应关系

| Playground 示例         | README 章节 | 核心 API                        |
| ----------------------- | ----------- | ------------------------------- |
| BasicExample            | 快速开始 1  | `useMapFactory`, `<DottedMap>`  |
| RenderPropsExample      | 快速开始 2  | `children`, `instance.addPin()` |
| HookExample             | 快速开始 3  | `useDottedMap`                  |
| CountryFilterExample    | 快速开始 4  | `countries`, `countryColors`    |
| UserDistributionExample | 使用场景 1  | Render props + 数据映射         |
| InteractiveMapExample   | 使用场景 2  | 状态管理 + 交互                 |
| RegionComparisonExample | 使用场景 3  | 多国着色 + 数据展示             |
| GridShapeExample        | -           | `grid`, `shape`                 |
| CustomRegionExample     | 高级用法    | `region`                        |
| FactoryExample          | -           | `<DottedMapFactory>`            |

## 🎯 技术要点

### 性能优化

- 使用 `useMemo` 缓存地图配置
- Canvas 渲染基础地图（高性能）
- SVG 渲染交互元素（灵活性）
- 合理的 `spacing` 参数避免过多点

### 类型安全

- 所有示例完全类型化
- 使用 TypeScript 严格模式
- 导入类型定义：`type { MapConfig, ShapeType, GridType }`

### 代码风格

- 函数式组件 + Hooks
- 清晰的命名规范
- 注释说明关键逻辑
- 一致的代码格式

## 📝 最佳实践

1. **地图配置**: 总是使用 `useMapFactory` 而不是手动构造 `MapConfig`
2. **Pin 点管理**: 使用 render props 或 hooks，避免直接操作 DOM
3. **性能考虑**: 大数据量时增大 `spacing` 参数
4. **交互设计**: 提供清晰的视觉反馈（悬停、选中状态）
5. **响应式**: 根据容器尺寸动态调整地图 `width` 和 `height`

## 🔗 相关资源

- [主 README](../README.md) - 完整 API 文档
- [GitHub 仓库](https://github.com/YeSuX/react-dotted-map)
- [NPM 包](https://www.npmjs.com/package/@suxiong/react-dotted-map)
