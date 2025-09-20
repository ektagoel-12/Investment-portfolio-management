<template>
  <div class="min-h-screen">
    <Header />
    <main class="py-8">
      <div class="app-container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '../src/components/ui/Header.vue';
</script>
