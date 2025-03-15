<template>
  <div class="menu-toggle-wrap">
    <button
      class="menu-toggle"
      @click="toggle"
      :class="{ expanded: isExpanded }"
    >
      <Icon icon-type="RightArrows" :class="{ rotated: isExpanded }" />
    </button>
  </div>
</template>
<script setup lang="ts">
import Icon from "../../../shared/Icon/Icon.vue";
import { IMenuToggleProps } from "./MenuToggle.types";

defineProps<IMenuToggleProps>();

const emit = defineEmits<{ (e: "toggle"): void }>();

const toggle = () => emit("toggle");
</script>

<style lang="scss" scoped>
.menu-toggle-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  position: relative;
  top: 0;

  .menu-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateX(0.5rem);
    }

    &.expanded:hover {
      transform: translateX(-0.5rem);
    }
  }

  .rotated {
    transform: rotate(-180deg);
    transition: transform 0.3s ease;
  }
}
</style>
