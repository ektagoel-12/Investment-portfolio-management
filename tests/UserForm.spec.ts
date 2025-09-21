import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import UserForm from "../src/components/UserForm.vue";
import { describe, it, expect, vi, beforeEach } from "vitest";

const createMockStore = () =>
  createStore({
    state: {
      users: [
        { id: "u1", name: "Alice", email: "alice@test.com", phone: "1234567890" }
      ]
    },
    getters: {
      getUserById: (state) => (id: string) =>
        state.users.find((u) => u.id === id)
    },
    actions: {
      createUser: vi.fn()
    },
    mutations: {
      updateUser: vi.fn()
    }
  });

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/users/:id?", component: UserForm }]
});

beforeEach(async () => {
  router.push("/");
  await router.isReady();
});

describe("UserForm.vue", () => {
  it("renders new client form and submits", async () => {
    const store = createMockStore();
    await router.push("/users"); // no id → create mode
    await router.isReady();

    const wrapper = mount(UserForm, {
      global: { plugins: [store, router] }
    });

    // Fill in form
    await wrapper.find("input#name").setValue("Bob");
    await wrapper.find("input#email").setValue("bob@test.com");
    await wrapper.find("input#phone").setValue("+91 98765 43210");

    await wrapper.find("form").trigger("submit.prevent");

    expect(store.dispatch).toHaveBeenCalledWith("createUser", {
      name: "Bob",
      email: "bob@test.com",
      phone: "+91 98765 43210"
    });
  });

  it("prefills values in edit mode and updates user", async () => {
    const store = createMockStore();
    await router.push("/users/u1"); // edit mode
    await router.isReady();

    const wrapper = mount(UserForm, {
      global: { plugins: [store, router] }
    });

    const nameInput = wrapper.find("input#name");
    expect((nameInput.element as HTMLInputElement).value).toBe("Alice");

    // Change name
    await nameInput.setValue("Alice Updated");
    await wrapper.find("form").trigger("submit.prevent");

    expect(store.commit).toHaveBeenCalledWith("updateUser", {
      id: "u1",
      name: "Alice Updated",
      email: "alice@test.com",
      phone: "1234567890"
    });
  });
});
