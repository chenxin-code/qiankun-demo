<template>
  <div class="home">
    <div class="section-header">
      <h3>子应用列表</h3>
      <span class="app-count">{{ subApps.length }} 个应用</span>
    </div>

    <div class="sub-apps-grid">
      <div
        v-for="app in subApps"
        :key="app.id"
        class="app-card"
        :class="{ active: currentApp === app.id }"
        @click="loadApp(app.id)"
      >
        <div class="app-card-header">
          <span class="badge" :class="app.theme">{{ app.badge }}</span>
          <span class="status" v-if="currentApp === app.id">运行中</span>
        </div>
        <h4>{{ app.name }}</h4>
        <p class="app-tech">{{ app.tech }}</p>
        <div class="app-footer">
          <span class="app-port">:{{ app.port }}</span>
          <button class="open-btn" @click.stop="openApp(app.port)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            localhost:{{ app.port }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="currentApp" id="sub-app-container" class="sub-app-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { loadMicroApp } from 'qiankun'

interface SubApp {
  id: string
  name: string
  badge: string
  tech: string
  port: number
  theme: string
}

const subApps: SubApp[] = [
  { id: 'vue3', name: 'Vue3 App', badge: '子应用', tech: 'Vue3 + Element Plus', port: 8081, theme: 'vue3' },
  { id: 'vue2', name: 'Vue2 App', badge: '子应用', tech: 'Vue2 + Element UI', port: 8082, theme: 'vue2' },
  { id: 'react', name: 'React App', badge: '子应用', tech: 'React 19 + Ant Design', port: 8083, theme: 'react' },
  { id: 'angular', name: 'Angular App', badge: '子应用', tech: 'Angular 17 + Material', port: 8084, theme: 'angular' },
]

const currentApp = ref<string>('')
let microApp: any = null

function getAppConfig(id: string) {
  return subApps.find(app => app.id === id)
}

function openApp(port: number) {
  window.open(`http://localhost:${port}`, '_blank')
}

function loadApp(appId: string) {
  if (microApp && currentApp.value === appId) {
    microApp.unmount()
    microApp = null
    currentApp.value = ''
    return
  }

  if (microApp) {
    microApp.unmount()
    microApp = null
  }

  const config = getAppConfig(appId)
  if (!config) return

  currentApp.value = appId

  microApp = loadMicroApp(
    {
      name: `sub-app-${appId}`,
      entry: `//localhost:${config.port}`,
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
  padding: 24px 0;
  max-width: 1200px;
  margin: 0 auto;
}

.badge {
  display: inline-block;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  font-size: 18px;
  color: #303133;
  margin: 0;
}

.app-count {
  font-size: 13px;
  color: #909399;
  background: #f4f4f5;
  padding: 4px 12px;
  border-radius: 12px;
}

.sub-apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.app-card {
  background: white;
  border: 2px solid #e4e7ed;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.app-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: #409eff;
}

.app-card.active {
  border-color: #67c23a;
  background: #f0f9eb;
  box-shadow: 0 4px 16px rgba(103, 194, 58, 0.15);
}

.app-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.badge.vue3 {
  background: #f0f9eb;
  color: #67c23a;
}

.badge.vue2 {
  background: #fdf6ec;
  color: #e6a23c;
}

.badge.react {
  background: #e6f7ff;
  color: #1890ff;
}

.badge.angular {
  background: #fff1f0;
  color: #dd0031;
}

.app-card.active .badge.vue3,
.app-card.active .badge.vue2,
.app-card.active .badge.react,
.app-card.active .badge.angular {
  background: white;
}

.status {
  font-size: 12px;
  color: #67c23a;
  font-weight: 500;
}

.status::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #67c23a;
  margin-right: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.app-card h4 {
  font-size: 16px;
  color: #303133;
  margin: 0 0 6px;
}

.app-tech {
  font-size: 13px;
  color: #909399;
  margin: 0 0 16px;
}

.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #ebeef5;
}

.app-card.active .app-footer {
  border-top-color: #c2e7b0;
}

.app-port {
  font-size: 13px;
  color: #606266;
  font-family: monospace;
}

.open-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.open-btn:hover {
  background: #337ecc;
  transform: translateY(-1px);
}

.open-btn svg {
  transition: transform 0.2s ease;
}

.open-btn:hover svg {
  transform: translate(2px, -2px);
}

.app-card.active .open-btn {
  background: #67c23a;
}

.app-card.active .open-btn:hover {
  background: #529b2e;
}

.sub-app-container {
  margin-top: 24px;
  border: 2px dashed #409eff;
  border-radius: 12px;
  min-height: 400px;
  padding: 20px;
  background: #fafafa;
}

@media (max-width: 768px) {
  .sub-apps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
