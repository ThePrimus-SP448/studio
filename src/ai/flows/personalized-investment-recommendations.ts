'use server';

/**
 * @fileOverview Provides personalized investment recommendations and financial summaries based on user data.
 *
 * - getPersonalizedRecommendations - A function that generates investment recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  portfolioSummary: z
    .string()
    .describe('Summary of the user portfolio, including current holdings.'),
  tradingHistory: z.string().describe('The user trading history.'),
  marketTrends: z.string().describe('Current market trends and news.'),
  investmentGoals: z.string().describe('The investment goals of the user.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'Personalized investment recommendations based on the provided data.'
    ),
  financialSummary: z
    .string()
    .describe('A summary of the users financial situation.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI investment advisor providing personalized investment recommendations.

  Based on the user's portfolio summary, trading history, current market trends, and investment goals, generate personalized investment recommendations and a financial summary.

  Portfolio Summary: {{{portfolioSummary}}}
  Trading History: {{{tradingHistory}}}
  Market Trends: {{{marketTrends}}}
  Investment Goals: {{{investmentGoals}}}

  Provide clear, actionable recommendations and a concise financial summary to help the user make informed decisions.
  Ensure the output aligns with the schema descriptions.
  Recommendations:
  Financial Summary:
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
