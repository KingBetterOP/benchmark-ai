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

  console.log("START");

  const report = await askAI(reportPrompt);
  console.log("report");

  const idea = await askAI(ideaPrompt);
  console.log("idea");

  const strategy = await askAI(strategyPrompt);
  console.log("strategy");

  const competition = await askAI(competitionPrompt);
  console.log("competition");

  const titles = await askAI(titlePrompt);
  console.log("titles");

  const thumbnail = await askAI(thumbnailPrompt);
  console.log("thumbnail");

  const recommendedChannels = await askAI(
    recommendedChannelsPrompt
  );
  console.log("recommended");

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