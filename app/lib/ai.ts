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
};

export async function generateAllAI({
  reportPrompt,
  ideaPrompt,
  strategyPrompt,
  competitionPrompt,
  titlePrompt,
  thumbnailPrompt,
  recommendedChannelsPrompt,
}: AIRequest) {
  const [
    report,
    idea,
    strategy,
    competition,
    titles,
    thumbnail,
    recommendedChannels,
  ] = await Promise.all([
    askAI(reportPrompt),
    askAI(ideaPrompt),
    askAI(strategyPrompt),
    askAI(competitionPrompt),
    askAI(titlePrompt),
    askAI(thumbnailPrompt),
    askAI(recommendedChannelsPrompt),
  ]);

  return {
    report: parseAIJson(report),
    idea: parseAIJson(idea),
    strategy: parseAIJson(strategy),
    competition: parseAIJson(competition),
    titles: parseAIJson(titles),
    thumbnail: parseAIJson(thumbnail),
    recommendedChannels,
  };
}