<template>
  <button class="logout" @click="logout">
    <Icon icon-type="Logout" color="gray" />
    <span class="logout-text" v-show="isExpanded">Wyloguj</span>
  </button>
</template>

<script setup lang="ts">
import { useToggleContext } from "../../../../composables/useExpansion/useToggleContext";
import { useAuthStore } from "../../../../stores/authStore";
import Icon from "../../../shared/Icon/Icon.vue";

const authStore = useAuthStore();

const logout = async () => {
  try {
    await authStore.logout();
  } catch (err) {
    console.error(err);
  }
};

const { isExpanded } = useToggleContext();
</script>
<style lang="scss" scoped>
.logout {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: auto;
  background-color: transparent;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;

  .logout-text {
    font-size: 1rem;
    margin-left: 1rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
}
</style>
