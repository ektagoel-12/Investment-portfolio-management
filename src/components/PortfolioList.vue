<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Portfolios</h1>
      <div class="flex items-center gap-3">
        <select v-model="filter" class="p-2 rounded-md border bg-white">
          <option value="">All</option>
          <option value="UPCOMING">UPCOMING</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="CLOSED">CLOSED</option>
        </select>
        <router-link to="/portfolios/new"><BaseButton>New Portfolio</BaseButton></router-link>
      </div>
    </div>

    <div class="grid gap-4">
      <Card v-for="p in filtered" :key="p.id" className="flex justify-between items-center">
        <div>
          <router-link :to="`/portfolios/${p.id}`" class="text-lg font-medium text-slate-900">{{ p.name }}</router-link>
          <div class="text-sm text-slate-500 mt-1">Status: {{ p.status }} • Client: {{ getClientName(p.clientId) }}</div>
        </div>
        <div class="flex items-center gap-3">
          <router-link :to="`/portfolios/${p.id}/edit`" class="text-blue-600">Edit</router-link>
          <button @click="remove(p.id)" class="text-red-600">Delete</button>
        </div>
      </Card>

      <div v-if="filtered.length === 0" class="py-8 text-center text-slate-500">No portfolios found.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Card from '../components/ui/Card.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import type { Portfolio, PortfolioStatus, User } from '../types';

const store = useStore();
const filter = ref<'' | PortfolioStatus>('');

const portfolios = computed<Portfolio[]>(() => (store.state.portfolios as Portfolio[]) || []);
const users = computed<User[]>(() => (store.state.users as User[]) || []);

const filtered = computed(() =>
  filter.value ? portfolios.value.filter((p: Portfolio) => p.status === filter.value) : portfolios.value
);

const getClientName = (id: string) => users.value.find(u => u.id === id)?.name ?? '—';

const remove = (id: string) => {
  if (!confirm('Delete portfolio?')) return;
  store.commit('deletePortfolio', id);
};
</script>
