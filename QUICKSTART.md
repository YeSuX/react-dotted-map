# 🚀 Playground 快速启动指南

## 立即开始

```bash
# 启动开发服务器
npm run dev
```

访问 `http://localhost:5173` 查看完整的交互式 playground。

## 📦 包含的示例

### ✨ 快速开始 (3 个示例)

1. **基础用法** - 最简单的地图渲染
2. **Render Props** - 添加自定义 Pin 点
3. **Hook API** - 程序化控制和交互

### 🎨 使用场景 (4 个示例)

4. **国家过滤** - 按国家着色和过滤
5. **用户分布** - 数据可视化（10 个全球用户）
6. **交互地图** - 点击/悬停交互，城市详情
7. **区域对比** - 多国对比（USA/CHN/IND/BRA）

### 🔧 高级功能 (3 个示例)

8. **网格和形状** - 3 种网格 × 2 种形状对比
9. **自定义区域** - 北美/欧洲/东亚区域聚焦
10. **Factory 模式** - 5 种不同配置场景

## 🎯 导航方式

Playground 提供两种浏览方式：

1. **显示全部** - 一次查看所有 10 个示例
2. **单独查看** - 点击顶部按钮切换到特定示例

每个示例都配有：

- 清晰的标题和描述
- 交互式地图展示
- 相关统计和图例（如适用）

## 💡 学习建议

**新手路径**：BasicExample → RenderPropsExample → HookExample → CountryFilterExample

**实战路径**：UserDistributionExample → InteractiveMapExample → RegionComparisonExample

**高级路径**：GridShapeExample → CustomRegionExample → FactoryExample → 源码阅读

## 📖 详细文档

- [PLAYGROUND.md](./PLAYGROUND.md) - 完整 playground 架构和说明
- [README.md](./README.md) - 完整 API 文档和使用指南

## 🎨 示例预览

每个示例都直接对应 README 中的使用场景：

- ✅ 所有 README "快速开始" 示例均已实现
- ✅ 所有 README "使用场景" 示例均已实现
- ✅ 所有核心 API 均有对应示例
- ✅ 支持完整交互和状态管理

## 🚢 准备发布

Playground 也是演示站点的基础：

```bash
# 构建演示站点
npm run build:demo

# 预览构建结果
npm run preview
```

立即启动开发服务器开始探索吧！ 🎉
