<template>
  <section class="bg-white rounded-2xl shadow-sm p-6" :class="className">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ className?: string }>();
const className = props.className ?? '';
</script>
