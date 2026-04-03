# 部署文档

## GitHub Pages 部署

### 访问地址

```
https://weidongpo.github.io/drama-h5/
```

### 部署步骤

每次修改代码后，执行以下步骤部署到 GitHub Pages：

```bash
# 1. 构建项目
npm run build

# 2. 切换到 gh-pages 分支
git checkout gh-pages

# 3. 从 master 分支获取最新的构建产物
git checkout master -- dist

# 4. 复制构建文件到根目录
cp -r dist/* .

# 5. 删除 dist 目录
rm -rf dist

# 6. 提交更改
git add .
git commit -m "deploy: 更新部署"

# 7. 推送到远程
git push origin gh-pages

# 8. 切回 master 分支继续开发
git checkout master
```

### 注意事项

1. GitHub Pages 可能需要几分钟才能生效
2. 如果访问 404，请稍等片刻再试
3. 确保 `vite.config.js` 中的 `base` 配置为 `/drama-h5/`

### 一键部署脚本

项目根目录下有 `deploy.sh` 脚本，可以一键部署：

```bash
# Windows PowerShell
./deploy.sh

# 或者手动执行
npm run build && git checkout gh-pages && git checkout master -- dist && cp -r dist/* . && rm -rf dist && git add . && git commit -m "deploy: 更新部署" && git push origin gh-pages && git checkout master
```

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问地址
http://localhost:5173/drama-h5/
```

## 项目信息

- **项目名称：** 视界剧场
- **技术栈：** Vue 3 + Vite + Pinia + Vant
- **仓库地址：** https://github.com/weidongpo/drama-h5
