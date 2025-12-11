# 🚀 Playground 部署指南

本文档说明如何将 React Dotted Map Playground 部署到 GitHub Pages。

## 📦 自动部署（推荐）

项目已配置 GitHub Actions 自动部署，每次推送到 `main` 分支时会自动触发。

### 首次设置

1. **启用 GitHub Pages**

   在仓库设置中启用 GitHub Pages：

   - 访问：`https://github.com/YeSuX/react-dotted-map/settings/pages`
   - Source: 选择 **GitHub Actions**

2. **推送代码**

   ```bash
   git add .
   git commit -m "chore: setup GitHub Pages deployment"
   git push origin main
   ```

3. **查看部署状态**

   访问 Actions 页面查看部署进度：

   - `https://github.com/YeSuX/react-dotted-map/actions`

4. **访问 Playground**

   部署完成后访问：

   - `https://yesux.github.io/react-dotted-map/`

### 手动触发部署

如果需要手动触发部署：

1. 访问 Actions 页面
2. 选择 "Deploy Playground to GitHub Pages" workflow
3. 点击 "Run workflow" 按钮

## 🔧 本地构建测试

在推送前，可以在本地测试构建：

```bash
# 构建演示站点
npm run build:demo

# 预览构建结果
npm run preview:demo
```

访问 `http://localhost:4173` 查看构建结果。

## 📁 构建输出

- **库构建**: `dist/` - NPM 包文件
- **演示站点**: `dist-demo/` - GitHub Pages 站点

## ⚙️ 配置说明

### vite.config.ts

```typescript
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/", // GitHub Pages base path
  build: {
    outDir: "dist-demo", // 独立的输出目录
    emptyOutDir: true,
  },
});
```

### GitHub Actions Workflow

位置: `.github/workflows/deploy.yml`

**触发条件**:

- 推送到 `main` 分支
- 手动触发 (workflow_dispatch)

**构建步骤**:

1. Checkout 代码
2. 安装 Node.js 20
3. 安装依赖 (`npm ci`)
4. 构建站点 (`npm run build:demo`)
5. 上传到 GitHub Pages
6. 部署

### 环境变量

构建时会设置 `VITE_BASE_PATH=/react-dotted-map/`，确保资源路径正确。

## 🔍 故障排查

### 问题：部署后页面空白

**原因**: base path 配置不正确

**解决**:

```bash
# 检查构建输出中的资源路径
cat dist-demo/index.html | grep -E '(href|src)='
```

应该看到类似 `/react-dotted-map/assets/...` 的路径。

### 问题：Actions 权限错误

**原因**: GitHub Pages 权限未配置

**解决**:

1. 访问仓库 Settings → Actions → General
2. 找到 "Workflow permissions"
3. 选择 "Read and write permissions"
4. 保存更改

### 问题：部署成功但访问 404

**原因**: GitHub Pages Source 配置错误

**解决**:

1. 访问仓库 Settings → Pages
2. Source: 确保选择 **GitHub Actions**（不是 Deploy from a branch）

## 📊 部署状态监控

可以在 README 中添加部署状态徽章：

```markdown
[![Deploy Status](https://github.com/YeSuX/react-dotted-map/actions/workflows/deploy.yml/badge.svg)](https://github.com/YeSuX/react-dotted-map/actions/workflows/deploy.yml)
```

## 🔄 更新 Playground

1. 修改 `src/playground/` 中的文件
2. 提交并推送到 `main` 分支
3. GitHub Actions 自动构建并部署
4. 等待 1-2 分钟即可看到更新

## 🌐 自定义域名（可选）

如果想使用自定义域名：

1. 在仓库 Settings → Pages 中配置 Custom domain
2. 添加 CNAME 记录指向 `yesux.github.io`
3. 在 `public/` 目录添加 `CNAME` 文件：
   ```
   your-domain.com
   ```
4. 更新 `vite.config.ts` 中的 base 为 `/`

## 📝 注意事项

- **构建分离**: 库构建 (`npm run build`) 和演示站点构建 (`npm run build:demo`) 使用不同的输出目录
- **版本控制**: `dist-demo/` 已添加到 `.gitignore`，不提交到仓库
- **缓存**: GitHub Pages 有缓存，更新可能需要等待几分钟或强制刷新浏览器
- **大小限制**: GitHub Pages 单个站点限制 1GB，Playground 远低于此限制

## 🎯 最佳实践

1. **在推送前本地测试**: 运行 `npm run build:demo && npm run preview:demo`
2. **查看 Actions 日志**: 部署失败时查看详细错误信息
3. **使用语义化提交**: 便于追踪哪次提交导致的部署
4. **定期清理**: 旧的 Actions 运行记录可以定期清理节省空间

## 🔗 相关链接

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
