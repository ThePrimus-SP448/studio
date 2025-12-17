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
import { portfolio } from '@/lib/data';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        notation: 'compact',
        compactDisplay: 'short'
    }).format(value);
};

const formatTooltipCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

export function PortfolioChart() {
  const chartData = portfolio.history;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>Your portfolio value over the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: 'Value',
              color: 'hsl(var(--primary))',
            },
          }}
          className="h-80 w-full"
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
                tickFormatter={(value) => formatCurrency(value)}
                domain={['dataMin - 10000', 'dataMax + 10000']} 
                tickLine={false}
                axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" formatter={(value) => formatTooltipCurrency(value as number)}/>}
            />
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillValue)"
              stroke="var(--color-value)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
