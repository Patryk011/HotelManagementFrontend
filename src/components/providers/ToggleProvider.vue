<template>
  <slot />
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { toggleContext } from "./ToggleProvider.keys";

const isExpanded = ref<boolean>(false);

const toggleExpansion = () => (isExpanded.value = !isExpanded.value);

provide(toggleContext, { isExpanded, toggleExpansion });
</script>
