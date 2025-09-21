<template>
  <div>
    <div v-if="!portfolio" class="text-slate-500">Portfolio not found.</div>

    <Card v-else>
      <!-- Header -->
      <div class="flex justify-between items-start mb-4">
        <div>
          <h2 class="text-2xl font-semibold">{{ portfolio.name }}</h2>
          <div class="text-sm text-slate-500 mt-1">
            Status: {{ portfolio.status }} • Created: {{ formattedDate }}
          </div>
          <div class="text-sm text-slate-500 mt-1">
            Client: {{ clientName }}
          </div>
        </div>
        <div>
          <router-link :to="`/portfolios/${portfolio.id}/edit`" class="text-blue-600 hover:underline text-sm">
            Edit
          </router-link>
        </div>
      </div>

      <hr class="my-4" />

      <!-- Portfolio Info -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p class="text-sm text-slate-500">Initial Investment</p>
          <p class="text-base font-medium">
            ₹ {{ portfolio.initialInvestment !== undefined ? portfolio.initialInvestment.toLocaleString() : 0 }}
          </p>
        </div>
        <div>
          <p class="text-sm text-slate-500">Start Date</p>
          <p class="text-base font-medium">
            {{ portfolio.startDate ? new Date(portfolio.startDate).toLocaleDateString() : '—' }}
          </p>
        </div>
        <div class="sm:col-span-2" v-if="portfolio.notes">
          <p class="text-sm text-slate-500">Notes</p>
          <p class="text-base font-medium whitespace-pre-line">{{ portfolio.notes }}</p>
        </div>
      </div>

      <!-- Holdings -->
      <div>
        <h3 class="font-medium mb-2">Holdings</h3>
        <table class="w-full text-left border rounded-md">
          <thead>
            <tr class="border-b bg-slate-100">
              <th class="py-2 px-2">Symbol</th>
              <th class="py-2 px-2">Quantity</th>
              <th class="py-2 px-2">Avg Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="h in portfolio.holdings"
              :key="h.symbol"
              class="odd:bg-white even:bg-slate-50"
            >
              <td class="py-2 px-2">{{ h.symbol }}</td>
              <td class="py-2 px-2">{{ h.quantity }}</td>
              <td class="py-2 px-2">₹ {{ h.avgPrice }}</td>
            </tr>
            <tr v-if="!portfolio.holdings || portfolio.holdings.length === 0">
              <td colspan="3" class="py-6 text-center text-slate-500">No holdings.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import {Card} from '../components/ui/card/index';

const route = useRoute();
const store = useStore();
const id = route.params.id as string | undefined;
const portfolio = computed(() => (id ? store.getters.getPortfolioById(id) : null));
const users = computed(() => store.state.users || []);

const clientName = computed(() => {
  if (!portfolio.value) return '—';
  return users.value.find((u: any) => u.id === portfolio.value.clientId)?.name ?? '-';
});

const formattedDate = computed(() =>
portfolio.value?.createdAt
    ? new Date(portfolio.value.createdAt).toLocaleString()
    : '—'
);
</script>
