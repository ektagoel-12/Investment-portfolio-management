import type { User, Portfolio } from '../types';

const USERS_KEY = 'pm_users_v1';
const PORTFOLIOS_KEY = 'pm_portfolios_v1';

export const loadUsers = (): User[] => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loadPortfolios = (): Portfolio[] => {
  const raw = localStorage.getItem(PORTFOLIOS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
};

export const savePortfolios = (portfolios: Portfolio[]) => {
  localStorage.setItem(PORTFOLIOS_KEY, JSON.stringify(portfolios));
};
