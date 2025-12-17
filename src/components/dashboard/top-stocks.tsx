'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer
} from '@/components/ui/chart';
import { stocks } from '@/lib/data';
import { Stock } from '@/lib/types';
import { ArrowDown, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { Area, AreaChart } from 'recharts';
import { Button } from '@/components/ui/button';

const StockCard = ({ stock }: { stock: Stock }) => {
  const isUp = stock.changePercent >= 0;
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <Image
            src={stock.logoUrl}
            alt={`${stock.name} logo`}
            width={40}
            height={40}
            className="rounded-full"
            data-ai-hint="logo"
          />
          <div>
            <CardTitle className="text-lg">{stock.ticker}</CardTitle>
            <CardDescription className="w-24 truncate">{stock.name}</CardDescription>
          </div>
        </div>
        <div className="h-16 w-32">
        <ChartContainer
          config={{
            price: {
              label: 'Price',
              color: isUp ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))',
            },
          }}
          className="h-full w-full"
        >
          <AreaChart
            data={stock.history}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
             <defs>
              <linearGradient id={`fillPrice-${stock.ticker}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              dataKey="price"
              type="natural"
              fill={`url(#fillPrice-${stock.ticker})`}
              stroke="var(--color-price)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
        </div>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
          <div className={`flex items-center text-sm font-medium ${isUp ? 'text-green-500' : 'text-red-500'}`}>
            {isUp ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            {stock.changePercent.toFixed(2)}%
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Sell</Button>
          <Button size="sm">Buy</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export function TopStocks() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stocks.map((stock) => (
        <StockCard key={stock.ticker} stock={stock} />
      ))}
    </div>
  );
}
