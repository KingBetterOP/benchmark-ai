import { askAI } from "./openai";

function parseAIJson(text: string) {
  console.log("===== RAW AI RESPONSE =====");
  console.log(text);

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log("===== CLEANED =====");
  console.log(cleaned);

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("❌ JSON PARSE FAILED");
    console.error(cleaned);

    throw e;
  }
}

type AIRequest = {
  language: string;
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
  language,
  reportPrompt,
  ideaPrompt,
  strategyPrompt,
  competitionPrompt,
  titlePrompt,
  thumbnailPrompt,
  recommendedChannelsPrompt,
  opportunityPrompt,
}: AIRequest) {
  console.log("🚨 generateAllAI START");
  console.log("REPORT PROMPT");
console.log(reportPrompt);

console.log("IDEA PROMPT");
console.log(ideaPrompt);

console.log("STRATEGY PROMPT");
console.log(strategyPrompt);

console.log("COMPETITION PROMPT");
console.log(competitionPrompt);

console.log("TITLE PROMPT");
console.log(titlePrompt);

console.log("THUMBNAIL PROMPT");
console.log(thumbnailPrompt);

console.log("RECOMMENDED CHANNELS PROMPT");
console.log(recommendedChannelsPrompt);

console.log("OPPORTUNITY PROMPT");
console.log(opportunityPrompt);
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
  askAI(reportPrompt, language),
  askAI(ideaPrompt, language),
  askAI(strategyPrompt, language),
  askAI(competitionPrompt, language),
  askAI(titlePrompt, language),
  askAI(thumbnailPrompt, language),
  askAI(recommendedChannelsPrompt, language),
  askAI(opportunityPrompt, language),
]);

  console.log("========== AI RESPONSES ==========");
  console.log("REPORT:", report);
  console.log("IDEA:", idea);
  console.log("STRATEGY:", strategy);
  console.log("COMPETITION:", competition);
  console.log("TITLES:", titles);
  console.log("THUMBNAIL:", thumbnail);
  console.log("RECOMMENDED:", recommendedChannels);
  console.log("OPPORTUNITIES:", opportunities);
  console.log("==================================");

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