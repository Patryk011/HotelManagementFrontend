<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :rowData="rowData"
    :defaultColDef="defaultColDef"
    :columnDefs="colDefs"
    style="height: 1200px"
    :pagination="true"
    :paginationPageSize="10"
    @cell-clicked="onCellClicked"
  />
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { onMounted, ref } from "vue";

const rowData = ref([
  {
    guestName: "John Smith",
    roomNumber: "101",
    checkIn: "2025-03-14",
    checkOut: "2025-03-17",
    status: "Zameldowany",
  },
  {
    guestName: "Maria Garcia",
    roomNumber: "205",
    checkIn: "2025-03-15",
    checkOut: "2025-03-18",
    status: "Zarezerwowany",
  },
  {
    guestName: "Robert Johnson",
    roomNumber: "310",
    checkIn: "2025-03-13",
    checkOut: "2025-03-16",
    status: "Wymeldowany",
  },
]);

const colDefs = ref([
  {
    headerName: "Imię i Nazwisko",
    field: "guestName",
    filter: true,
    sortable: true,
  },
  {
    headerName: "Pokój",
    field: "roomNumber",
    width: 120,
    filter: true,
  },
  {
    headerName: "Zameldowanie",
    field: "checkIn",
    filter: true,
    sortable: true,
  },
  {
    headerName: "Wymeldowanie",
    field: "checkOut",
    filter: true,
  },
  {
    headerName: "Status",
    field: "status",
    filter: true,
    cellRenderer: statusRenderer,
  },
  {
    headerName: "Akcje",
    field: "actions",
    sortable: false,
    filter: false,
    cellRenderer: actionRenderer,
    width: 120,
  },
]);

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
};

function statusRenderer(params: any) {
  const status = params.value;

  const statusColor: Record<string, string> = {
    Zameldowany: "green",
    Zarezerwowany: "blue",
    Wymeldowany: "gray",
  };

  return `<span style="color: ${statusColor[status]}; font-weight: bold;">${status}</span>`;
}

function actionRenderer(params: any) {
  return `
    <div class="action-buttons">
      <button class="btn-delete" data-action="delete">Usuń</button>
    </div>
  `;
}

function onCellClicked(params: any) {
  const clickedElement = params.event.target;
  if (clickedElement.dataset.action === "delete") {
    deleteRow(params.node.rowIndex);
  }
}

function deleteRow(index: number) {
  const updatedData = [...rowData.value];
  updatedData.splice(index, 1);
  rowData.value = updatedData;
}
</script>

<style lang="scss" scoped>
@import "ag-grid-community/styles/ag-grid.css";
@import "ag-grid-community/styles/ag-theme-alpine.css";

:deep(.btn-delete) {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #d32f2f;
  }
}
</style>
