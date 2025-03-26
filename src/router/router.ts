import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../layouts/AdminLayout.vue";
import { useAuthStore } from "../stores/authStore";
import ClientLayout from "../layouts/ClientLayout.vue";
import Reservations from "../views/admin/Reservations.vue";
import Users from "../views/admin/Users.vue";

const routes = [
  {
    path: "/",
    component: ClientLayout,
  },
  {
    path: "/admin",
    component: AdminLayout,

    children: [
      { path: "reservations", component: Reservations },
      { path: "users", component: Users },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/worker",
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      roles: ["worker"],
    },
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  await authStore.initAuth();

  const isWorkerRoute = to.path.startsWith("/worker");

  const isAdminRoute = to.path.startsWith("/admin");

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      if (isAdminRoute || isWorkerRoute) {
        return authStore.login();
      }
    }
  }

  next();
});
export default router;
