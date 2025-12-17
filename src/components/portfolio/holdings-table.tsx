import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { portfolio } from '@/lib/data';
import { Holding } from '@/lib/types';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const HoldingRow = ({ holding }: { holding: Holding }) => {
  const invested = holding.quantity * holding.avgPrice;
  const currentValue = holding.quantity * holding.currentPrice;
  const pAndL = currentValue - invested;
  const pAndLPercent = invested > 0 ? (pAndL / invested) * 100 : 0;
  const isProfit = pAndL >= 0;

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Image
            src={holding.logoUrl}
            alt={`${holding.name} logo`}
            width={32}
            height={32}
            className="rounded-full"
            data-ai-hint="logo"
          />
          <div>
            <div className="font-medium">{holding.ticker}</div>
            <div className="text-xs text-muted-foreground">{holding.name}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">{holding.quantity}</TableCell>
      <TableCell className="text-right">{formatCurrency(holding.avgPrice)}</TableCell>
      <TableCell className="text-right">{formatCurrency(holding.currentPrice)}</TableCell>
      <TableCell className="text-right">{formatCurrency(invested)}</TableCell>
      <TableCell className="text-right">{formatCurrency(currentValue)}</TableCell>
      <TableCell className={`text-right font-medium ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
        <div>{formatCurrency(pAndL)}</div>
        <div className="text-xs">({pAndLPercent.toFixed(2)}%)</div>
      </TableCell>
    </TableRow>
  );
};

export function HoldingsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Avg. Price</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead className="text-right">Invested</TableHead>
              <TableHead className="text-right">Current Value</TableHead>
              <TableHead className="text-right">P/L</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.holdings.map((holding) => (
              <HoldingRow key={holding.ticker} holding={holding} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
