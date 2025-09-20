<template>
  <header class="bg-white border-b shadow-sm">
    <div class="app-container flex items-center justify-between h-16">
      <div class="flex items-center gap-4">
        <router-link to="/" class="inline-flex items-center gap-3">
          <div class="w-9 h-9 rounded bg-blue-600 flex items-center justify-center text-white font-bold">IP</div>
          <div>
            <div class="text-lg font-semibold text-slate-900">InvestTrack</div>
            <div class="text-xs text-slate-500">Portfolio Management</div>
          </div>
        </router-link>
      </div>

      <nav class="flex items-center gap-4">
        <router-link to="/portfolios" class="text-sm px-3 py-2 rounded hover:bg-blue-50">Portfolios</router-link>
        <router-link to="/users" class="text-sm px-3 py-2 rounded hover:bg-blue-50">Clients</router-link>
        <router-link to="/portfolios/new" class="hidden md:inline-block">
          <BaseButton>New Portfolio</BaseButton>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue';
</script>
