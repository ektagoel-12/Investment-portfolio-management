import { createStore } from 'vuex';
import mockData from '../data/mock-data.json';
import { v4 as uuidv4 } from 'uuid';
import type { User, Portfolio, PortfolioStatus } from '../types';

export interface RootState {
  users: User[];
  portfolios: Portfolio[];
}

// helper to coerce status
function toStatus(status: string): PortfolioStatus {
  if (status === 'ACTIVE' || status === 'UPCOMING' || status === 'CLOSED') {
    return status;
  }
  return 'UPCOMING';
}

const store = createStore({
  state: (): RootState => ({
    users: mockData.users as User[],

    portfolios: (mockData.portfolios as any[]).map((p) => ({
      ...p,
      id: p.id ?? uuidv4(),
      status: toStatus(p.status),
      createdAt: p.createdAt ?? new Date().toISOString(),
      holdings: p.holdings ?? [],
      notes: p.notes ?? '',
      initialInvestment: p.initialInvestment ?? 0,
      startDate: p.startDate ?? ''
    }))
  }),

  mutations: {
    addUser(state: RootState, user: User) {
      state.users.push(user);
    },
    updateUser(state: RootState, user: User) {
      const idx = state.users.findIndex((u: User) => u.id === user.id);
      if (idx !== -1) state.users.splice(idx, 1, user);
    },
    deleteUser(state: RootState, id: string) {
      state.users = state.users.filter((u: User) => u.id !== id);
    },

    addPortfolio(state: RootState, portfolio: Portfolio) {
      state.portfolios.push(portfolio);
    },
    updatePortfolio(state: RootState, portfolio: Portfolio) {
      const idx = state.portfolios.findIndex((p: Portfolio) => p.id === portfolio.id);
      if (idx !== -1) state.portfolios.splice(idx, 1, portfolio);
    },
    deletePortfolio(state: RootState, id: string) {
      state.portfolios = state.portfolios.filter((p: Portfolio) => p.id !== id);
    }
  },

  actions: {
    createUser({ commit }: { commit: Function }, payload: Omit<User, 'id'>) {
      const user: User = { ...payload, id: uuidv4() };
      commit('addUser', user);
      return user;
    },
    createPortfolio({ commit }: { commit: Function }, payload: Omit<Portfolio, 'id' | 'createdAt'>) {
      const portfolio: Portfolio = {
        ...payload,
        id: uuidv4(),
        status: payload.status as PortfolioStatus,
        createdAt: new Date().toISOString(),
        holdings: payload.holdings ?? [],
        initialInvestment: payload.initialInvestment ?? 0,
        startDate: payload.startDate ?? '',
        notes: payload.notes ?? ''
      };
      commit('addPortfolio', portfolio);
      return portfolio;
    }
  },

  getters: {
    getUserById: (state: RootState) => (id: string) =>
      state.users.find((u: User) => u.id === id),

    getPortfolioById: (state: RootState) => (id: string) =>
      state.portfolios.find((p: Portfolio) => p.id === id),

    portfoliosByStatus: (state: RootState) => (status: PortfolioStatus) =>
      state.portfolios.filter((p: Portfolio) => p.status === status)
  }
});

export type StoreType = ReturnType<typeof createStore>;
export default store;
