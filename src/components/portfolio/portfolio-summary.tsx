import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { portfolio } from "@/lib/data";
import { ArrowDown, ArrowUp, Banknote, PiggyBank, Scale } from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export function PortfolioSummary() {
  const isProfit = portfolio.totalPandL >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <Scale className="h-4 w-4 text-muted-foreground" />
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
          <div
            className={`flex items-center text-xs ${
              isProfit ? "text-green-500" : "text-red-500"
            }`}
          >
            {isProfit ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            {portfolio.totalPandLPercent.toFixed(2)}%
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              isProfit ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatCurrency(portfolio.totalPandL)}
          </div>
          <p className="text-xs text-muted-foreground">
            All-time profit and loss
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
          <Banknote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(portfolio.cash)}
          </div>
          <p className="text-xs text-muted-foreground">
            Available to trade
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
