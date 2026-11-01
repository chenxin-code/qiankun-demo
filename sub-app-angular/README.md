# Angular 子应用

基于 Angular 17 + Webpack + Angular Material 的微前端子应用。

## 技术栈

- **框架**: Angular 17 + TypeScript
- **构建工具**: Webpack（通过 Angular CLI）
- **UI 组件库**: Angular Material
- **微前端配置**: @angular-builders/custom-webpack

## 功能

- 用户数据表格展示
- 在职/离职状态标签
- 支持独立运行和微前端模式
- 响应式设计
- 支持重复加载/卸载

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 监听模式构建
npm run watch
```

## 端口

- 独立运行：http://localhost:8084

## 核心配置

### angular.json

```json
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-webpack:browser",
      "options": {
        "customWebpackConfig": {
          "path": "./custom-webpack.config.js"
        }
      }
    }
  }
}
```

### custom-webpack.config.js

```javascript
module.exports = {
  output: {
    library: 'sub-app-angular',
    libraryTarget: 'umd',
    publicPath: '/',
    chunkLoadingGlobal: 'webpackJsonp_sub_app_angular',
  },
  devServer: {
    port: 8084,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
```

### main.ts

```typescript
let app: any = null;

export async function bootstrap() {
  console.log('[sub-app-angular] bootstrap');
}

export async function mount(props: any) {
  console.log('[sub-app-angular] mount', props);
  app = await createApplication(props);
}

export async function unmount() {
  console.log('[sub-app-angular] unmount');
  if (app) {
    destroyApplication(app);
    app = null;
  }
  // 清理 DOM
  const roots = document.querySelectorAll('app-root');
  roots.forEach(root => root.remove());
}

// 独立运行
if (!(window as any).__POWERED_BY_QIANKUN__) {
  createApplication().catch(err => console.error(err));
} else {
  // 暴露生命周期给 qiankun
  (window as any)['sub-app-angular'] = {
    bootstrap, mount, unmount, update
  };
}
```

## Webpack 配置要点

Angular 子应用使用 Webpack 打包，需要手动配置：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `output.library` | `'sub-app-angular'` | 库名称，与 qiankun 注册名一致 |
| `output.libraryTarget` | `'umd'` | UMD 格式输出 |
| `output.publicPath` | `'/'` | 资源路径 |
| `devServer.headers` | 跨域配置 | 允许主应用访问 |

## 数据展示

| 字段 | 说明 |
|------|------|
| ID | 用户编号 |
| 姓名 | 用户姓名 |
| 年龄 | 用户年龄 |
| 城市 | 所在城市 |
| 部门 | 所属部门 |
| 职位 | 职位角色 |
| 状态 | 在职/离职（绿色/灰色标签） |

## 与其他子应用的区别

| 特性 | Angular | Vue/React |
|------|---------|-----------|
| 构建工具 | Webpack | Vite |
| 配置方式 | 手动配置 webpack | 插件自动处理 |
| HMR 支持 | ✅ 原生支持 | ⚠️ React 需双模式 |
| DOM 清理 | 需要手动清理 | 自动处理 |
| 重复加载 | 需要特殊处理 | 默认支持 |

## 重复加载问题

Angular 子应用在重复加载时需要特殊处理：

1. **unmount 时清理 DOM**
   ```typescript
   const roots = document.querySelectorAll('app-root');
   roots.forEach(root => root.remove());
   ```

2. **主应用延迟加载**
   ```typescript
   setTimeout(() => {
     microApp = loadMicroApp(/* ... */)
   }, 0)
   ```

这样可以避免第二次加载时复用已销毁的 DOM 节点。

## 注意事项

- 使用 `@angular-builders/custom-webpack` 自定义 webpack 配置
- 需要手动导出生命周期钩子到 window 对象
- unmount 时必须清理 DOM，否则重复加载会失败
- 支持 HMR 热更新，无需双模式
- 样式隔离，不影响主应用和其他子应用
