<template>
  <button
    :class="[
      'inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
      variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' : 'bg-white text-slate-700 border'
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ variant?: 'primary' | 'white' }>();
const variant = props.variant ?? 'primary';
</script>
