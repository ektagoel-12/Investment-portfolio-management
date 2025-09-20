<template>
  <p v-if="error && error !== ''" class="text-sm text-red-600 mt-1" role="alert">
    {{ error }}
  </p>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';

// fieldError is a reactive ref provided by the nearest FormField
const fieldError = inject<any>('fieldError', null);

const error = computed(() => {
  if (!fieldError) return '';
  // fieldError may be a ref or a string
  return typeof fieldError === 'function' ? fieldError() : fieldError.value ?? '';
});
</script>
