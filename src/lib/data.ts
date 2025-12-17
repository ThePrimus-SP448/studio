import type { User, Stock, Portfolio, Holding } from './types';
import { PlaceHolderImages } from './placeholder-images';

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

const holdingsData: Omit<Holding, 'currentPrice'>[] = [
  { ticker: 'RELIANCE', name: 'Reliance Industries', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-reliance')?.imageUrl || '', quantity: 10, avgPrice: 2800.00 },
  { ticker: 'TCS', name: 'Tata Consultancy', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-tcs')?.imageUrl || '', quantity: 5, avgPrice: 3900.50 },
  { ticker: 'HDFCBANK', name: 'HDFC Bank', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-hdfc')?.imageUrl || '', quantity: 20, avgPrice: 1650.25 },
];

const holdings: Holding[] = holdingsData.map(h => ({
  ...h,
  currentPrice: stocks.find(s => s.ticker === h.ticker)?.price || h.avgPrice,
}));

const totalInvestment = holdings.reduce((acc, h) => acc + (h.quantity * h.avgPrice), 0);
const totalValue = holdings.reduce((acc, h) => acc + (h.quantity * h.currentPrice), 0);
const totalPandL = totalValue - totalInvestment;
const totalPandLPercent = totalInvestment > 0 ? (totalPandL / totalInvestment) * 100 : 0;
const cashBalance = 100000;

const generatePortfolioHistory = () => {
    const history: { date: string, value: number }[] = [];
    let value = totalInvestment;
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        value += (Math.random() - 0.48) * (totalInvestment * 0.01); // Simulate daily portfolio value change
        value = Math.max(value, totalInvestment * 0.8);
        history.push({ date: date.toISOString().split('T')[0], value: parseFloat(value.toFixed(2)) });
    }
    history[history.length -1].value = totalValue; // Ensure last value is current value
    return history;
}

export const portfolio: Portfolio = {
  totalValue,
  totalInvestment,
  totalPandL,
  totalPandLPercent,
  cash: cashBalance,
  holdings,
  history: generatePortfolioHistory(),
};

export const marketSummary = {
  market: 'NIFTY 50',
  value: '23,557.90',
  change: '+92.30 (0.39%)',
  isUp: true,
  history: generateStockHistory(23500),
}
