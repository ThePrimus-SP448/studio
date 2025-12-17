'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { marketSummary } from '@/lib/data';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export function MarketOverview() {
  const chartData = marketSummary.history;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>{marketSummary.market} Overview</CardTitle>
                <CardDescription>
                Last 30 days performance
                </CardDescription>
            </div>
            <div className="text-right">
                <p className="text-2xl font-bold">{marketSummary.value}</p>
                <p className={marketSummary.isUp ? 'text-green-500' : 'text-red-500'}>{marketSummary.change}</p>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: 'Price',
              color: 'hsl(var(--accent))',
            },
          }}
          className="h-64 w-full"
        >
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
             <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              tickLine={false}
              axisLine={false}
              />
            <YAxis 
                domain={['dataMin - 1000', 'dataMax + 1000']} 
                hide 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <defs>
              <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="price"
              type="natural"
              fill="url(#fillPrice)"
              stroke="var(--color-price)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
