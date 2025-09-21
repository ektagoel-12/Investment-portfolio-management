<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-semibold mb-6">
      {{ isEdit ? "Edit Portfolio" : "New Portfolio" }}
    </h1>

    <Card>
      <form @submit="onSubmit" class="space-y-6">
        <!-- Portfolio Name -->
        <FormField name="name" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Portfolio Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="My Portfolio"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Status -->
        <FormField name="status" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Status</FormLabel>
            <FormControl>
              <select
                v-bind="componentField"
                class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="ACTIVE">Active</option>
                <option value="CLOSED">Closed</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Client -->
        <FormField name="clientId" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Client</FormLabel>
            <FormControl>
              <select
                v-bind="componentField"
                class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select client</option>
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
            <FormLabel>Initial Investment (₹)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="10000"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Start Date -->
        <FormField name="startDate" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Start Date</FormLabel>
            <FormControl>
              <Input type="date" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Notes -->
        <FormField name="notes" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                rows="3"
                placeholder="Additional details about this portfolio..."
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Actions -->
        <div class="flex gap-3">
          <Button type="submit" :disabled="isSubmitting">
            {{ isEdit ? "Update Portfolio" : "Create Portfolio" }}
          </Button>
          <router-link to="/portfolios">
            <Button variant="outline">Cancel</Button>
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
    initialInvestment: z.string().regex(/^\d+(\.\d+)?$/, "Enter a valid number"),
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
    initialInvestment: "",
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
        initialInvestment: String(portfolio.initialInvestment ?? 0),
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
