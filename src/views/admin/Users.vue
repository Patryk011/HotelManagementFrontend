<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :rowData="rowData"
    :defaultColDef="defaultColDef"
    :columnDefs="colDefs"
    :pagination="true"
    :paginationPageSize="10"
    :overlayLoadingTemplate="loadingTemplate"
    :overlayNoRowsTemplate="noRowsTemplate"
    @cell-clicked="onCellClicked"
    style="height: 1200px"
  />
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { onMounted, ref } from "vue";
import { UserService } from "../../services/user.service";

const rowData = ref<any[]>([]);
const loading = ref(false);
const loadingTemplate = `<span class="ag-overlay-loading-center">Loading users...</span>`;
const noRowsTemplate = `<span class="ag-overlay-no-rows-center">No users found</span>`;

const colDefs = ref([
  {
    headerName: "Email",
    field: "email",
    filter: true,
    sortable: true,
  },
  {
    headerName: "Imię i nazwisko",
    field: "name",
    filter: true,
    sortable: true,
  },
  {
    headerName: "Numer telefonu",
    field: "phoneNumber",
    filter: true,
    sortable: true,
  },
  {
    headerName: "Akcje",
    cellRenderer: actionRenderer,
    sortable: false,
    filter: false,
    width: 120,
  },
]);

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
};

function actionRenderer() {
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

async function fetchUsers() {
  try {
    loading.value = true;

    const response = await UserService.getUsers();

    rowData.value = response.data.map((user: any) => ({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      phoneNumber: user.phoneNumber,
    }));
  } catch (err) {
    console.error(`Failed to fetch users ${err}`);
    rowData.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await fetchUsers();
});
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
