<template>
  <div class="home">
    <h2>Qiankun 微前端演示</h2>
    <p class="subtitle">点击下方卡片加载对应子应用</p>
    <div class="info-cards">
      <div class="card main">
        <div class="card-header">
          <span class="badge">主应用</span>
          <h3>Main App</h3>
        </div>
        <p class="tech">Vite + Vue3 + TypeScript</p>
        <p class="port">端口: 8080</p>
        <p class="desc">负责路由分发和子应用加载</p>
      </div>
      <div class="card vue3" :class="{ active: currentApp === 'vue3' }" @click="loadApp('vue3')">
        <div class="card-header">
          <span class="badge">子应用</span>
          <h3>Vue3 App</h3>
        </div>
        <p class="tech">Vite + Vue3 + Element Plus</p>
        <p class="port">端口: 8081</p>
        <p class="desc">展示 Vue3 组件和表格数据</p>
        <div class="load-hint">
          <span v-if="currentApp === 'vue3'">✓ 已加载</span>
          <span v-else>点击加载 →</span>
        </div>
      </div>
      <div class="card vue2" :class="{ active: currentApp === 'vue2' }" @click="loadApp('vue2')">
        <div class="card-header">
          <span class="badge">子应用</span>
          <h3>Vue2 App</h3>
        </div>
        <p class="tech">Vite + Vue2 + Element UI</p>
        <p class="port">端口: 8082</p>
        <p class="desc">展示 Vue2 组件和表单功能</p>
        <div class="load-hint">
          <span v-if="currentApp === 'vue2'">✓ 已加载</span>
          <span v-else>点击加载 →</span>
        </div>
      </div>
    </div>
    <div v-if="currentApp" id="sub-app-container" class="sub-app-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { loadMicroApp } from 'qiankun'

const currentApp = ref<string>('')
let microApp: any = null

function loadApp(app: string) {
  if (microApp && currentApp.value === app) {
    microApp.unmount()
    microApp = null
    currentApp.value = ''
    return
  }

  if (microApp) {
    microApp.unmount()
    microApp = null
  }

  currentApp.value = app

  const entry = app === 'vue3' ? '//localhost:8081' : '//localhost:8082'
  const appName = app === 'vue3' ? 'sub-app-vue3' : 'sub-app-vue2'

  microApp = loadMicroApp(
    {
      name: appName,
      entry,
      container: '#sub-app-container',
    },
    {
      sandbox: {
        experimentalStyleIsolation: true,
      },
    }
  )
}

onBeforeUnmount(() => {
  if (microApp) {
    microApp.unmount()
  }
})
</script>

<style scoped>
.home {
  padding: 20px 0;
}

.home h2 {
  margin-bottom: 8px;
  color: #303133;
}

.subtitle {
  color: #909399;
  margin-bottom: 24px;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e4e7ed;
  transition: all 0.3s ease;
  position: relative;
}

.card:not(.main) {
  cursor: pointer;
}

.card:not(.main):hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: #409eff;
}

.card.active {
  border-color: #67c23a;
  box-shadow: 0 4px 16px rgba(103, 194, 58, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.badge {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
}

.card.main .badge {
  background: #ecf5ff;
  color: #409eff;
}

.card.vue3 .badge {
  background: #f0f9eb;
  color: #67c23a;
}

.card.vue2 .badge {
  background: #fdf6ec;
  color: #e6a23c;
}

.card h3 {
  font-size: 18px;
  color: #303133;
  margin: 0;
}

.card .tech {
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
  font-weight: 500;
}

.card .port {
  font-size: 13px;
  color: #909399;
  margin-bottom: 12px;
}

.card .desc {
  font-size: 14px;
  color: #606266;
  margin-bottom: 0;
  padding-top: 12px;
  border-top: 1px solid #ebeef5;
}

.load-hint {
  position: absolute;
  bottom: 16px;
  right: 20px;
  font-size: 13px;
  color: #409eff;
  font-weight: 500;
}

.card.active .load-hint {
  color: #67c23a;
}

.sub-app-container {
  margin-top: 24px;
  border: 2px dashed #409eff;
  border-radius: 12px;
  min-height: 300px;
  padding: 20px;
  background: #fafafa;
}
</style>
