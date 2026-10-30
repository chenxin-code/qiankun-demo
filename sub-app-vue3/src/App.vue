<template>
  <div class="vue3-app">
    <h2>Vue3 子应用</h2>
    <p>技术栈：Vue3 + Vite + TypeScript + Element Plus</p>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="city" label="城市" />
      <el-table-column prop="score" label="分数" width="100" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '张三', age: 25, city: '北京', score: 92 },
  { id: 2, name: '李四', age: 30, city: '上海', score: 88 },
  { id: 3, name: '王五', age: 28, city: '广州', score: 95 },
  { id: 4, name: '赵六', age: 35, city: '深圳', score: 78 },
  { id: 5, name: '孙七', age: 22, city: '杭州', score: 85 },
])
</script>

<style scoped>
.vue3-app {
  padding: 20px;
}

.vue3-app h2 {
  color: #42b883;
  margin-bottom: 12px;
}

.vue3-app p {
  color: #666;
  margin-bottom: 20px;
}
</style>
