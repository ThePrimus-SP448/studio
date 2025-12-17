import type { User, Stock, Portfolio, Holding } from './types';
import { PlaceHolderImages } from './placeholder-images';

// This is now just placeholder data for non-logged in states or initial structure
export const user: User = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar')?.imageUrl || '',
};

const generateStockHistory = (basePrice: number) => {
  const history: { date: string, price: number }[] = [];
  let price = basePrice;
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    price += (Math.random() - 0.5) * (basePrice * 0.05); // Fluctuate by up to 5%
    price = Math.max(price, 10); // Ensure price doesn't go too low
    history.push({ date: date.toISOString().split('T')[0], price: parseFloat(price.toFixed(2)) });
  }
  return history;
};

const stocksData: Omit<Stock, 'history'>[] = [
    { ticker: 'RELIANCE', name: 'Reliance Industries', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-reliance')?.imageUrl || '', price: 2850.55, change: 45.20, changePercent: 1.61, marketCap: '19.3T', volume: '8.5M' },
    { ticker: 'TCS', name: 'Tata Consultancy', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-tcs')?.imageUrl || '', price: 3855.30, change: -20.10, changePercent: -0.52, marketCap: '14.0T', volume: '2.1M' },
    { ticker: 'HDFCBANK', name: 'HDFC Bank', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-hdfc')?.imageUrl || '', price: 1680.75, change: 12.45, changePercent: 0.75, marketCap: '12.8T', volume: '15.2M' },
    { ticker: 'INFY', name: 'Infosys', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-infosys')?.imageUrl || '', price: 1530.90, change: -5.80, changePercent: -0.38, marketCap: '6.4T', volume: '7.8M' },
    { ticker: 'ICICIBANK', name: 'ICICI Bank', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-icici')?.imageUrl || '', price: 1125.00, change: 22.15, changePercent: 2.01, marketCap: '7.9T', volume: '20.5M' },
    { ticker: 'BHARTIARTL', name: 'Bharti Airtel', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-airtel')?.imageUrl || '', price: 1385.60, change: -10.25, changePercent: -0.73, marketCap: '7.8T', volume: '6.4M' },
];

export const stocks: Stock[] = stocksData.map(stock => ({
  ...stock,
  history: generateStockHistory(stock.price),
}));

export const initialPortfolio: Portfolio = {
  totalValue: 0,
  totalInvestment: 0,
  totalPandL: 0,
  totalPandLPercent: 0,
  cash: 100000,
  holdings: [],
  history: [],
};


export const marketSummary = {
  market: 'NIFTY 50',
  value: '23,557.90',
  change: '+92.30 (0.39%)',
  isUp: true,
  history: generateStockHistory(23500),
}
