<template>
  <div id="main-app">
    <nav class="navbar">
      <h1>Qiankun 微前端 - 主应用</h1>
      <div class="nav-links">
        <router-link to="/">首页</router-link>
        <router-link to="/sub-app">子应用</router-link>
      </div>
    </nav>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#main-app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #409eff;
  color: white;
}

.navbar h1 {
  font-size: 20px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.nav-links a:hover {
  text-decoration: underline;
}

.content {
  padding: 24px;
}
</style>
