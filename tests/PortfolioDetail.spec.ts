// tests/PortfolioDetail.spec.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import PortfolioDetail from '../src/components/PortfolioDetail.vue';
import { createStore } from 'vuex';
import { createMemoryHistory, createRouter } from 'vue-router';

const portfolio = {
  id: '1',
  name: 'Tech Fund',
  status: 'ACTIVE',
  clientId: 'c1',
  createdAt: '2025-01-01T10:00:00Z',
  initialInvestment: 50000,
  holdings: [{ symbol: 'AAPL', quantity: 10, avgPrice: 150 }],
};
const users = [{ id: 'c1', name: 'Alice' }];

function makeStore() {
  return createStore({
    state: { portfolios: [portfolio], users },
    getters: { getPortfolioById: () => () => portfolio },
  });
}

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/portfolios/:id', component: PortfolioDetail }],
});

describe('PortfolioDetail.vue', () => {
  it('renders portfolio details', async () => {
    const store = makeStore();
    router.push('/portfolios/1');
    await router.isReady();

    const wrapper = mount(PortfolioDetail, { global: { plugins: [store, router] } });

    expect(wrapper.text()).toContain('Tech Fund');
    expect(wrapper.text()).toContain('ACTIVE');
    expect(wrapper.text()).toContain('Alice');
    expect(wrapper.text()).toContain('₹ 50,000');
  });

  it('shows holdings table', async () => {
    const store = makeStore();
    router.push('/portfolios/1');
    await router.isReady();

    const wrapper = mount(PortfolioDetail, { global: { plugins: [store, router] } });

    expect(wrapper.find('table').text()).toContain('AAPL');
    expect(wrapper.find('table').text()).toContain('10');
  });
});
