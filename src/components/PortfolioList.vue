<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-slate-900">📊 Portfolios</h1>
      <div class="flex items-center gap-3">
        <select v-model="filter" class="p-2 rounded-md border bg-white shadow-sm">
          <option value="">All</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="ACTIVE">Active</option>
          <option value="CLOSED">Closed</option>
        </select>
        <router-link to="/portfolios/new">
          <Button class="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-indigo-700">
            + New Portfolio
          </Button>
        </router-link>
      </div>
    </div>

    <!-- Portfolio List -->
    <div class="grid gap-6">
      <Card
        v-for="p in filtered"
        :key="p.id"
        class="p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col sm:flex-row sm:justify-between sm:items-center"
      >
        <!-- Portfolio Info -->
        <div class="space-y-2">
          <router-link
            :to="`/portfolios/${p.id}`"
            class="text-xl font-semibold text-slate-900 hover:text-blue-600"
          >
            {{ p.name }}
          </router-link>

          <!-- Status Badge -->
          <span
            class="inline-block text-xs font-medium px-2 py-1 rounded-md"
            :class="{
              'bg-green-100 text-green-700': p.status === 'ACTIVE',
              'bg-blue-100 text-blue-700': p.status === 'UPCOMING',
              'bg-gray-200 text-gray-600': p.status === 'CLOSED'
            }"
          >
            {{ p.status }}
          </span>

          <!-- Details Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-slate-600 mt-2">
            <div>
              <span class="font-medium text-slate-800">💰 Investment:</span>
              ₹{{ p.initialInvestment || '—' }}
            </div>
            <div>
              <span class="font-medium text-slate-800">📅 Created:</span>
              {{ formatDate(p.createdAt) }}
            </div>
            <div>
              <span class="font-medium text-slate-800">👤 Client:</span>
              {{ getClientName(p.clientId) }}
            </div>
          </div>

          <!-- Progress / Growth -->
          <div class="mt-3">
            <div class="h-2 w-full rounded-full bg-slate-200">
              <div
                class="h-2 rounded-full bg-blue-500 transition-all"
                :style="{ width: getGrowth(p.id) + '%' }"
              ></div>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Growth {{ getGrowth(p.id) }}%
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 mt-4 sm:mt-0">
          <router-link
            :to="`/portfolios/${p.id}`"
            class="px-3 py-1 text-sm rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            👁 View
          </router-link>
          <router-link
            :to="`/portfolios/${p.id}/edit`"
            class="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            ✏️ Edit
          </router-link>
          <button
            @click="remove(p.id)"
            class="px-3 py-1 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200"
          >
            🗑 Delete
          </button>
        </div>
      </Card>

      <!-- Empty State -->
      <div
        v-if="filtered.length === 0"
        class="py-10 text-center text-slate-500"
      >
        No portfolios found.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { Card } from '../components/ui/card/index';
import Button from './ui/button/Button.vue';
import type { Portfolio, PortfolioStatus, User } from '../types';

const store = useStore();
const filter = ref<'' | PortfolioStatus>('');

const portfolios = computed<Portfolio[]>(() => (store.state.portfolios as Portfolio[]) || []);
const users = computed<User[]>(() => (store.state.users as User[]) || []);

const filtered = computed(() =>
  filter.value
    ? portfolios.value.filter((p: Portfolio) => p.status === filter.value)
    : portfolios.value
);

const getClientName = (id: string) =>
  users.value.find((u) => u.id === id)?.name ?? '—';

const formatDate = (date: string | undefined) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString();
};

// Temporary: compute a fake growth % based on portfolio ID hash
const getGrowth = (id: string): number => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % 100); // value between 0–99
};

const remove = (id: string) => {
  if (!confirm('Delete portfolio?')) return;
  store.commit('deletePortfolio', id);
};
</script>
