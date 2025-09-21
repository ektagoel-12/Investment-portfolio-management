// basic domain types
export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export type Holding = {
  symbol: string;
  quantity: number;
  avgPrice: number;
};

export type PortfolioStatus = 'UPCOMING' | 'ACTIVE' | 'CLOSED';

export type Portfolio = {
  id: string;
  name: string;
  clientId: string;
  status: PortfolioStatus;
  holdings: Holding[]; // list of holdings
  createdAt: string;
  notes?: string;
  initialInvestment: number;
  startDate: string;
  
};
