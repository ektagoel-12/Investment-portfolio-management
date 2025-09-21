<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8 text-center md:text-left">
      <h1 class="text-3xl font-bold text-slate-900">
        {{ isEdit ? "Edit Portfolio" : "New Portfolio" }}
      </h1>
      <p class="text-slate-500 mt-1">
        Fill in the details below to create and manage a portfolio.
      </p>
    </div>

    <Card class="p-8 rounded-xl shadow-lg bg-white space-y-8">
      <form @submit="onSubmit" class="space-y-10">
        <!-- Portfolio Info -->
        <div>
          <h2 class="text-lg font-semibold text-slate-800 border-b pb-2 mb-6">
            Portfolio Info
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Portfolio Name -->
            <FormField name="name" v-slot="{ componentField }">
              <FormItem>
                <FormLabel for="name">Portfolio Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    type="text"
                    placeholder="e.g. Retirement Plan"
                    class="rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 border-slate-300"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- Status -->
            <FormField name="status" v-slot="{ componentField }">
              <FormItem>
                <FormLabel for="status">Status</FormLabel>
                <FormControl>
                  <select
                    id="status"
                    v-bind="componentField"
                    class="w-full p-3 rounded-lg shadow-sm border-slate-300 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="UPCOMING">📅 Upcoming</option>
                    <option value="ACTIVE">✅ Active</option>
                    <option value="CLOSED">🔒 Closed</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>

        <!-- Investment Details -->
        <div>
          <h2 class="text-lg font-semibold text-slate-800 border-b pb-2 mb-6">
            Investment Details
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Client -->
            <FormField name="clientId" v-slot="{ componentField }">
              <FormItem>
                <FormLabel for="clientId">Client</FormLabel>
                <FormControl>
                  <select
                    id="clientId"
                    v-bind="componentField"
                    class="w-full p-3 rounded-lg shadow-sm border-slate-300 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">👤 Select client</option>
                    <option v-for="u in users" :key="u.id" :value="u.id">
                      {{ u.name }} ({{ u.email }})
                    </option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- Initial Investment -->
            <FormField name="initialInvestment" v-slot="{ componentField }">
              <FormItem>
                <FormLabel for="investment">Initial Investment</FormLabel>
                <FormControl>
                  <div class="relative">
                    <span
                      class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    >
                      ₹
                    </span>
                    <Input
                      id="investment"
                      type="number"
                      step="0.01"
                      min="0"
                      class="pl-7 rounded-lg shadow-sm border-slate-300 focus:ring-2 focus:ring-blue-500"
                      v-bind="componentField"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- Start Date -->
            <FormField name="startDate" v-slot="{ componentField }">
              <FormItem>
                <FormLabel for="startDate">Start Date</FormLabel>
                <FormControl>
                  <Input
                    id="startDate"
                    type="date"
                    class="rounded-lg shadow-sm border-slate-300 focus:ring-2 focus:ring-blue-500"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>

        <!-- Notes -->
        <div>
          <h2 class="text-lg font-semibold text-slate-800 border-b pb-2 mb-6">
            Additional Notes
          </h2>
          <FormField name="notes" v-slot="{ componentField }">
            <FormItem>
              <FormLabel for="notes">Notes</FormLabel>
              <FormControl>
                <Textarea
                  id="notes"
                  rows="4"
                  placeholder="Add any additional details about this portfolio (e.g., goals, risk profile, strategy)..."
                  class="rounded-lg shadow-sm border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap gap-3 pt-4">
          <Button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            {{ isEdit ? "Update Portfolio" : "Create Portfolio" }}
          </Button>
          <router-link to="/portfolios">
            <Button
              variant="outline"
              class="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </Button>
          </router-link>
        </div>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Card } from "../components/ui/card/index";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

const store = useStore();
const router = useRouter();
const route = useRoute();

const users = computed(() => store.state.users);

const schema = toTypedSchema(
  z.object({
    name: z.string().min(3, "Name too short"),
    status: z.enum(["UPCOMING", "ACTIVE", "CLOSED"]),
    clientId: z.string().min(1, "Please select a client"),
    initialInvestment: z.number().min(0, "Enter a valid number"),
    startDate: z.string().nonempty("Start date is required"),
    notes: z.string().optional(),
  })
);

const { handleSubmit, setValues, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    status: "UPCOMING",
    clientId: "",
    initialInvestment: 0,
    startDate: "",
    notes: "",
  },
});

const id = route.params.id as string | undefined;
const isEdit = computed(() => !!id);

onMounted(() => {
  if (isEdit.value && id) {
    const portfolio = store.getters.getPortfolioById(id);
    if (portfolio) {
      setValues({
        name: String(portfolio.name ?? ""),
        status: portfolio.status,
        clientId: String(portfolio.clientId ?? ""),
        initialInvestment: Number(portfolio.initialInvestment ?? 0),
        startDate: portfolio.createdAt?.slice(0, 10) ?? "",
        notes: String(portfolio.notes ?? ""),
      });
    }
  }
});

const onSubmit = handleSubmit((values) => {
  if (isEdit.value && id) {
    store.commit("updatePortfolio", { id, ...values });
  } else {
    store.dispatch("createPortfolio", values);
  }
  router.push("/portfolios");
});
</script>
