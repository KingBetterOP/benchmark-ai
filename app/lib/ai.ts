import { askAI } from "./openai";

function parseAIJson(text: string) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

type AIRequest = {
  reportPrompt: string;
  ideaPrompt: string;
  strategyPrompt: string;
  competitionPrompt: string;
  titlePrompt: string;
  thumbnailPrompt: string;
  recommendedChannelsPrompt: string;
  opportunityPrompt: string; 
};

export async function generateAllAI({
  reportPrompt,
  ideaPrompt,
  strategyPrompt,
  competitionPrompt,
  titlePrompt,
  thumbnailPrompt,
  recommendedChannelsPrompt,
  opportunityPrompt, 
}: AIRequest) {
  const [
    report,
    idea,
    strategy,
    competition,
    titles,
    thumbnail,
    recommendedChannels,
    opportunities, 
  ] = await Promise.all([
    askAI(reportPrompt),
    askAI(ideaPrompt),
    askAI(strategyPrompt),
    askAI(competitionPrompt),
    askAI(titlePrompt),
    askAI(thumbnailPrompt),
    askAI(recommendedChannelsPrompt),
    askAI(opportunityPrompt), 
  ]);

  return {
    report: parseAIJson(report),
    idea: parseAIJson(idea),
    strategy: parseAIJson(strategy),
    competition: parseAIJson(competition),
    titles: parseAIJson(titles),
    thumbnail: parseAIJson(thumbnail),
    recommendedChannels,
    opportunities: parseAIJson(opportunities), 
  };
}