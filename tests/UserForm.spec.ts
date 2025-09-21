// tests/UserForm.spec.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import UserForm from '../src/components/UserForm.vue';
import { createStore } from 'vuex';
import { createRouter, createMemoryHistory } from 'vue-router';

function makeStore() {
  return createStore({
    getters: { getUserById: () => () => null },
    state: { users: [] },
    actions: { createUser: vi.fn() },
    mutations: { updateUser: vi.fn() },
  });
}

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/users', component: { template: '<div>Users</div>' } }],
});

describe('UserForm.vue', () => {
  it('renders form fields', () => {
    const store = makeStore();
    const wrapper = mount(UserForm, { global: { plugins: [store, router] } });

    expect(wrapper.find('input#name').exists()).toBe(true);
    expect(wrapper.find('input#email').exists()).toBe(true);
    expect(wrapper.find('input#phone').exists()).toBe(true);
  });

  it('submits new user', async () => {
    const store = makeStore();
    router.push('/users/new');
    await router.isReady();

    const wrapper = mount(UserForm, { global: { plugins: [store, router] } });

    await wrapper.find('#name').setValue('Alice');
    await wrapper.find('#email').setValue('alice@example.com');
    await wrapper.find('form').trigger('submit.prevent');

    expect(store._actions.createUser).toHaveLength(1);
  });
});
