import { askAI } from "./openai";

function parseAIJson(text: string) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

type AnalysisRequest = {
  language: string;

  keywordIntelligencePrompt: string;

  titleAnalysisPrompt: string;

  thumbnailAnalysisPrompt: string;

  missedOpportunitiesPrompt: string;
};

export async function generateAnalysisAI({
  language,

  keywordIntelligencePrompt,

  titleAnalysisPrompt,

  thumbnailAnalysisPrompt,

  missedOpportunitiesPrompt,
}: AnalysisRequest) {

  const [
    keywordIntelligence,

    titleAnalysis,

    thumbnailAnalysis,

    missedOpportunities,
  ] = await Promise.all([

    askAI(keywordIntelligencePrompt, language),

    askAI(titleAnalysisPrompt, language),

    askAI(thumbnailAnalysisPrompt, language),

    askAI(missedOpportunitiesPrompt, language),

  ]);

  return {

    keywordIntelligence:
      parseAIJson(keywordIntelligence),

    titleAnalysis:
      parseAIJson(titleAnalysis),

    thumbnailAnalysis:
      parseAIJson(thumbnailAnalysis),

    missedOpportunities:
      parseAIJson(missedOpportunities),

  };
}