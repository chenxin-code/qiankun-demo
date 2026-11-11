# Qiankun 微前端 Demo

基于 qiankun 的微前端实践项目，展示如何在主应用中集成多个不同技术栈的子应用。

**在线演示**：https://chenxin-code.github.io/qiankun-demo/

## 技术栈

### 主应用
- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite 5
- **UI 组件库**: Element Plus
- **微前端框架**: qiankun

### 子应用
| 子应用 | 技术栈 | 端口 | 状态 |
|--------|--------|------|------|
| Vue3 App | Vue 3 + Vite + TypeScript + Element Plus | 8081 | ✅ 运行中 |
| Vue2 App | Vue 2 + Vite + TypeScript + Element UI | 8082 | ✅ 运行中 |
| React App | React 19 + Vite + TypeScript + Ant Design | 8083 | ✅ 运行中 |
| Angular App | Angular 17 + Webpack + TypeScript + Angular Material | 8084 | ✅ 运行中 |

## 项目结构

```
qiankun-demo/
├── .github/workflows/
│   └── deploy.yml         # GitHub Actions 自动部署
├── main-app/              # 主应用（Vue 3）
├── sub-app-vue3/          # Vue3 子应用
├── sub-app-vue2/          # Vue2 子应用
├── sub-app-react/         # React 子应用
├── sub-app-angular/       # Angular 子应用
├── package.json           # 根目录 package.json
└── README.md
```

## 快速开始

### 环境要求
- Node.js >= 20.19.4
- npm >= 10.0.0

### 安装依赖

```bash
# 一键安装所有应用依赖（推荐）
npm run install:all

# 或者分别安装
# 安装根目录依赖
npm install

# 安装主应用依赖
cd main-app && npm install

# 安装各子应用依赖
cd ../sub-app-vue3 && npm install
cd ../sub-app-vue2 && npm install
cd ../sub-app-react && npm install
cd ../sub-app-angular && npm install
```

### 启动项目

需要同时启动主应用和所有子应用：

```bash
# 一键启动所有应用（推荐）
npm run dev

# 或者分别启动
# 终端 1：启动主应用
cd main-app && npm run dev

# 终端 2：启动 Vue3 子应用
cd sub-app-vue3 && npm run dev

# 终端 3：启动 Vue2 子应用
cd sub-app-vue2 && npm run dev

# 终端 4：启动 React 子应用
cd sub-app-react && npm run dev

# 终端 5：启动 Angular 子应用
cd sub-app-angular && npm run dev
```

访问 http://localhost:8080 查看主应用。

**微前端测试模式**：

由于 React 子应用的 HMR 与 qiankun 存在冲突，提供了微前端测试模式：

```bash
# 一键启动所有应用（React 使用 micro 模式）
npm run dev:micro

# 或者单独启动 React 微前端模式
npm run dev:react:micro
```

> 注意：在微前端模式下，React 子应用禁用了 HMR，其他子应用不受影响。

### 打包部署

```bash
# 一键打包所有应用（推荐）
npm run build

# 或者分别打包
npm run build:main       # 主应用
npm run build:vue3       # Vue3 子应用
npm run build:vue2       # Vue2 子应用
npm run build:react      # React 子应用
npm run build:angular    # Angular 子应用
```

**打包输出目录**：
- 主应用：`main-app/dist/`
- Vue3 子应用：`sub-app-vue3/dist/`
- Vue2 子应用：`sub-app-vue2/dist/`
- React 子应用：`sub-app-react/dist/`
- Angular 子应用：`sub-app-angular/dist/`

**部署说明**：

push 代码到 master 分支后，GitHub Actions 会自动构建并部署到 `gh-pages` 分支。

访问地址：`https://chenxin-code.github.io/qiankun-demo/`

## 功能特性

### 主应用
- 子应用卡片展示，支持点击加载/卸载
- 开发模式显示端口号，生产模式显示子应用入口地址
- 独立打开按钮（新标签页打开子应用）
- 响应式网格布局
- 运行状态实时显示

### 子应用
- 支持独立运行和微前端模式
- 每个子应用展示用户数据表格
- 支持 qiankun 生命周期（bootstrap、mount、unmount、update）
- 样式隔离，互不干扰

## 技术要点

### Vite 子应用配置
使用 `vite-plugin-qiankun` 插件，自动处理：
- 生命周期钩子暴露
- UMD 格式输出
- 跨域配置
- 开发模式适配

### Webpack 子应用配置（Angular）
手动配置 webpack：
```javascript
output: {
  library: 'sub-app-angular',
  libraryTarget: 'umd',
  publicPath: '/qiankun-demo/sub-app-angular/',  // 根据部署路径调整
}
```

### React 子应用特殊处理
由于 `@vitejs/plugin-react` 会注入 `<script type="module">` 的 React Refresh 脚本，与 qiankun 存在冲突，采用双模式开发：
- `npm run dev` - 独立开发模式（启用 HMR）
- `npm run dev:micro` - 微前端模式（禁用 HMR，支持 qiankun 加载）

## 常见问题

### Q: 为什么 React 子应用需要双模式开发？
A: Vite 的 React 插件会注入 ES Module 格式的热更新脚本，而 qiankun 的 import-html-entry 使用 eval() 执行脚本，无法处理 module 语法。因此在微前端模式下需要禁用 HMR。

### Q: 子应用如何切换？
A: 在主应用首页点击不同的子应用卡片即可加载对应子应用，再次点击可卸载。

### Q: 子应用可以独立运行吗？
A: 可以。直接访问子应用的端口（如 http://localhost:8081）即可独立运行。

## 参考资料

- [qiankun 官方文档](https://qiankun.umijs.org/zh/)
- [vite-plugin-qiankun](https://github.com/tengmaoqing/vite-plugin-qiankun)
- [single-spa](https://single-spa.js.org/)

## 许可证

MIT
