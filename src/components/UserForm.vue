<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 id="client-form" class="text-2xl font-semibold text-slate-900">
        {{ isEdit ? 'Edit Client' : 'New Client' }}
      </h1>
    </div>

    <Card>
      <!-- use a native form but driven by vee-validate composition -->
      <form @submit.prevent="onSubmit" novalidate class="space-y-5" aria-labelledby="client-form">
        <!-- Name -->
        <FormField name="name" v-slot="{ componentField }">
          <FormItem>
            <FormLabel for="name">Full name</FormLabel>
            <FormControl>
              <input
                v-bind="componentField"
                id="name"
                type="text"
                aria-required="true"
                aria-invalid="false"
                placeholder="e.g. Asha Patel"
                class="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </FormControl>
            <FormDescription>Enter the client's full name (required).</FormDescription>
            <FormMessage class="text-sm text-red-600" />
          </FormItem>
        </FormField>

        <!-- Email -->
        <FormField name="email" v-slot="{ componentField }">
          <FormItem>
            <FormLabel for="email">Email</FormLabel>
            <FormControl>
              <input
                v-bind="componentField"
                id="email"
                type="email"
                aria-required="true"
                placeholder="ashapatel@example.com"
                class="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </FormControl>
            <FormDescription>We'll use this to send notifications and statements.</FormDescription>
            <FormMessage class="text-sm text-red-600" />
          </FormItem>
        </FormField>

        <!-- Phone -->
        <FormField name="phone" v-slot="{ componentField }">
          <FormItem>
            <FormLabel for="phone">Phone</FormLabel>
            <FormControl>
              <input
                v-bind="componentField"
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                inputmode="tel"
                class="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </FormControl>
            <FormDescription>Optional — helpful for quick contact.</FormDescription>
            <FormMessage class="text-sm text-red-600" />
          </FormItem>
        </FormField>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            aria-live="polite"
          >
            <span v-if="isSubmitting" aria-hidden="true">Saving…</span>
            <span v-else>{{ isEdit ? 'Update Client' : 'Create Client' }}</span>
          </button>

          <router-link to="/users" class="inline-flex items-center px-4 py-2 rounded-2xl border text-slate-700 bg-white">
            Cancel
          </router-link>
        </div>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
/**
 * UserForm.vue
 * - Uses vee-validate + zod for typed validation
 * - Works in create and edit modes
 *
 * Ensure these exist:
 * - Card at '@/components/ui/Card.vue'
 * - shadcn form primitives at '@/components/ui/form'
 *
 * Install libs:
 * npm i vee-validate zod @vee-validate/zod
 */

import { onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

// UI primitives
import Card from '../components/ui/Card.vue';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '../components/ui/form/';

// zod schema
const userSchema = toTypedSchema(
  z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    phone: z
      .string()
      .regex(/^[+\d()\-\s]*$/, 'Invalid phone number')
      .or(z.literal(''))
      .transform((val) => (val === '' ? undefined : val))
  })
);

// type UserFormValues = z.output<typeof userSchema>;

// vee-validate setup
const { handleSubmit, setValues, isSubmitting } = useForm({
  validationSchema: userSchema,
  initialValues: { name: '', email: '', phone: undefined }
});

const store = useStore();
const route = useRoute();
const router = useRouter();

const id = route.params.id as string | undefined;
const isEdit = computed(() => !!id);

onMounted(() => {
  if (isEdit.value && id) {
    const user = store.getters.getUserById(id);
    if (!user) {
      router.push('/users');
      return;
    }
    setValues({
      name: user.name,
      email: user.email,
      phone: user.phone ?? undefined
    });
  }
});

// submit handler
const onSubmit = handleSubmit(async (values) => {
  if (isEdit.value && id) {
    store.commit('updateUser', { id, ...values });
  } else {
    await store.dispatch('createUser', { name: values.name, email: values.email, phone: values.phone });
  }
  router.push('/users');
});
</script>
