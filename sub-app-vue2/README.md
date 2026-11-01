# Vue2 子应用

基于 Vue 2 + Vite + Element UI 的微前端子应用。

## 技术栈

- **框架**: Vue 2.7 + TypeScript
- **构建工具**: Vite 5
- **UI 组件库**: Element UI
- **微前端插件**: vite-plugin-qiankun

## 功能

- 用户数据表格展示
- 支持独立运行和微前端模式
- 响应式设计

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器（独立运行）
npm run dev

# 启动开发服务器（微前端模式）
npm run dev:micro

# 构建生产版本
npm run build
```

## 端口

- 独立运行：http://localhost:8082

## 核心配置

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  plugins: [
    vue(),
    qiankun('sub-app-vue2', {
      useDevMode: true,
    }),
  ],
  server: {
    port: 8082,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
```

### main.ts

```typescript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let app: Vue | null = null

function render(props: any = {}) {
  const { container } = props
  const root = container?.querySelector('#app') || document.getElementById('app')
  app = new Vue({
    render: (h) => h(App),
  }).$mount(root)
}

renderWithQiankun({
  bootstrap() {},
  mount(props) { render(props) },
  unmount() { app?.$destroy(); app = null },
  update() {},
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
```

## 数据展示

| 字段 | 说明 |
|------|------|
| ID | 用户编号 |
| 姓名 | 用户姓名 |
| 年龄 | 用户年龄 |
| 城市 | 所在城市 |
| 分数 | 测试分数 |

## 与 Vue3 子应用的区别

| 特性 | Vue2 | Vue3 |
|------|------|------|
| 框架版本 | Vue 2.7 | Vue 3.5 |
| UI 组件库 | Element UI | Element Plus |
| 创建实例 | `new Vue()` | `createApp()` |
| 销毁实例 | `$destroy()` | `unmount()` |
| 插件导入 | `@vitejs/plugin-vue2` | `@vitejs/plugin-vue` |

## 注意事项

- Vue 2.7 支持 Composition API
- 使用 `vite-plugin-qiankun` 自动处理生命周期钩子
- 支持 HMR 热更新
- 样式隔离，不影响主应用和其他子应用
