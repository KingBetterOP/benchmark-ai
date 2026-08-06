"use client";

import BenchmarkReportCard from "./BenchmarkReportCard";
import ContentIdeasCard from "./ContentIdeasCard";
import GrowthStrategyCard from "./GrowthStrategyCard";
import CompetitionCard from "./CompetitionCard";
import TitleGeneratorCard from "./TitleGeneratorCard";
import ThumbnailPlanCard from "./ThumbnailPlanCard";
import CreatorStudioCard from "./CreatorStudioCard";
import AIChat from "./AIChat";
import Accordion from "./Accordion";

import {
  BenchmarkReport,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
  ThumbnailPlan,
  CreatorKit,
} from "../lib/types";
import { translations } from "../lib/translations";

type Props = {
  report: BenchmarkReport | null;
  idea: ContentIdea[];
  strategy: Strategy[];
  competition: CompetitionAnalysis | null;
  titles: TitleSuggestion[];
  thumbnailPrompt: ThumbnailPlan[];
  creatorKit: CreatorKit | null;
    benchmarkScore: number;
  opportunityScore: number;
  trendingScore: number;
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
  creatorKit,
  benchmarkScore,
opportunityScore,
trendingScore,
  language,
  aiContext,
  messages,
  setMessages,
}: Props) {
  const t =
  translations[language as keyof typeof translations];
  





const finalScore = Math.round(
  benchmarkScore * 0.4 +
  opportunityScore * 0.35 +
  trendingScore * 0.25
);
const confidence = Math.min(
  99,
  Math.max(50, finalScore + 5)
);
const competitionLevel =
  finalScore >= 85
    ? t.low
    : finalScore >= 70
    ? t.average
    : t.high;
  const decision =
  finalScore >= 85
    ? `🚀 ${t.makeThisVideo}`
    : finalScore >= 70
    ? `⏳ ${t.wait}`
    : `🛑 ${t.avoid}`;
    const decisionDescription =
  finalScore >= 85
    ? t.makeVideoDescription
    : finalScore >= 70
    ? t.waitDescription
    : t.avoidDescription;

  return (
    <>
      <div className="mt-10 grid gap-6">
        
       <div className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-500/5 p-8 shadow-2xl shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1">

  <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
    {t.executiveSummary}
  </p>

  <h2 className="mt-3 bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-4xl font-extrabold text-transparent">
🧠 {t.aiOverview}
</h2>

  <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
    {t.executiveSummaryDescription}
  </p>

  <div className="mt-6 grid gap-4 md:grid-cols-4">

    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">

      <p className="text-xs uppercase tracking-widest text-emerald-300">
        {t.overallScore}
      </p>

      <h3 className="mt-2 text-4xl font-extrabold">
  {finalScore}
  <span className="text-xl text-zinc-500">
    {" "}
    /100
  </span>
</h3>

    </div>
            <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-green-500/5 p-5 text-center shadow-lg transition-all duration-300 hover:-translate-y-1">

      <p className="text-xs uppercase tracking-widest text-cyan-300">
        {t.strength}
      </p>

      <h3 className="mt-2 text-lg font-bold">
        {t.viralPotential}
      </h3>

    </div>

    <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 text-center">

      <p className="text-xs uppercase tracking-widest text-orange-300">
        {t.weakness}
      </p>

      <h3 className="mt-2 text-lg font-bold">
        {t.highCompetition}
      </h3>

    </div>

    <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4 text-center">

      <p className="text-xs uppercase tracking-widest text-purple-300">
        {t.priority}
      </p>

      <h3 className="mt-2 text-lg font-bold">
  {report?.actionPlan?.[0] ?? t.noRecommendation}
</h3>

    </div>

  </div>

  <div className="mt-6 rounded-2xl border border-zinc-700 bg-white/5 backdrop-blur-xl p-5">
      <h3 className="text-lg font-bold text-white">
      📌 {t.aiConclusion}
    </h3>

    <p className="mt-3 text-zinc-300">
      {report?.analysis}
    </p>

  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2">

    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

      <h3 className="mb-3 text-lg font-bold text-emerald-300">
        ✅ {t.keyStrengths}
      </h3>

      <ul className="space-y-2">
        {report?.insights.slice(0, 3).map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>

    </div>

    <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">

      <h3 className="mb-3 text-lg font-bold text-orange-300">
        🎯 {t.topPriorities}
      </h3>

      <ul className="space-y-2">
        {report?.actionPlan.slice(0, 3).map((item, index) => (
          <li key={index}>✅ {item}</li>
        ))}
      </ul>

    </div>

  </div>
    <div className="mt-6 rounded-3xl border border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/5 p-6">

    <p className="text-sm uppercase tracking-[0.3em] text-green-400">
      {t.aiDecision}
    </p>

    <h2 className="mt-3 text-4xl font-extrabold text-green-300">
  {decision}
</h2>
<p className="mt-2 text-lg font-semibold text-cyan-300">
  {t.confidence}: {confidence}%
</p>

    <p className="mt-4 text-zinc-300">
  {decisionDescription}
</p>
<p className="mt-3 text-sm text-zinc-500">
  {t.benchmark}: {benchmarkScore} · {t.opportunity}: {opportunityScore} · {t.trending}: {trendingScore}
</p>
<div className="mt-6 grid gap-3 md:grid-cols-3">

  <div className="rounded-xl bg-white/5 backdrop-blur-xl p-4 border border-zinc-700">
    <p className="text-xs uppercase text-zinc-400">
      {t.benchmark}
    </p>

    <p className="mt-2 text-2xl font-bold text-cyan-300">
      {benchmarkScore}
    </p>
  </div>

  <div className="rounded-xl bg-white/5 backdrop-blur-xl p-4 border border-zinc-700">
    <p className="text-xs uppercase text-zinc-400">
      {t.opportunity}
    </p>

    <p className="mt-2 text-2xl font-bold text-green-300">
      {opportunityScore}
    </p>
  </div>

  </div>
</div>
</div>
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
        <Accordion
  title="🎬 AI Creator Studio"
  defaultOpen={false}
>
  <CreatorStudioCard
    creatorKit={creatorKit}
  />
</Accordion>

      </div>

      <Accordion
        title={t.aiChatTitle}
        defaultOpen={false}
      >
        <AIChat
  context={aiContext}
  language={language}
  messages={messages}
  setMessages={setMessages}
/>
      </Accordion>

    </>
  );
}