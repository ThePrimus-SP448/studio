import { Header } from "@/components/header";
import { MarketOverview } from "@/components/dashboard/market-overview";
import { TopStocks } from "@/components/dashboard/top-stocks";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <MarketOverview />
        <h2 className="text-2xl font-bold tracking-tight">Trending Stocks</h2>
        <TopStocks />
      </main>
    </div>
  );
}
