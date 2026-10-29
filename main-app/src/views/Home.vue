<template>
  <div class="home">
    <h2>欢迎使用 Qiankun 微前端架构</h2>
    <p>主应用运行在 Vite + Vue3 + TypeScript</p>
    <div class="info-cards">
      <div class="card">
        <h3>主应用</h3>
        <p>端口: 8080</p>
        <p>技术栈: Vite + Vue3 + TS</p>
      </div>
      <div class="card">
        <h3>子应用</h3>
        <p>端口: 8081</p>
        <p>通过 qiankun 加载</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  padding: 20px 0;
}

.home h2 {
  margin-bottom: 12px;
  color: #303133;
}

.home p {
  color: #606266;
  margin-bottom: 20px;
}

.info-cards {
  display: flex;
  gap: 20px;
}

.card {
  flex: 1;
  padding: 24px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #f5f7fa;
}

.card h3 {
  color: #409eff;
  margin-bottom: 12px;
}

.card p {
  margin-bottom: 6px;
  font-size: 14px;
}
</style>
