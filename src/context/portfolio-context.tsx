'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Portfolio, Holding } from '@/lib/types';
import { initialPortfolio, stocks as allStocks } from '@/lib/data';

interface PortfolioContextType {
  portfolio: Portfolio;
  buyStock: (ticker: string, quantity: number, price: number) => void;
  sellStock: (ticker: string, quantity: number, price: number) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const updateHoldingsCurrentPrice = (holdings: Holding[]): Holding[] => {
    return holdings.map(holding => {
        const stock = allStocks.find(s => s.ticker === holding.ticker);
        return {
            ...holding,
            currentPrice: stock ? stock.price : holding.avgPrice
        };
    });
};


export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const [portfolio, setPortfolio] = useState<Portfolio>(() => {
    const holdingsWithCurrentPrice = updateHoldingsCurrentPrice(initialPortfolio.holdings);
    const totalValue = holdingsWithCurrentPrice.reduce((acc, h) => acc + (h.quantity * h.currentPrice), 0);
    const totalInvestment = holdingsWithCurrentPrice.reduce((acc, h) => acc + (h.quantity * h.avgPrice), 0);
    const totalPandL = totalValue - totalInvestment;
    const totalPandLPercent = totalInvestment > 0 ? (totalPandL / totalInvestment) * 100 : 0;

    return {
        ...initialPortfolio,
        holdings: holdingsWithCurrentPrice,
        totalValue,
        totalInvestment,
        totalPandL,
        totalPandLPercent
    };
  });

  const recalculatePortfolio = (holdings: Holding[], cash: number): Portfolio => {
    const holdingsWithCurrentPrice = updateHoldingsCurrentPrice(holdings);
    const totalInvestment = holdingsWithCurrentPrice.reduce((acc, h) => acc + (h.quantity * h.avgPrice), 0);
    const totalValue = holdingsWithCurrentPrice.reduce((acc, h) => acc + (h.quantity * h.currentPrice), 0);
    const totalPandL = totalValue - totalInvestment;
    const totalPandLPercent = totalInvestment > 0 ? (totalPandL / totalInvestment) * 100 : 0;
    
    // This is a simplified history update. A real app would fetch historical data.
    const newHistory = [...portfolio.history];
    const lastEntry = newHistory[newHistory.length - 1];
    if (lastEntry) {
        newHistory[newHistory.length - 1] = { ...lastEntry, value: totalValue };
    }

    return {
      totalValue,
      totalInvestment,
      totalPandL,
      totalPandLPercent,
      cash,
      holdings: holdingsWithCurrentPrice,
      history: newHistory
    };
  };

  const buyStock = (ticker: string, quantity: number, price: number) => {
    const cost = quantity * price;
    if (portfolio.cash < cost) {
      throw new Error("Not enough cash to complete this transaction.");
    }

    const newCash = portfolio.cash - cost;
    const existingHolding = portfolio.holdings.find(h => h.ticker === ticker);
    let newHoldings;

    if (existingHolding) {
      newHoldings = portfolio.holdings.map(h => {
        if (h.ticker === ticker) {
          const totalQuantity = h.quantity + quantity;
          const totalCost = (h.avgPrice * h.quantity) + cost;
          const newAvgPrice = totalCost / totalQuantity;
          return { ...h, quantity: totalQuantity, avgPrice: newAvgPrice };
        }
        return h;
      });
    } else {
      const stock = allStocks.find(s => s.ticker === ticker);
      if (!stock) throw new Error("Stock not found");
      const newHolding: Holding = {
        ticker: stock.ticker,
        name: stock.name,
        logoUrl: stock.logoUrl,
        quantity: quantity,
        avgPrice: price,
        currentPrice: price,
      };
      newHoldings = [...portfolio.holdings, newHolding];
    }
    
    setPortfolio(recalculatePortfolio(newHoldings, newCash));
  };

  const sellStock = (ticker: string, quantity: number, price: number) => {
    const existingHolding = portfolio.holdings.find(h => h.ticker === ticker);

    if (!existingHolding || existingHolding.quantity < quantity) {
      throw new Error("You do not own enough shares to sell.");
    }

    const proceeds = quantity * price;
    const newCash = portfolio.cash + proceeds;
    
    let newHoldings = portfolio.holdings.map(h => {
      if (h.ticker === ticker) {
        return { ...h, quantity: h.quantity - quantity };
      }
      return h;
    }).filter(h => h.quantity > 0);

    setPortfolio(recalculatePortfolio(newHoldings, newCash));
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, buyStock, sellStock }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
