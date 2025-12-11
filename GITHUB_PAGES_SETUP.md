# 📋 GitHub Pages 部署配置总结

本文档总结了为 React Dotted Map Playground 配置 GitHub Pages 部署所做的所有更改。

## 🎯 目标

将 `src/playground/` 中的完整演示应用部署到 GitHub Pages：

- URL: `https://yesux.github.io/react-dotted-map/`

## 📝 已完成的配置

### 1. Vite 配置更新

**文件**: `vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/", // 支持动态 base path
  build: {
    outDir: "dist-demo", // 独立输出目录
    emptyOutDir: true,
  },
});
```

**作用**:

- `base`: 根据环境变量动态设置资源路径
- `outDir`: 使用独立的 `dist-demo` 目录，不与库构建冲突

### 2. GitHub Actions Workflow

**文件**: `.github/workflows/deploy.yml`

**触发条件**:

- 推送到 `main` 分支
- 手动触发 (workflow_dispatch)

**构建流程**:

1. Checkout 代码
2. 安装 Node.js 20 和依赖
3. 构建演示站点（设置 `VITE_BASE_PATH=/react-dotted-map/`）
4. 上传到 GitHub Pages
5. 部署

### 3. Package.json 脚本

**文件**: `package.json`

新增脚本：

```json
{
  "scripts": {
    "build:demo": "tsc -b && vite build",
    "preview:demo": "vite preview --outDir dist-demo"
  }
}
```

### 4. .gitignore 更新

**文件**: `.gitignore`

添加：

```
dist-demo
```

防止构建输出提交到仓库。

### 5. .nojekyll 文件

**文件**: `public/.nojekyll`

空文件，用于禁用 GitHub Pages 的 Jekyll 处理，确保所有文件正确服务。

### 6. README 更新

**文件**: `README.md`

添加：

- 在线演示链接徽章
- 部署状态徽章
- 指向 playground 的链接

### 7. 类型修复

**文件**:

- `src/hooks/useMapFactory.ts`
- `src/components/DottedMapFactory.tsx`

移除未使用的泛型参数 `TData`，修复 TypeScript 编译错误。

## 📁 新增文件

### 文档文件

1. **DEPLOYMENT.md** - 完整部署文档和故障排查
2. **DEPLOY_QUICKSTART.md** - 3 步快速部署指南
3. **GITHUB_PAGES_SETUP.md** - 本文件，配置总结

## 🚀 部署流程

### 自动部署（推荐）

```bash
# 1. 推送代码
git add .
git commit -m "feat: setup GitHub Pages"
git push origin main

# 2. GitHub Actions 自动构建和部署
# 3. 访问 https://yesux.github.io/react-dotted-map/
```

### 本地测试

```bash
# 构建
VITE_BASE_PATH=/react-dotted-map/ npm run build:demo

# 预览
npm run preview:demo
```

## ✅ 验证清单

在 GitHub 仓库中完成以下设置：

- [ ] Settings → Pages → Source 设置为 "GitHub Actions"
- [ ] Settings → Actions → General → Workflow permissions 设置为 "Read and write permissions"
- [ ] 推送代码到 `main` 分支
- [ ] 在 Actions 页面确认 workflow 运行成功
- [ ] 访问 `https://yesux.github.io/react-dotted-map/` 确认部署成功

## 📊 构建输出

- **库构建**: `dist/` (npm 包)
- **演示站点**: `dist-demo/` (GitHub Pages)

两者独立，互不影响。

## 🔄 更新流程

1. 修改 `src/playground/` 中的文件
2. 提交并推送到 `main` 分支
3. GitHub Actions 自动重新部署
4. 等待 1-2 分钟查看更新

## 🎨 Playground 功能

已部署的 Playground 包含 10 个完整示例：

**快速开始** (3 个):

- BasicExample - 基础用法
- RenderPropsExample - Render Props 模式
- HookExample - Hook API

**使用场景** (4 个):

- CountryFilterExample - 国家过滤
- UserDistributionExample - 用户分布
- InteractiveMapExample - 交互地图
- RegionComparisonExample - 区域对比

**高级功能** (3 个):

- GridShapeExample - 网格和形状
- CustomRegionExample - 自定义区域
- FactoryExample - Factory 模式

## 🔗 相关链接

- [在线演示](https://yesux.github.io/react-dotted-map/)
- [快速部署指南](./DEPLOY_QUICKSTART.md)
- [完整部署文档](./DEPLOYMENT.md)
- [Playground 文档](./PLAYGROUND.md)
- [GitHub Actions 页面](https://github.com/YeSuX/react-dotted-map/actions)

## 💡 技术要点

### Base Path 处理

开发和生产使用不同的 base path：

- **开发**: `/` (本地 vite dev server)
- **生产**: `/react-dotted-map/` (GitHub Pages)

通过环境变量 `VITE_BASE_PATH` 动态控制。

### 构建优化

当前构建输出 ~607KB（gzip 后 ~216KB）。主要包含：

- React + React DOM
- GeoJSON 世界地图数据
- Playground 所有示例

如需优化：

- 使用动态 import 分割代码
- 按需加载 GeoJSON 数据
- 配置 `build.rollupOptions.output.manualChunks`

### 缓存策略

GitHub Pages 自动处理静态资源缓存：

- HTML 文件: 不缓存
- JS/CSS 文件: 带哈希的文件名，永久缓存

## 🎉 完成

配置已完成！现在只需：

1. 在 GitHub 仓库中启用 GitHub Pages
2. 推送代码
3. 访问在线演示

祝你好运！🚀
