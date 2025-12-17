'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Stock } from '@/lib/types';
import { usePortfolio } from '@/context/portfolio-context';
import { useToast } from '@/hooks/use-toast';

interface TradeDialogProps {
  stock: Stock;
  action: 'buy' | 'sell';
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};


export function TradeDialog({ stock, action }: TradeDialogProps) {
  const { buyStock, sellStock, portfolio } = usePortfolio();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const holding = portfolio.holdings.find(h => h.ticker === stock.ticker);
  const currentPrice = stock.price || (holding ? holding.currentPrice : 0);
  const totalCost = quantity * currentPrice;
  const maxSellQuantity = holding ? holding.quantity : 0;
  
  const handleTrade = () => {
    try {
        if (action === 'buy') {
            buyStock(stock.ticker, quantity, currentPrice);
            toast({
                title: "Trade Successful!",
                description: `You bought ${quantity} share(s) of ${stock.ticker}.`,
            });
        } else {
            sellStock(stock.ticker, quantity, currentPrice);
             toast({
                title: "Trade Successful!",
                description: `You sold ${quantity} share(s) of ${stock.ticker}.`,
            });
        }
        setOpen(false);
        setQuantity(1);
    } catch (error) {
        if (error instanceof Error) {
            toast({
                variant: "destructive",
                title: "Trade Failed",
                description: error.message,
            });
        }
    }
  };

  const getButton = () => {
    if (action === 'buy') {
      return <Button size="sm" onClick={() => setOpen(true)}>Buy</Button>;
    }
    return <Button variant="outline" size="sm" onClick={() => setOpen(true)} disabled={maxSellQuantity === 0}>Sell</Button>;
  }

  const validateQuantity = (currentQuantity: number) => {
    if (currentQuantity <= 0) return false;
    if (action === 'sell') {
        return currentQuantity <= maxSellQuantity;
    }
    // For buy action
    return totalCost <= portfolio.cash;
  }

  const isTradeDisabled = !validateQuantity(quantity);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {getButton()}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {action === 'buy' ? 'Buy' : 'Sell'} {stock.name} ({stock.ticker})
          </DialogTitle>
          <DialogDescription>
            Current Price: {formatCurrency(currentPrice)}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="col-span-3"
              min="1"
            />
          </div>
           {action === 'sell' && (
             <p className="text-sm text-muted-foreground text-right col-span-4">You own: {maxSellQuantity} shares</p>
           )}
           {action === 'buy' && (
             <p className="text-sm text-muted-foreground text-right col-span-4">Cash available: {formatCurrency(portfolio.cash)}</p>
           )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Total</Label>
            <div className="col-span-3 font-bold text-lg">{formatCurrency(totalCost)}</div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleTrade} disabled={isTradeDisabled}>
            Confirm {action === 'buy' ? 'Buy' : 'Sell'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
