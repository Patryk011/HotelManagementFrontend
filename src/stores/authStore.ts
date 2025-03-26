import { defineStore } from "pinia";
import { ref } from "vue";
import { keycloak, keycloakLogout } from "../keycloak/keycloak.service";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref<boolean>(false);
  const isAdmin = ref<boolean>(false);

  const initAuth = async () => {
    isAuthenticated.value = keycloak.authenticated || false;

    if (!isAuthenticated.value) return;

    isAdmin.value = keycloak.hasRealmRole("admin");
  };

  const login = () =>
    keycloak.login({
      redirectUri: window.location.origin + window.location.pathname,
    });

  const logout = async () => await keycloakLogout();

  return { login, logout, isAuthenticated, initAuth };
});
