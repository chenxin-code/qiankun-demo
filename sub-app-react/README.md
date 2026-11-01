# React 子应用

基于 React 19 + Vite + Ant Design 的微前端子应用。

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 5
- **UI 组件库**: Ant Design 5
- **微前端插件**: vite-plugin-qiankun

## 功能

- 用户数据表格展示（带分页）
- 在职/离职状态标签
- 支持独立运行和微前端模式
- 响应式设计

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器（独立运行，启用 HMR）
npm run dev

# 启动开发服务器（微前端模式，禁用 HMR）
npm run dev:micro

# 构建生产版本
npm run build
```

## 端口

- 独立运行：http://localhost:8083

## 核心配置

### vite.config.ts

```typescript
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useMicroApp = env.VITE_USE_MICRO_APP === 'true'

  return {
    plugins: [
      react({
        reactRefresh: !useMicroApp,
      }),
      qiankun('sub-app-react', {
        useDevMode: useMicroApp,
      }),
    ],
    server: {
      port: 8083,
      cors: true,
      hmr: !useMicroApp,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  }
})
```

### main.tsx

```typescript
import { createRoot } from 'react-dom/client'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let root: Root | null = null

function render(props: any = {}) {
  const { container } = props
  const rootElement = container 
    ? container.querySelector('#root') 
    : document.getElementById('root')
  
  root = createRoot(rootElement!)
  root.render(<App />)
}

renderWithQiankun({
  bootstrap() {},
  mount(props) { render(props) },
  unmount() { root?.unmount(); root = null },
  update() {},
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
```

## 双模式开发

由于 `@vitejs/plugin-react` 会注入 `<script type="module">` 的 React Refresh 脚本，与 qiankun 存在冲突，采用双模式开发：

| 模式 | 命令 | HMR | 用途 |
|------|------|-----|------|
| 独立开发 | `npm run dev` | ✅ 启用 | 日常开发，享受热更新 |
| 微前端模式 | `npm run dev:micro` | ❌ 禁用 | 集成测试，qiankun 加载 |

### 环境变量

- `.env` - 独立开发模式（`VITE_USE_MICRO_APP=false`）
- `.env.micro` - 微前端模式（`VITE_USE_MICRO_APP=true`）

## 数据展示

| 字段 | 说明 |
|------|------|
| ID | 用户编号 |
| 姓名 | 用户姓名 |
| 年龄 | 用户年龄 |
| 城市 | 所在城市 |
| 角色 | 职位角色 |
| 状态 | 在职/离职（绿色/灰色标签） |

## 与 Vue 子应用的区别

| 特性 | React | Vue |
|------|-------|-----|
| 框架 | React 19 | Vue 3/2 |
| UI 组件库 | Ant Design | Element Plus/UI |
| 渲染方式 | `createRoot()` | `createApp()`/`new Vue()` |
| HMR 冲突 | ⚠️ 需要双模式 | ✅ 无冲突 |
| 状态标签 | Tag 组件 | 自定义样式 |

## 注意事项

- React 19 使用新的 `createRoot` API
- 微前端模式下需要禁用 HMR
- 使用 `vite-plugin-qiankun` 自动处理生命周期钩子
- 样式隔离，不影响主应用和其他子应用
