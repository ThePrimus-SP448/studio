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
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
            <PortfolioChart />
            <div className="lg:col-start-1 lg:row-start-2">
                 <HoldingsTable />
            </div>
        </div>
         <div className="hidden lg:block lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <HoldingsTable />
        </div>
      </main>
    </div>
  );
}
