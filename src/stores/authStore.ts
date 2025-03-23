import { defineStore } from "pinia";
import { ref } from "vue";
import { keycloak, keycloakLogout } from "../keycloak/keycloak.service";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref<boolean>(false);

  const initAuth = async () => {
    isAuthenticated.value = keycloak.authenticated || false;
  };

  const login = () => keycloak.login();

  const logout = async () => await keycloakLogout();

  return { login, logout, isAuthenticated, initAuth };
});
