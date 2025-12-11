# 🚀 GitHub Pages 快速部署

## 3 步完成部署

### 步骤 1: 启用 GitHub Pages

1. 访问仓库设置页面：

   ```
   https://github.com/YeSuX/react-dotted-map/settings/pages
   ```

2. 在 **"Build and deployment"** 部分：
   - **Source**: 选择 `GitHub Actions`（不是 Deploy from a branch）
3. 点击保存

### 步骤 2: 推送代码

```bash
git add .
git commit -m "feat: add GitHub Pages deployment"
git push origin main
```

### 步骤 3: 等待部署完成

1. 访问 Actions 页面查看进度：

   ```
   https://github.com/YeSuX/react-dotted-map/actions
   ```

2. 等待 "Deploy Playground to GitHub Pages" workflow 完成（约 1-2 分钟）

3. 部署成功后访问：
   ```
   https://yesux.github.io/react-dotted-map/
   ```

## ✅ 完成！

现在你的 Playground 已经在线上了！

---

## 🔄 后续更新

每次推送到 `main` 分支都会自动触发部署：

```bash
# 修改 playground 文件
git add src/playground/
git commit -m "feat: update playground examples"
git push origin main
```

等待 1-2 分钟即可看到更新。

---

## 🧪 本地测试

在推送前本地测试构建：

```bash
# 构建演示站点
npm run build:demo

# 预览构建结果
npm run preview:demo
```

访问 `http://localhost:4173` 查看。

---

## ❓ 常见问题

### 问题：Actions 页面显示权限错误

**解决方案**：

1. 访问：`Settings → Actions → General`
2. 找到 "Workflow permissions"
3. 选择 "Read and write permissions"
4. 保存

### 问题：部署成功但访问显示 404

**解决方案**：

确认 GitHub Pages 的 Source 设置为 `GitHub Actions`，而不是 Deploy from a branch。

### 问题：页面空白或资源加载失败

**解决方案**：

检查浏览器控制台。如果看到 404 错误，确认：

1. `vite.config.ts` 中的 `base` 路径配置正确
2. GitHub Actions workflow 中的 `VITE_BASE_PATH` 环境变量设置正确

---

## 📝 更多信息

查看完整部署文档：[DEPLOYMENT.md](./DEPLOYMENT.md)
