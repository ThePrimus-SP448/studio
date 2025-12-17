'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getRecommendations } from '@/app/actions';
import { Loader2, Sparkles } from 'lucide-react';
import { portfolio, stocks } from '@/lib/data';

type RecommendationResult = {
  recommendations: string;
  financialSummary: string;
} | null;

export function AdvisorClient() {
  const [investmentGoals, setInvestmentGoals] = useState('My goal is long-term growth with a moderate risk tolerance. I want to invest in tech and renewable energy sectors.');
  const [result, setResult] = useState<RecommendationResult>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const portfolioSummary = `Total Value: $${portfolio.totalValue.toFixed(2)}. Holdings: ${portfolio.holdings.map(h => `${h.quantity} ${h.ticker}`).join(', ')}.`;
    const tradingHistory = "Recent trades include buying 10 TSLA and selling 5 MSFT.";
    const marketTrends = `Current top performing stocks are: ${stocks.slice(0, 3).map(s => `${s.ticker} at $${s.price}`).join(', ')}. The market is showing bullish signs in the tech sector.`;

    const response = await getRecommendations({
      investmentGoals,
      portfolioSummary,
      tradingHistory,
      marketTrends,
    });

    if ('error' in response) {
      setError(response.error);
    } else {
      setResult(response);
    }
    setLoading(false);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>AI Investment Advisor</CardTitle>
            <CardDescription>
              Get personalized investment recommendations based on your goals and portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="investment-goals">Your Investment Goals</Label>
              <Textarea
                id="investment-goals"
                placeholder="e.g., Long-term growth, high-risk, focus on tech stocks."
                value={investmentGoals}
                onChange={(e) => setInvestmentGoals(e.target.value)}
                rows={5}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Your portfolio summary, trading history, and current market trends will be automatically included for a comprehensive analysis.
            </p>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Recommendations
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-8">
        {loading && (
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Generating Recommendations...</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                 <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted"></div>
                 <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted"></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Generating Financial Summary...</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                 <div className="h-4 w-full animate-pulse rounded-md bg-muted"></div>
                 <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted"></div>
              </CardContent>
            </Card>
          </div>
        )}
        {error && (
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">An Error Occurred</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{error}</p>
                </CardContent>
            </Card>
        )}
        {result && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Investment Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{result.recommendations}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{result.financialSummary}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
