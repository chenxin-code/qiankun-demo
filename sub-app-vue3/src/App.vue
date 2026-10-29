<template>
  <div class="vue3-app">
    <h2>Vue3 子应用</h2>
    <p>技术栈：Vue3 + Vite + TypeScript</p>
    <div class="counter">
      <button @click="count--">-</button>
      <span>{{ count }}</span>
      <button @click="count++">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
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
  background: #42b883;
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
