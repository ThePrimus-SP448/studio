export type Stock = {
  ticker: string;
  name: string;
  logoUrl: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  history: { date: string; price: number }[];
};

export type Holding = {
  ticker: string;
  name: string;
  logoUrl: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
};

export type Portfolio = {
  totalValue: number;
  totalInvestment: number;
  totalPandL: number;
  totalPandLPercent: number;
  holdings: Holding[];
  history: { date: string; value: number }[];
};

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
};
