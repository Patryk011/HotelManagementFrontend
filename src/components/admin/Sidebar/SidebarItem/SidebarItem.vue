<template>
  <div class="sidebar-item-wrapper">
    <router-link :to :class="['sidebar-item', { active: isActive }]">
      <div class="icon-wrapper">
        <Icon :icon-type="icon" :color="iconColor" />
      </div>
      <span v-show="isExpanded">{{ text }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Icon from "../../../shared/Icon/Icon.vue";
import { ISidebarItemProps } from "./SidebarItem.types";
import { computed } from "vue";
import { useToggleContext } from "../../../../composables/useExpansion/useToggleContext";

const props = defineProps<ISidebarItemProps>();

const route = useRoute();

const { isExpanded } = useToggleContext();

const isActive = computed(() => route.path === props.to);

const iconColor = computed(() =>
  isActive.value ? "var(--active-color)" : "gray"
);
</script>
<style lang="scss" scoped>
.sidebar-item-wrapper {
  --default-site-color: #e1cb9b;
  --active-bg-color: rgba(255, 255, 255, 0.12);
  --hover-color: rgba(255, 255, 255, 0.05);
  --text-color: #f1f5f9;
  --active-color: #f1f5f9;

  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    padding: 0.5rem 1rem;
    color: var(--text-color);
    background-color: transparent;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

    &:hover {
      background-color: var(--hover-color);
    }

    &.active {
      color: var(--active-color);
      background-color: var(--active-bg-color);
      border-right: 5px solid var(--default-site-color);
    }

    .sidebar-text {
      padding-top: 0.2rem;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-color);
      transition: opacity 0.3s ease-in-out;
    }
  }
}
</style>
