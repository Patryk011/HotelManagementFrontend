<template>
  <ToggleProvider>
    <router-view />
  </ToggleProvider>
</template>
<script setup lang="ts">
import ToggleProvider from "./components/providers/ToggleProvider.vue";
</script>
