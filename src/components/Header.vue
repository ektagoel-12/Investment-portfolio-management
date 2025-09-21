<template>
  <header class="w-full bg-blue-600 text-white py-4 shadow">
    <div class="app-container flex justify-between items-center">
      <h1 class="text-lg font-bold">Investment Portfolio</h1>
      <nav class="space-x-4">
        <router-link to="/" class="hover:underline">Home</router-link>
        <router-link to="/portfolios" class="hover:underline">Portfolios</router-link>
        <router-link to="/users" class="hover:underline">Clients</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>
