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
    ? "LOW"
    : finalScore >= 70
    ? "MEDIUM"
    : "HIGH";
  const decision =
  finalScore >= 85
    ? "🚀 MAKE THIS VIDEO"
    : finalScore >= 70
    ? "⏳ WAIT"
    : "🛑 AVOID";
    const decisionDescription =
  finalScore >= 85
    ? "This keyword has excellent potential based on AI benchmark analysis."
    : finalScore >= 70
    ? "The keyword has potential, but improvements are recommended before creating a video."
    : "The current benchmark suggests focusing on a different keyword or strategy.";

  return (
    <>
      <div className="mt-10 grid gap-6">
        <div className="rounded-3xl border border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/5 p-6">

  <p className="text-sm uppercase tracking-[0.3em] text-green-400">
    AI Decision
  </p>

  <h2 className="mt-3 text-4xl font-extrabold text-green-300">
    🚀 MAKE THIS VIDEO
  </h2>

  <div className="mt-6 grid gap-4 md:grid-cols-4">

    <div>
      <p className="text-xs text-zinc-400">
        Success
      </p>

      <p className="text-2xl font-bold">
        {report?.score ?? 0}%
      </p>
    </div>

    <div>
      <p className="text-xs text-zinc-400">
        Competition
      </p>

      <p className="text-xl font-bold">
        {competitionLevel}
      </p>
    </div>
        <div>
      <p className="text-xs text-zinc-400">
        Expected Views
      </p>

      <p className="text-xl font-bold">
        --
      </p>
    </div>

    <div>
      <p className="text-xs text-zinc-400">
        Upload
      </p>

      <p className="text-xl font-bold">
        Today
      </p>
    </div>

  </div>
  </div>
       <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-6">

  <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
    Executive Summary
  </p>

  <h2 className="mt-2 text-3xl font-bold">
    🧠 AI Overview
  </h2>

  <p className="mt-4 text-zinc-300">
    Analyze strengths, weaknesses and the highest-priority actions before creating your next video.
  </p>

  <div className="mt-6 grid gap-4 md:grid-cols-4">

    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">

      <p className="text-xs uppercase tracking-widest text-emerald-300">
        Overall Score
      </p>

      <h3 className="mt-2 text-4xl font-extrabold">
  {finalScore}
  <span className="text-xl text-zinc-500">
    {" "}
    /100
  </span>
</h3>

    </div>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-center">

      <p className="text-xs uppercase tracking-widest text-cyan-300">
        Strength
      </p>

      <h3 className="mt-2 text-lg font-bold">
        Viral Potential
      </h3>

    </div>

    <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 text-center">

      <p className="text-xs uppercase tracking-widest text-orange-300">
        Weakness
      </p>

      <h3 className="mt-2 text-lg font-bold">
        High Competition
      </h3>

    </div>

    <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4 text-center">

      <p className="text-xs uppercase tracking-widest text-purple-300">
        Priority
      </p>

      <h3 className="mt-2 text-lg font-bold">
  {report?.actionPlan?.[0] ?? "No recommendation"}
</h3>

    </div>

  </div>

  <div className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-900/60 p-5">
      <h3 className="text-lg font-bold text-white">
      📌 AI Conclusion
    </h3>

    <p className="mt-3 text-zinc-300">
      {report?.analysis}
    </p>

  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2">

    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

      <h3 className="mb-3 text-lg font-bold text-emerald-300">
        ✅ Key Strengths
      </h3>

      <ul className="space-y-2">
        {report?.insights.slice(0, 3).map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>

    </div>

    <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">

      <h3 className="mb-3 text-lg font-bold text-orange-300">
        🎯 Top Priorities
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
      AI Decision
    </p>

    <h2 className="mt-3 text-4xl font-extrabold text-green-300">
  {decision}
</h2>
<p className="mt-2 text-lg font-semibold text-cyan-300">
  Confidence: {confidence}%
</p>

    <p className="mt-4 text-zinc-300">
  {decisionDescription}
</p>
<p className="mt-3 text-sm text-zinc-500">
  Benchmark: {benchmarkScore} · Opportunity: {opportunityScore} · Trending: {trendingScore}
</p>
<div className="mt-6 grid gap-3 md:grid-cols-3">

  <div className="rounded-xl bg-zinc-900/60 p-4 border border-zinc-700">
    <p className="text-xs uppercase text-zinc-400">
      Benchmark
    </p>

    <p className="mt-2 text-2xl font-bold text-cyan-300">
      {benchmarkScore}
    </p>
  </div>

  <div className="rounded-xl bg-zinc-900/60 p-4 border border-zinc-700">
    <p className="text-xs uppercase text-zinc-400">
      Opportunity
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