# 主应用 (Main App)

基于 Vue 3 + Vite + Element Plus 的微前端主应用。

## 技术栈

- **框架**: Vue 3.5 + TypeScript
- **构建工具**: Vite 5
- **UI 组件库**: Element Plus
- **路由**: Vue Router 4
- **微前端框架**: qiankun

## 功能

- 子应用卡片展示（网格布局）
- 点击卡片加载/卸载子应用
- 新标签页打开子应用独立运行
- 实时显示子应用运行状态
- 响应式设计，支持移动端

## 子应用列表

| 子应用 | 端口 | 技术栈 |
|--------|------|--------|
| Vue3 App | 8081 | Vue 3 + Element Plus |
| Vue2 App | 8082 | Vue 2 + Element UI |
| React App | 8083 | React 19 + Ant Design |
| Angular App | 8084 | Angular 17 + Material |

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 核心代码

### 加载子应用

```typescript
import { loadMicroApp } from 'qiankun'

function loadApp(appId: string) {
  microApp = loadMicroApp({
    name: `sub-app-${appId}`,
    entry: `//localhost:${port}`,
    container: '#sub-app-container',
  }, {
    sandbox: {
      experimentalStyleIsolation: true,
    },
  })
}
```

### 子应用配置

```typescript
const subApps = [
  { id: 'vue3', name: 'Vue3 App', port: 8081, theme: 'vue3' },
  { id: 'vue2', name: 'Vue2 App', port: 8082, theme: 'vue2' },
  { id: 'react', name: 'React App', port: 8083, theme: 'react' },
  { id: 'angular', name: 'Angular App', port: 8084, theme: 'angular' },
]
```

## 注意事项

- 主应用运行在 8080 端口
- 需要同时启动所有子应用才能正常加载
- 使用 `experimentalStyleIsolation` 实现样式隔离
