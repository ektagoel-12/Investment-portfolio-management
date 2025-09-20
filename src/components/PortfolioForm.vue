<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">{{ isEdit ? 'Edit Portfolio' : 'New Portfolio' }}</h1>
    </div>

    <Card>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Name</label>
          <input v-model="form.name" required class="w-full p-3 rounded-md border" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Client</label>
          <select v-model="form.clientId" required class="w-full p-3 rounded-md border bg-white">
            <option value="">Select client</option>
            <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Status</label>
          <select v-model="form.status" class="w-full p-3 rounded-md border bg-white">
            <option value="UPCOMING">UPCOMING</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>

        <div class="flex gap-3">
          <button type="submit"><BaseButton>{{ isEdit ? 'Update' : 'Create' }}</BaseButton></button>
          <router-link to="/portfolios"><BaseButton variant="white">Cancel</BaseButton></router-link>
        </div>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Card from '../components/ui/Card.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import type { Portfolio } from '../types';

const route = useRoute();
const router = useRouter();
const store = useStore();

const id = route.params.id as string | undefined;
const isEdit = computed(() => !!id);

const users = computed(() => store.state.users || []);

const form = reactive({
  id: '',
  name: '',
  clientId: '',
  status: 'UPCOMING',
  holdings: [] as any[]
});

onMounted(() => {
  if (isEdit.value && id) {
    const p = store.getters.getPortfolioById(id);
    if (p) Object.assign(form, p);
    else router.push('/portfolios');
  }
});

const onSubmit = () => {
  if (isEdit.value) {
    store.commit('updatePortfolio', { ...form } as Portfolio);
  } else {
    store.dispatch('createPortfolio', { name: form.name, clientId: form.clientId, status: form.status, holdings: form.holdings });
  }
  router.push('/portfolios');
};
</script>
