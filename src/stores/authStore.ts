import { defineStore } from "pinia";
import { ref } from "vue";
import { keycloak } from "../keycloak/keycloak.service";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref<boolean>(false);

  const initAuth = async () => {
    isAuthenticated.value = keycloak.authenticated || false;
  };

  const login = () => keycloak.login();

  const logout = () => keycloak.logout();

  return { login, logout, isAuthenticated, initAuth };
});
