<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Clients</h1>
        <p class="text-slate-500 text-sm mt-1">
          Manage your clients and their basic information here.
        </p>
      </div>
      <router-link to="/users/new">
        <button
          class="px-5 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md transition-all"
        >
          + New Client
        </button>
      </router-link>
    </div>

    <!-- Clients Table -->
    <Card>
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-left border-b bg-slate-50">
            <th class="py-4 px-6">Name</th>
            <th class="py-4 px-6">Email</th>
            <th class="py-4 px-6">Phone</th>
            <th class="py-4 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="u in users"
            :key="u.id"
            class="odd:bg-white even:bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <td class="py-4 px-6 font-semibold text-slate-900">{{ u.name }}</td>
            <td class="py-4 px-6">{{ u.email }}</td>
            <td class="py-4 px-6">{{ u.phone || '—' }}</td>
            <td class="py-4 px-6 flex space-x-3">
              <router-link :to="`/users/${u.id}/edit`">
                <button
                  class="px-3 py-1 text-sm font-medium rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                >
                  Edit
                </button>
              </router-link>
              <button
                @click="remove(u.id)"
                class="px-3 py-1 text-sm font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="users.length === 0">
            <td colspan="4" class="py-8 text-center text-slate-500">
              No clients yet.
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Card } from '../components/ui/card/index';

const store = useStore();
const users = computed(() => (store.state.users || []));

const remove = (id: string) => {
  if (!confirm('Delete this client?')) return;
  store.commit('deleteUser', id);
};
</script>
