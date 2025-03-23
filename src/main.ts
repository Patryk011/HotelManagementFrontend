import { createApp } from "vue";
import "../src/assets/styles/global.scss";
import router from "../src/router/router";
import App from "./App.vue";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { createPinia } from "pinia";
import { initKeycloak } from "./keycloak/keycloak.service";
import { useAuthStore } from "./stores/authStore";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const pinia = createPinia();
initKeycloak().then(() => {
  const app = createApp(App);
  app.use(pinia);
  app.use(router);

  const authStore = useAuthStore();
  authStore.initAuth();

  app.mount("#app");
});
