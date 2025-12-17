import { TrendingUp } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-xl font-bold text-primary">
      <div className="rounded-lg bg-primary p-2 text-primary-foreground">
        <TrendingUp className="h-5 w-5" />
      </div>
      <span className="font-headline">StockWise</span>
    </div>
  );
}
