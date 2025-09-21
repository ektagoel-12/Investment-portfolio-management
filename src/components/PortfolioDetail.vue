<template>
  <div>
    <div v-if="!portfolio" class="text-slate-500 text-center py-20">Portfolio not found.</div>

    <Card v-else class="p-6 rounded-xl shadow-md bg-white space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 class="text-3xl font-bold text-slate-800">{{ portfolio.name }}</h2>
          <div class="text-sm text-slate-500 mt-1">
            Created: {{ formattedDate }} • Client: {{ clientName }}
          </div>
        </div>
        <span
          class="px-3 py-1 text-sm font-medium rounded-full"
          :class="{
            'bg-green-100 text-green-700': portfolio.status === 'ACTIVE',
            'bg-red-100 text-red-700': portfolio.status === 'CLOSED',
            'bg-yellow-100 text-yellow-700': portfolio.status === 'UPCOMING'
          }"
        >
          {{ portfolio.status }}
        </span>
      </div>

      <hr />

      <!-- Portfolio Info -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="p-4 bg-slate-50 rounded-lg shadow-sm">
          <p class="text-sm font-medium text-slate-600 uppercase tracking-wide">Initial Investment</p>
          <p class="text-xl font-bold text-slate-800">
            ₹ {{ portfolio.initialInvestment !== undefined ? portfolio.initialInvestment.toLocaleString() : 0 }}
          </p>
        </div>
        <div class="p-4 bg-slate-50 rounded-lg shadow-sm">
          <p class="text-sm font-medium text-slate-600 uppercase tracking-wide">Start Date</p>
          <p class="text-xl font-bold text-slate-800">
            {{ portfolio.startDate ? new Date(portfolio.startDate).toLocaleDateString() : '—' }}
          </p>
        </div>
      </div>

      <!-- Notes -->
      <div v-if="portfolio.notes" class="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md shadow-sm">
        <p class="text-sm font-medium text-slate-700 uppercase tracking-wide">Notes</p>
        <p class="text-base text-slate-700 whitespace-pre-line mt-1">{{ portfolio.notes }}</p>
      </div>

      <!-- Chart + Holdings -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Chart -->
        <div class="p-4 rounded-lg shadow-sm bg-white border animate-fadeIn">
          <h3 class="font-semibold mb-3">Holdings Distribution</h3>
          <canvas id="holdingsChart"></canvas>
        </div>

        <!-- Holdings Table -->
        <div class="p-4 rounded-lg shadow-sm bg-white border">
          <h3 class="font-semibold mb-3">Holdings</h3>
          <table class="w-full text-left border rounded-md overflow-hidden">
            <thead>
              <tr class="bg-slate-100 text-slate-700">
                <th class="py-2 px-3">Symbol</th>
                <th class="py-2 px-3">Quantity</th>
                <th class="py-2 px-3">Avg Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="h in portfolio.holdings"
                :key="h.symbol"
                class="odd:bg-white even:bg-slate-50 hover:bg-blue-50 transition cursor-pointer"
              >
                <td class="py-2 px-3 flex items-center gap-2">
                  <img :src="getStockLogo(h.symbol)" alt="" class="w-5 h-5 rounded" />
                  {{ h.symbol }}
                </td>
                <td class="py-2 px-3">{{ h.quantity }}</td>
                <td class="py-2 px-3">₹ {{ h.avgPrice }}</td>
              </tr>
              <tr v-if="!portfolio.holdings || portfolio.holdings.length === 0">
                <td colspan="3" class="py-6 text-center text-slate-500">No holdings.</td>
              </tr>
            </tbody>
          </table>

          <!-- Summary -->
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="p-3 bg-slate-50 rounded-lg shadow-sm">
              <p class="text-sm text-slate-500">Total Quantity</p>
              <p class="font-bold text-lg">{{ totalQuantity }}</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-lg shadow-sm">
              <p class="text-sm text-slate-500">Total Investment</p>
              <p class="font-bold text-lg">₹ {{ totalInvestment.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { Card } from '../components/ui/card/index';
import Chart from 'chart.js/auto';

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
  portfolio.value?.createdAt ? new Date(portfolio.value.createdAt).toLocaleString() : '—'
);

// Holdings summary
const totalQuantity = computed(() =>
  portfolio.value?.holdings?.reduce((sum: number, h: any) => sum + h.quantity, 0) || 0
);

const totalInvestment = computed(() =>
  portfolio.value?.holdings?.reduce((sum: number, h: any) => sum + h.quantity * h.avgPrice, 0) || 0
);

// Fake logo mapping
const getStockLogo = (symbol: string) => {
  const logos: Record<string, string> = {
    AAPL: 'https://logo.clearbit.com/apple.com',
    MSFT: 'https://logo.clearbit.com/microsoft.com',
    TSLA: 'https://logo.clearbit.com/tesla.com'
  };
  return logos[symbol] || 'https://dummyimage.com/40x40/ddd/000.png&text=?';
};

// Chart.js setup
onMounted(() => {
  if (!portfolio.value?.holdings?.length) return;
  const ctx = document.getElementById('holdingsChart') as HTMLCanvasElement;
  if (!ctx) return;
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: portfolio.value.holdings.map((h: any) => h.symbol),
      datasets: [
        {
          data: portfolio.value.holdings.map((h: any) => h.quantity * h.avgPrice),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
});
</script>

<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}
</style>
