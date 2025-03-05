<template>
  <ag-grid-vue :rowData="rowData" :columnDefs="colDefs" style="height: 500px" />
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { onMounted, ref } from "vue";

const rowData = ref([
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
]);

const colDefs = ref([
  { field: "make" },
  { field: "model" },
  { field: "price" },
  { field: "electric" },
]);
</script>

<style lang="scss" scoped>
@import "ag-grid-community/styles/ag-grid.css";
@import "ag-grid-community/styles/ag-theme-alpine.css";
</style>
