<template>
  <div
    :class="['icon-wrapper', { 'has-hover': hoverColor }]"
    :style="iconStyles"
    v-html="iconSvgContent"
  ></div>
</template>

<script setup lang="ts">
import { computed, CSSProperties, onMounted, ref } from "vue";
import { IIconProps } from "./Icon.types";

const props = defineProps<IIconProps>();

const iconSvgContent = ref<string>("");

onMounted(async () => {
  try {
    const response = await fetch(`/src/assets/icons/${props.iconType}.svg`);

    iconSvgContent.value = await response.text();
  } catch (error) {
    console.error("problem with loading icon", error);
    iconSvgContent.value = "";
  }
});

const iconStyles = computed<CSSProperties>(() => ({
  "--fill": props.color,
  ...(props.hoverColor && { "--hover-fill": props.hoverColor }),
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
  height: typeof props.height === "number" ? `${props.height}px` : props.height,
}));
</script>
<style lang="scss" scoped>
.icon-wrapper {
  --fill: black;

  :deep(svg) {
    height: inherit;
    width: inherit;
    fill: var(--fill);
    transition: fill 0.1s ease-in, stroke 0.1s ease-in;
  }

  &.has-hover {
    :deep(svg) {
      &:hover {
        fill: var(--hover-fill);
      }
    }
  }
}
</style>
