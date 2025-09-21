// tests/PortfolioList.spec.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import PortfolioList from '../src/components/PortfolioList.vue';
import { createStore } from 'vuex';

const mockPortfolios = [
  { id: '1', name: 'Tech Fund', status: 'ACTIVE', clientId: 'c1' },
  { id: '2', name: 'Retirement', status: 'CLOSED', clientId: 'c2' },
];
const mockUsers = [{ id: 'c1', name: 'Alice' }, { id: 'c2', name: 'Bob' }];

function makeStore() {
  return createStore({
    state: { portfolios: mockPortfolios, users: mockUsers },
    mutations: { deletePortfolio: vi.fn() },
  });
}

describe('PortfolioList.vue', () => {
  it('renders portfolio names and clients', () => {
    const store = makeStore();
    const wrapper = mount(PortfolioList, { global: { plugins: [store] } });

    expect(wrapper.text()).toContain('Tech Fund');
    expect(wrapper.text()).toContain('Retirement');
    expect(wrapper.text()).toContain('Client: Alice');
  });

  it('filters portfolios by status', async () => {
    const store = makeStore();
    const wrapper = mount(PortfolioList, { global: { plugins: [store] } });

    await wrapper.find('select').setValue('ACTIVE');
    expect(wrapper.text()).toContain('Tech Fund');
    expect(wrapper.text()).not.toContain('Retirement');
  });
});
