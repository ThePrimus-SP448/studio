import { Header } from "@/components/header";
import { AdvisorClient } from "@/components/advisor/advisor-client";

export default function AdvisorPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="AI Advisor" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <AdvisorClient />
      </main>
    </div>
  );
}
