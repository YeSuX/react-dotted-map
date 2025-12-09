# Playground Examples

这个文件夹包含了 React Dotted Map 的各种使用示例。

## 示例列表

### 1. BasicExample.tsx
最简单的使用方式，直接传入配置参数渲染地图。

**特点**：
- 直接渲染
- 最小配置
- 适合快速上手

### 2. RenderPropsExample.tsx
使用 render props 模式，通过 children 函数获取地图实例，可以自定义添加点位。

**特点**：
- 灵活控制
- 自定义点位样式
- 演示添加多个城市标记

### 3. HookExample.tsx
直接使用 `useDottedMap` Hook 进行更细粒度的控制。

**特点**：
- 编程式控制
- 动态添加/删除点位
- 实时显示点位数量
- 交互式操作

## 运行示例

```bash
# 启动开发服务器
bun run dev

# 或使用 npm/pnpm
npm run dev
```

浏览器访问 `http://localhost:5173` 即可查看所有示例。

## 自定义示例

你可以在这个文件夹中创建自己的示例文件，然后在 `App.tsx` 中导入即可。

```tsx
// 1. 在 playground 文件夹中创建新示例
// src/playground/MyExample.tsx

// 2. 在 App.tsx 中导入
import MyExample from "./playground/MyExample";

// 3. 在 App 组件中使用
<MyExample />
```

