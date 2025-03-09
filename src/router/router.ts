import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../layouts/AdminLayout.vue";
import Users from "../views/admin/Users.vue";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";
import ClientLayout from "../layouts/ClientLayout.vue";

const routes = [
  {
    path: "/",
    component: ClientLayout,
  },
  {
    path: "/admin",
    component: AdminLayout,

    children: [{ path: "users", component: Users }],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  await authStore.initAuth();

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return authStore.login();
    }
  }

  next();
});
export default router;
