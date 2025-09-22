// tests/UserForm.spec.ts
import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { createStore } from "vuex";
import { createMemoryHistory, createRouter } from "vue-router";
import UserForm from "../src/components/UserForm.vue";

// Dummy router routes (each route has a component to satisfy RouteRecordRaw)
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/users", name: "Users", component: { template: "<div>Users</div>" } },
    { path: "/users/new", name: "NewUser", component: UserForm },
    { path: "/users/:id", name: "EditUser", component: UserForm },
  ],
});

describe("UserForm.vue", () => {
  it("renders new client form (create mode)", async () => {
    const store = createStore({
      getters: { getUserById: () => () => null },
      actions: { createUser: () => {} },
      mutations: { updateUser: () => {} },
    });

    await router.push("/users/new");
    await router.isReady();

    const wrapper = mount(UserForm, {
      global: { plugins: [store, router] },
    });

    await flushPromises();

    // Heading indicates create mode
    expect(wrapper.find("h1").text()).toContain("Add New Client");

    // Inputs exist
    expect(wrapper.find("input#name").exists()).toBe(true);
    expect(wrapper.find("input#email").exists()).toBe(true);
    expect(wrapper.find("input#phone").exists()).toBe(true);

    // Submit button shows Create Client
    const submit = wrapper.find('button[type="submit"]');
    expect(submit.exists()).toBe(true);
    expect(submit.text()).toContain("Create Client");
  });

  it("renders edit client UI (edit mode) and shows Update button", async () => {
    // Return a user to avoid component redirecting to /users
    const store = createStore({
      getters: {
        getUserById: () => (id: string) =>
          id === "1"
            ? { id: "1", name: "Test User", email: "test@example.com", phone: "+91 99999 88888" }
            : null,
      },
      actions: { createUser: () => {} },
      mutations: { updateUser: () => {} },
    });

    await router.push("/users/1");
    await router.isReady();

    const wrapper = mount(UserForm, {
      global: { plugins: [store, router] },
    });

    await flushPromises();

    // Heading indicates edit mode
    expect(wrapper.find("h1").text()).toContain("Edit Client");

    // Submit button shows Update Client
    const submit = wrapper.find('button[type="submit"]');
    expect(submit.exists()).toBe(true);
    expect(submit.text()).toContain("Update Client");

    // Cancel link (RouterLink is stubbed via your tests/setup.ts) is present
    const cancel = wrapper.find("a");
    expect(cancel.exists()).toBe(true);
    expect(cancel.text()).toContain("Cancel");
  });
});
