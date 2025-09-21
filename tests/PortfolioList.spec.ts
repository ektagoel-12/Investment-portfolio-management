import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import PortfolioList from '../src/components/PortfolioList.vue';
import { describe, it, expect } from "vitest";

const portfolios = [
  { id: '1', name: 'Portfolio A', status: 'ACTIVE', initialInvestment: 1000, createdAt: '2025-01-01', clientId: 'u1' },
  { id: '2', name: 'Portfolio B', status: 'CLOSED', initialInvestment: 2000, createdAt: '2025-02-01', clientId: 'u2' }
];

const users = [
  { id: 'u1', name: 'Alice' },
  { id: 'u2', name: 'Bob' }
];

const mockStore = createStore({
  state: { portfolios, users },
  mutations: {
    deletePortfolio(state, id: string) {
      state.portfolios = state.portfolios.filter((p: any) => p.id !== id);
    }
  }
});

describe('PortfolioList.vue', () => {
  it('renders a list of portfolios', () => {
    const wrapper = mount(PortfolioList, { global: { plugins: [mockStore] } });
    expect(wrapper.text()).toContain('Portfolio A');
    expect(wrapper.text()).toContain('Portfolio B');
  });

  it('filters by ACTIVE status', async () => {
    const wrapper = mount(PortfolioList, { global: { plugins: [mockStore] } });
    const select = wrapper.find('select');
    await select.setValue('ACTIVE');
    expect(wrapper.text()).toContain('Portfolio A');
    expect(wrapper.text()).not.toContain('Portfolio B');
  });
});
