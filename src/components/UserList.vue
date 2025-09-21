<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Clients</h1>
      <router-link to="/users/new"><BaseButton>New Client</BaseButton></router-link>
    </div>

    <Card>
      <table class="w-full">
        <thead>
          <tr class="text-left border-b">
            <th class="py-3">Name</th>
            <th class="py-3">Email</th>
            <th class="py-3">Phone</th>
            <th class="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id" class="odd:bg-white even:bg-blue-50">
            <td class="py-3">{{ u.name }}</td>
            <td class="py-3">{{ u.email }}</td>
            <td class="py-3">{{ u.phone || '—' }}</td>
            <td class="py-3">
              <router-link :to="`/users/${u.id}/edit`" class="text-blue-600 mr-3">Edit</router-link>
              <button @click="remove(u.id)" class="text-red-600">Delete</button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="4" class="py-6 text-center text-slate-500">No clients yet.</td>
          </tr>
        </tbody>
      </table>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import {Card} from '../components/ui/card/index';
// import Button from '../components/ui/button';

const store = useStore();
const users = computed(() => (store.state.users || []));

const remove = (id: string) => {
  if (!confirm('Delete this client?')) return;
  store.commit('deleteUser', id);
};
</script>
