"use client";

import BenchmarkReportCard from "./BenchmarkReportCard";
import ContentIdeasCard from "./ContentIdeasCard";
import GrowthStrategyCard from "./GrowthStrategyCard";
import CompetitionCard from "./CompetitionCard";
import TitleGeneratorCard from "./TitleGeneratorCard";
import ThumbnailPlanCard from "./ThumbnailPlanCard";
import AIChat from "./AIChat";

import {
  BenchmarkReport,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
  ThumbnailPlan,
} from "../lib/types";

type Props = {
  report: BenchmarkReport | null;
  idea: ContentIdea[];
  strategy: Strategy[];
  competition: CompetitionAnalysis | null;
  titles: TitleSuggestion[];
  thumbnailPrompt: ThumbnailPlan[];
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
  aiContext,
  messages,
  setMessages,
}: Props) {
  return (
    <>
      <div className="mt-10 grid gap-6">
        <BenchmarkReportCard report={report} />
        <ContentIdeasCard content={idea} />
        <GrowthStrategyCard strategy={strategy} />
        <CompetitionCard competition={competition} />
        <TitleGeneratorCard titles={titles} />
        <ThumbnailPlanCard thumbnail={thumbnailPrompt} />
      </div>

      <AIChat
        context={aiContext}
        messages={messages}
        setMessages={setMessages}
      />
    </>
  );
}