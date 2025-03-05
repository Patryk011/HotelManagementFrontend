import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../layouts/AdminLayout.vue";
import Users from "../views/admin/Users.vue";

const routes = [
  {
    path: "/admin",
    component: AdminLayout,
    children: [{ path: "users", component: Users }],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
