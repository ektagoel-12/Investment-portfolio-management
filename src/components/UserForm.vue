<template>
  <div class="max-w-2xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col items-start mb-8">
      <h1
        id="client-form"
        class="text-3xl font-bold text-slate-900 tracking-tight"
      >
        {{ isEdit ? '✏️ Edit Client' : '➕ Add New Client' }}
      </h1>
      <p class="text-slate-500 text-sm mt-1">
        Fill in the details below to manage your client’s information.
      </p>
    </div>

    <!-- Form Card -->
    <Card
      class="p-8 rounded-xl shadow-lg bg-gradient-to-br from-white via-blue-50 to-blue-100"
    >
      <form
        @submit.prevent="onSubmit"
        novalidate
        class="space-y-6"
        aria-labelledby="client-form"
      >
        <!-- Name -->
        <FormField name="name" v-slot="{ componentField }">
          <FormItem>
            <FormLabel for="name">Full Name</FormLabel>
            <FormControl>
              <input
                v-bind="componentField"
                id="name"
                type="text"
                placeholder="e.g. Asha Patel"
                class="w-full p-3 rounded-md border transition-all 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 
                       hover:border-blue-400"
              />
            </FormControl>
            <FormDescription>
              Enter the client’s full name (required).
            </FormDescription>
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
                placeholder="ashapatel@example.com"
                class="w-full p-3 rounded-md border transition-all 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 
                       hover:border-blue-400"
              />
            </FormControl>
            <FormDescription>
              We’ll use this to send notifications and statements.
            </FormDescription>
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
                class="w-full p-3 rounded-md border transition-all 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 
                       hover:border-blue-400"
              />
            </FormControl>
            <FormDescription>Optional — helpful for quick contact.</FormDescription>
            <FormMessage class="text-sm text-red-600" />
          </FormItem>
        </FormField>

        <!-- Actions -->
        <div class="flex items-center gap-4 pt-2">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-3 rounded-md font-semibold text-white 
                   bg-blue-600 hover:bg-blue-700 focus:ring-2 
                   focus:ring-blue-500 cursor-pointer transition-all"
            aria-live="polite"
          >
            <span v-if="isSubmitting" aria-hidden="true">Saving…</span>
            <span v-else>{{ isEdit ? 'Update Client' : 'Create Client' }}</span>
          </button>

          <router-link
            to="/users"
            class="px-6 py-3 rounded-md border font-medium 
                   text-slate-700 bg-white hover:bg-slate-100 
                   cursor-pointer transition-all"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

// UI components
import { Card } from '../components/ui/card/index';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '../components/ui/form/';

// Zod schema for validation
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

// vee-validate form
const { handleSubmit, setValues, isSubmitting } = useForm({
  validationSchema: userSchema,
  initialValues: { name: '', email: '', phone: undefined }
});

const store = useStore();
const route = useRoute();
const router = useRouter();

const id = route.params.id as string | undefined;
const isEdit = computed(() => !!id);

// Prefill values if editing
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

// Form submit handler
const onSubmit = handleSubmit(async (values) => {
  if (isEdit.value && id) {
    store.commit('updateUser', { id, ...values });
  } else {
    await store.dispatch('createUser', values);
  }
  router.push('/users');
});
</script>
