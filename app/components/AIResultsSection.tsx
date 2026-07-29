"use client";

import BenchmarkReportCard from "./BenchmarkReportCard";
import ContentIdeasCard from "./ContentIdeasCard";
import GrowthStrategyCard from "./GrowthStrategyCard";
import CompetitionCard from "./CompetitionCard";
import TitleGeneratorCard from "./TitleGeneratorCard";
import ThumbnailPlanCard from "./ThumbnailPlanCard";
import AIChat from "./AIChat";
import Accordion from "./Accordion";

import {
  BenchmarkReport,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
  ThumbnailPlan,
} from "../lib/types";
import { translations } from "../lib/translations";

type Props = {
  report: BenchmarkReport | null;
  idea: ContentIdea[];
  strategy: Strategy[];
  competition: CompetitionAnalysis | null;
  titles: TitleSuggestion[];
  thumbnailPrompt: ThumbnailPlan[];
  language: string;
  aiContext: string;
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
  setMessages: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
      }[]
    >
  >;
};

export default function AIResultsSection({
  report,
  idea,
  strategy,
  competition,
  titles,
  thumbnailPrompt,
  language,
  aiContext,
  messages,
  setMessages,
}: Props) {
  const t =
  translations[language as keyof typeof translations];
  return (
    <>
      <div className="mt-10 grid gap-6">
        <Accordion
  title={t.benchmarkReportTitle}
  defaultOpen={true}
>
  <BenchmarkReportCard report={report} />
</Accordion>
        <Accordion title={t.contentIdeasTitle}>
  <ContentIdeasCard content={idea} />
</Accordion>
<Accordion title={t.growthStrategyTitle}>
  <GrowthStrategyCard strategy={strategy} />
</Accordion>
<Accordion title={t.competitionTitle}>
  <CompetitionCard competition={competition} />
</Accordion>
<Accordion title={t.aiTitlesTitle}>
  <TitleGeneratorCard titles={titles} />
</Accordion>
<Accordion title={t.thumbnailStrategyTitle}>
  <ThumbnailPlanCard thumbnail={thumbnailPrompt} />
</Accordion>
      </div>

      <Accordion
  title={t.aiChatTitle}
  defaultOpen={false}
>
  <AIChat
    context={aiContext}
    messages={messages}
    setMessages={setMessages}
  />
</Accordion>
    </>
  );
}