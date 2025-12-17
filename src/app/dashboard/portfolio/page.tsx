import { Header } from "@/components/header";
import { PortfolioSummary } from "@/components/portfolio/portfolio-summary";
import { PortfolioChart } from "@/components/portfolio/portfolio-chart";
import { HoldingsTable } from "@/components/portfolio/holdings-table";

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="My Portfolio" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <PortfolioSummary />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <PortfolioChart />
            </div>
            <div className="lg:col-span-1">
                <HoldingsTable />
            </div>
        </div>
      </main>
    </div>
  );
}
