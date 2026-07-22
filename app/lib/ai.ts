import { askAI } from "./openai";

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
    report,
    idea,
    strategy,
    competition,
    titles,
    thumbnail,
    recommendedChannels,
  };
}