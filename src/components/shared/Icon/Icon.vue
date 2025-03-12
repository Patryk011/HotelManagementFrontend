<template>
  <div
    :class="['icon-wrapper', { 'has-hover': props.hoverColor }]"
    :style="iconStyles"
    v-html="iconSvgContent"
  ></div>
</template>

<script setup lang="ts">
import { computed, CSSProperties, onMounted, ref } from "vue";
import { IIconProps } from "./Icon.types";

const iconSvgContent = ref<string>("");

const props = defineProps<IIconProps>();

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
<style lang="scss" scoped></style>
