<template>
  <div class="sub-apps-page">
    <h2>子应用列表</h2>
    <p>点击按钮加载对应的子应用</p>
    <div class="app-buttons">
      <button @click="loadApp('vue3')" :class="{ active: currentApp === 'vue3' }">加载 Vue3 子应用</button>
      <button @click="loadApp('vue2')" :class="{ active: currentApp === 'vue2' }">加载 Vue2 子应用</button>
    </div>
    <div id="sub-app-container" class="sub-app-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { registerMicroApps, start } from 'qiankun'

const currentApp = ref<string>('')
let appsRegistered = false

onMounted(() => {
  if (!appsRegistered) {
    registerMicroApps([
      {
        name: 'sub-app-vue3',
        entry: '//localhost:8083',
        container: '#sub-app-container',
        activeRule: () => currentApp.value === 'vue3',
      },
      {
        name: 'sub-app-vue2',
        entry: '//localhost:8084',
        container: '#sub-app-container',
        activeRule: () => currentApp.value === 'vue2',
      },
    ])

    start({
      sandbox: {
        experimentalStyleIsolation: true,
      },
    })
    appsRegistered = true
  }
})

function loadApp(app: string) {
  currentApp.value = app
}
</script>

<style scoped>
.sub-apps-page {
  padding: 20px 0;
}

.sub-apps-page h2 {
  margin-bottom: 12px;
  color: #303133;
}

.sub-apps-page p {
  color: #606266;
  margin-bottom: 20px;
}

.app-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.app-buttons button {
  padding: 10px 20px;
  font-size: 14px;
  border: 2px solid #409eff;
  border-radius: 6px;
  background: white;
  color: #409eff;
  cursor: pointer;
  transition: all 0.3s;
}

.app-buttons button:hover {
  background: #ecf5ff;
}

.app-buttons button.active {
  background: #409eff;
  color: white;
}

.sub-app-container {
  border: 2px dashed #409eff;
  border-radius: 8px;
  min-height: 300px;
  padding: 20px;
  background: #fafafa;
}
</style>
