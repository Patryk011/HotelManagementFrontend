<template>
  <div id="app">
    <Sidebar />
    <div class="content">
      <MainPanel />
      <ReservationsPanel />
      <ClientsPanel />
      <RoomsPanel />
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
</script>
<style scoped>
#app {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
