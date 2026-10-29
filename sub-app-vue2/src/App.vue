<template>
  <div class="vue2-app">
    <h2>Vue2 子应用</h2>
    <p>技术栈：Vue2 + Vite + TypeScript</p>
    <div class="counter">
      <button @click="count--">-</button>
      <span>{{ count }}</span>
      <button @click="count++">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      count: 0,
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
