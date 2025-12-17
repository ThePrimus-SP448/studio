'use server';

import { getPersonalizedRecommendations, PersonalizedRecommendationsInput, PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-investment-recommendations';

export async function getRecommendations(input: PersonalizedRecommendationsInput): Promise<{ recommendations: string; financialSummary: string } | { error: string }> {
  try {
    const result: PersonalizedRecommendationsOutput = await getPersonalizedRecommendations(input);
    return {
      recommendations: result.recommendations,
      financialSummary: result.financialSummary,
    };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'An unexpected error occurred.' };
  }
}
