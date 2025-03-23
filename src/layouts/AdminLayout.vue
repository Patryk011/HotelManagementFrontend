<template>
  <div class="admin-container">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "../components/admin/Sidebar/Sidebar.vue";
</script>

<style lang="scss" scoped>
.admin-container {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
}
</style>
