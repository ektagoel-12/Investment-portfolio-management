import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import type { User, Portfolio } from '../types';
import { loadUsers, saveUsers, loadPortfolios, savePortfolios } from '../services/storage';

export interface RootState {
  users: User[];
  portfolios: Portfolio[];
}

const store = createStore({
  state: {
    users: loadUsers().length ? loadUsers() : [
      { id: uuidv4(), name: 'Asha Patel', email: 'asha@example.com', phone: '9876543210' },
      { id: uuidv4(), name: 'Rajat Verma', email: 'rajat@example.com' }
    ],
    portfolios: (loadPortfolios().length ? loadPortfolios() : []).map(p => ({
      ...p,
      createdAt: p.createdAt ?? new Date().toISOString(),
      holdings: p.holdings ?? [],
      notes: p.notes ?? '',
      initialInvestment: p.initialInvestment ?? 0,
      startDate: p.startDate ?? ''
    }))

  },
  mutations: {
    addUser(state: RootState, user: User) {
      state.users.push(user);
      saveUsers(state.users);
    },
    updateUser(state: RootState, user: User) {
      const i = state.users.findIndex(u => u.id === user.id);
      if (i !== -1) state.users.splice(i, 1, user);
      saveUsers(state.users);
    },
    deleteUser(state: RootState, id: string) {
      state.users = state.users.filter(u => u.id !== id);
      saveUsers(state.users);
    },
    addPortfolio(state: RootState, p: Portfolio) {
      state.portfolios.push(p);
      savePortfolios(state.portfolios);
    },
    updatePortfolio(state: RootState, p: Portfolio) {
      const i = state.portfolios.findIndex(x => x.id === p.id);
      if (i !== -1) state.portfolios.splice(i, 1, p);
      savePortfolios(state.portfolios);
    },
    deletePortfolio(state: RootState, id: string) {
      state.portfolios = state.portfolios.filter(x => x.id !== id);
      savePortfolios(state.portfolios);
    }
  },
  actions: {
    createUser({ commit }:any, payload: Omit<User, 'id'>) {
      const user: User = { ...payload, id: uuidv4() };
      commit('addUser', user);
      return user;
    },
    createPortfolio({ commit }:any, payload: Omit<Portfolio, 'id' | 'createdAt'>) {
    const p: Portfolio = {
        ...payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        holdings: payload.holdings ?? [],
        initialInvestment: payload.initialInvestment ?? 0,
        startDate: payload.startDate ?? '',
        notes: payload.notes ?? ''
      };      
      commit('addPortfolio', p);
      return p;
    }
  },
  getters: {
    getUserById: (state: RootState) => (id: string) => state.users.find(u => u.id === id),
    getPortfolioById: (state: RootState) => (id: string) => state.portfolios.find(p => p.id === id),
    portfoliosByStatus: (state: RootState) => (status: string) => state.portfolios.filter(p => p.status === status)
  }
});

export default store;
