<template>
  <div class="vue2-app">
    <h2>Vue2 子应用</h2>
    <p>技术栈：Vue2 + Vite + TypeScript + Element UI</p>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="city" label="城市" />
      <el-table-column prop="score" label="分数" width="100" />
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      tableData: [
        { id: 1, name: '小明', age: 26, city: '成都', score: 90 },
        { id: 2, name: '小红', age: 24, city: '重庆', score: 87 },
        { id: 3, name: '小刚', age: 29, city: '武汉', score: 93 },
        { id: 4, name: '小丽', age: 32, city: '南京', score: 82 },
        { id: 5, name: '小强', age: 27, city: '西安', score: 88 },
      ],
    }
  },
})
</script>

<style scoped>
.vue2-app {
  padding: 20px;
}

.vue2-app h2 {
  color: #4fc08d;
  margin-bottom: 12px;
}

.vue2-app p {
  color: #666;
  margin-bottom: 20px;
}

.counter {
  display: flex;
  align-items: center;
  gap: 16px;
}

.counter button {
  width: 40px;
  height: 40px;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  background: #4fc08d;
  color: white;
  cursor: pointer;
}

.counter span {
  font-size: 24px;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
}
</style>
