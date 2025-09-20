<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">{{ isEdit ? 'Edit Client' : 'New Client' }}</h1>
    </div>

    <Card>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Name</label>
          <input v-model="form.name" required class="w-full p-3 rounded-md border" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="form.email" type="email" required class="w-full p-3 rounded-md border" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Phone</label>
          <input v-model="form.phone" class="w-full p-3 rounded-md border" />
        </div>

        <div class="flex gap-3">
          <button type="submit"><BaseButton>{{ isEdit ? 'Update' : 'Create' }}</BaseButton></button>
          <router-link to="/users"><BaseButton variant="white">Cancel</BaseButton></router-link>
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

const route = useRoute();
const router = useRouter();
const store = useStore();

const id = route.params.id as string | undefined;
const isEdit = computed(() => !!id);

const form = reactive({ id: '', name: '', email: '', phone: '' });

onMounted(() => {
  if (isEdit.value && id) {
    const u = store.getters.getUserById(id);
    if (u) Object.assign(form, u);
    else router.push('/users');
  }
});

const onSubmit = () => {
  if (isEdit.value) {
    store.commit('updateUser', { ...form });
  } else {
    store.dispatch('createUser', { name: form.name, email: form.email, phone: form.phone });
  }
  router.push('/users');
};
</script>
