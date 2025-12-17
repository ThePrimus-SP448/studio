import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { portfolio } from "@/lib/data";
import { ArrowDown, ArrowUp, DollarSign, PiggyBank, Scale } from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export function PortfolioSummary() {
  const isProfit = portfolio.totalPandL >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(portfolio.totalValue)}
          </div>
          <p className="text-xs text-muted-foreground">
            Current portfolio valuation
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(portfolio.totalInvestment)}
          </div>
          <p className="text-xs text-muted-foreground">
            Total capital invested
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit & Loss</CardTitle>
          <Scale className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              isProfit ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatCurrency(portfolio.totalPandL)}
          </div>
          <p className="flex items-center text-xs text-muted-foreground">
            {isProfit ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500" />
            )}
            {portfolio.totalPandLPercent.toFixed(2)}% all time
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
