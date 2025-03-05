import { createApp } from "vue";
import "../src/assets/styles/global.scss";
import router from "../src/router/router";
import App from "./App.vue";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

createApp(App).use(router).mount("#app");
