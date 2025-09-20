<template>
  <label :for="forId" class="block text-sm font-medium text-slate-700">
    <slot />
  </label>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ for?: string }>();
const forId = props.for ?? undefined;
</script>
