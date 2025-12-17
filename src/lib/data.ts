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
    price += (Math.random() - 0.5) * 5;
    price = Math.max(price, 10); // Ensure price doesn't go too low
    history.push({ date: date.toISOString().split('T')[0], price: parseFloat(price.toFixed(2)) });
  }
  return history;
};

const stocksData: Omit<Stock, 'history'>[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-apple')?.imageUrl || '', price: 172.25, change: 2.50, changePercent: 1.47, marketCap: '2.8T', volume: '70M' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-google')?.imageUrl || '', price: 139.74, change: -1.10, changePercent: -0.78, marketCap: '1.7T', volume: '25M' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-microsoft')?.imageUrl || '', price: 370.95, change: 1.25, changePercent: 0.34, marketCap: '2.7T', volume: '30M' },
  { ticker: 'AMZN', name: 'Amazon.com, Inc.', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-amazon')?.imageUrl || '', price: 146.74, change: -2.30, changePercent: -1.54, marketCap: '1.5T', volume: '55M' },
  { ticker: 'TSLA', name: 'Tesla, Inc.', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-tesla')?.imageUrl || '', price: 234.30, change: 5.60, changePercent: 2.45, marketCap: '750B', volume: '120M' },
  { ticker: 'META', name: 'Meta Platforms, Inc.', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-meta')?.imageUrl || '', price: 325.48, change: -3.20, changePercent: -0.97, marketCap: '830B', volume: '40M' },
];

export const stocks: Stock[] = stocksData.map(stock => ({
  ...stock,
  history: generateStockHistory(stock.price),
}));

const holdingsData: Omit<Holding, 'currentPrice'>[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-apple')?.imageUrl || '', quantity: 25, avgPrice: 150.75 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-google')?.imageUrl || '', quantity: 15, avgPrice: 130.20 },
  { ticker: 'TSLA', name: 'Tesla, Inc.', logoUrl: PlaceHolderImages.find(p => p.id === 'logo-tesla')?.imageUrl || '', quantity: 30, avgPrice: 200.50 },
];

const holdings: Holding[] = holdingsData.map(h => ({
  ...h,
  currentPrice: stocks.find(s => s.ticker === h.ticker)?.price || h.avgPrice,
}));

const totalInvestment = holdings.reduce((acc, h) => acc + (h.quantity * h.avgPrice), 0);
const totalValue = holdings.reduce((acc, h) => acc + (h.quantity * h.currentPrice), 0);
const totalPandL = totalValue - totalInvestment;
const totalPandLPercent = (totalPandL / totalInvestment) * 100;

const generatePortfolioHistory = () => {
    const history: { date: string, value: number }[] = [];
    let value = totalInvestment;
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        value += (Math.random() - 0.48) * 500; // Simulate daily portfolio value change
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
  holdings,
  history: generatePortfolioHistory(),
};

export const marketSummary = {
  market: 'NASDAQ',
  value: '15,453.27',
  change: '+111.94 (0.73%)',
  isUp: true,
  history: generateStockHistory(15000),
}
