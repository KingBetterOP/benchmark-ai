"use client";

import { useCallback, useState } from "react";

import { useBenchmarkSearch } from "../hooks/useBenchmarkSearch";
import { useBenchmarkIntelligence } from "../hooks/useBenchmarkIntelligence";

import AnalysisSection from "../components/AnalysisSection";
import ErrorCard from "../components/ErrorCard";

import {
  calculateBenchmarkScore,
  formatDuration,
} from "../lib/videoUtils";

import type {
  Video,
  Channel,
  BenchmarkReport,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
  ThumbnailPlan,
  SEOAnalysis,
  SEOOptimizer,
  ContentGap,
  ChannelAudit,
  ContentPlanner,
  AIThumbnail,
  Opportunity,
  CreatorKit,
  ContentStrategy,
  KeywordIntelligence,
  MissedOpportunity,
  ThumbnailAnalysis,
} from "../lib/types";

import type { PlannerResponse } from "../types/planner";

export default function ResearchPage() {
  /* ==========================================================
     SEARCH STATE
  ========================================================== */

  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("relevance");

  const [min10Minutes, setMin10Minutes] =
    useState(false);

  const [last30Days, setLast30Days] =
    useState(false);

  const [excludeShorts] =
    useState(false);

  const [language, setLanguage] =
    useState("en");

  /* ==========================================================
     RESULT STATE
  ========================================================== */

  const [results, setResults] =
    useState<Video[]>([]);

  const [topVideos, setTopVideos] =
    useState<Video[]>([]);

  const [channels, setChannels] =
    useState<Channel[]>([]);

  const [averageViews, setAverageViews] =
    useState(0);

  const [report, setReport] =
    useState<BenchmarkReport | null>(null);

  const [idea, setIdea] =
    useState<ContentIdea[]>([]);

  const [strategy, setStrategy] =
    useState<Strategy[]>([]);

  const [competition, setCompetition] =
    useState<CompetitionAnalysis | null>(null);

  const [titles, setTitles] =
    useState<TitleSuggestion[]>([]);

  const [thumbnailPrompt, setThumbnailPrompt] =
    useState<ThumbnailPlan[]>([]);

  const [opportunities, setOpportunities] =
    useState<Opportunity[]>([]);

  const [recommendedChannels] =
    useState("");

  /* ==========================================================
     AI STATE
  ========================================================== */

  const [keywordIntelligence, setKeywordIntelligence] =
  useState<KeywordIntelligence>({
    difficulty: 0,
    opportunity: 0,
    trend: "-",
    demand: "-",
    uploadTime: "-",
    audience: "-",
    expectedViews: "-",
    expectedCTR: "-",
    estimatedRPM: "-",
    estimatedRevenue: "-",
    recommendation: "-",
    confidence: 0,
  });
  const [missedOpportunities, setMissedOpportunities] =
    useState<MissedOpportunity[]>([]);

  const [thumbnailAnalysis, setThumbnailAnalysis] =
    useState<ThumbnailAnalysis>({
      ctrScore: 0,
      emotionScore: 0,
      colorScore: 0,
      textScore: 0,
      overallScore: 0,
      strengths: [],
      improvements: [],
    });

  const [titleAnalysis] =
    useState({
      ctrScore: 0,
      seoScore: 0,
      emotionScore: 0,
      curiosityScore: 0,
      lengthScore: 0,
      overallScore: 0,
      improvements: [] as string[],
      betterTitles: [] as string[],
    });

  const [seoAnalysis] =
    useState<SEOAnalysis | null>(null);

  const [seoOptimizer] =
    useState<SEOOptimizer | null>(null);

  const [contentGap] =
    useState<ContentGap[]>([]);

  const [channelAudit] =
    useState<ChannelAudit | null>(null);

  const [contentPlanner] =
    useState<ContentPlanner[]>([]);

  const [aiThumbnail] =
    useState<AIThumbnail[]>([]);

  const [planner] =
    useState<PlannerResponse | null>(null);

  const [contentStrategy] =
    useState<ContentStrategy | null>(null);

  const [creatorKit] =
    useState<CreatorKit | null>(null);

  /* ==========================================================
     UI STATE
  ========================================================== */

  const [loading, setLoading] =
    useState(false);

  const [loadingStep, setLoadingStep] =
    useState("");

  const [loadingProgress, setLoadingProgress] =
    useState(0);

  const [error, setError] =
    useState("");

  /* ==========================================================
     BENCHMARK SEARCH ENGINE
  ========================================================== */

  const {
    runBenchmarkSearch,
  } = useBenchmarkSearch({
    language,
    excludeShorts,
    min10Minutes,
    last30Days,
    setError,
  });

  /* ==========================================================
     INTELLIGENCE
  ========================================================== */

  const {
    opportunityScoreV2,
  } = useBenchmarkIntelligence({
    results,
    keywordIntelligence,
    report,
  });

  /* ==========================================================
     SEARCH
  ========================================================== */

  const handleSearch = useCallback(
    async () => {
      const normalizedKeyword =
        keyword.trim();

      if (!normalizedKeyword) {
        setError(
          language === "ko"
            ? "검색할 키워드를 입력해주세요."
            : "Please enter a keyword."
        );

        return;
      }

      try {
        setError("");

        const result =
          await runBenchmarkSearch({
            keyword: normalizedKeyword,
            order,
            setLoading,
            setLoadingStep,
            setLoadingProgress,
          });

        if (!result) {
          return;
        }

        /* ======================================================
           PROCESSED RESULTS
        ====================================================== */

        setResults(
          result.processed.results
        );

        setTopVideos(
          result.processed.topVideos
        );

        setChannels(
          result.processed.channels
        );

        setAverageViews(
          result.processed.averageViews
        );

        /* ======================================================
           AI RESULTS
        ====================================================== */

        setReport(
          result.ai.report
        );

        setIdea(
          result.ai.idea
        );

        setStrategy(
          result.ai.strategy
        );

        setCompetition(
          result.ai.competition
        );

        setTitles(
          result.ai.titles
        );

        setThumbnailPrompt(
          result.ai.thumbnail
        );

        setOpportunities(
          result.ai.opportunities
        );

        setKeywordIntelligence(
          result.ai.keywordIntelligence
        );

        setMissedOpportunities(
          result.missedOpportunities
        );

        setThumbnailAnalysis(
          result.thumbnailAnalysis
        );

      } catch (searchError) {
        console.error(
          "Research search failed:",
          searchError
        );

        setError(
          searchError instanceof Error
            ? searchError.message
            : "Research failed."
        );
      }
    },
    [
      keyword,
      order,
      language,
      runBenchmarkSearch,
    ]
  );

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#09090B] via-[#111827] to-[#09090B] text-white">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Benchmark AI
            </p>

            <h1 className="mt-1 text-2xl font-black">
              Research
            </h1>
          </div>

          <a
            href="/"
            className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold transition hover:bg-white/[0.1]"
          >
            Home
          </a>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">

        {/* ====================================================
            SEARCH
        ==================================================== */}

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-10">

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              YouTube Intelligence
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Research the YouTube market.
            </h2>

            <p className="mt-4 text-base leading-7 text-zinc-400">
              Analyze videos, channels, views,
              competition, opportunities, and
              content patterns before you create.
            </p>

          </div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">

            <input
              value={keyword}
              onChange={(event) =>
                setKeyword(
                  event.target.value
                )
              }
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !loading
                ) {
                  void handleSearch();
                }
              }}
              placeholder={
                language === "ko"
                  ? "분석할 YouTube 키워드..."
                  : "Enter a YouTube keyword..."
              }
              className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/40"
            />

            <select
              value={order}
              onChange={(event) =>
                setOrder(
                  event.target.value
                )
              }
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none"
            >
              <option value="relevance">
                Relevance
              </option>

              <option value="viewCount">
                Most Views
              </option>

              <option value="date">
                Latest
              </option>
            </select>

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                void handleSearch()
              }
              className="rounded-2xl bg-cyan-400 px-7 py-4 font-black text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Analyzing..."
                : "Analyze"}
            </button>

          </div>

          {/* FILTERS */}

          <div className="mt-5 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() =>
                setMin10Minutes(
                  (value) => !value
                )
              }
              className={`rounded-xl border px-4 py-2 text-sm transition ${
                min10Minutes
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 bg-white/[0.03] text-zinc-400"
              }`}
            >
              10+ minute videos
            </button>

            <button
              type="button"
              onClick={() =>
                setLast30Days(
                  (value) => !value
                )
              }
              className={`rounded-xl border px-4 py-2 text-sm transition ${
                last30Days
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 bg-white/[0.03] text-zinc-400"
              }`}
            >
              Last 30 days
            </button>

          </div>

          {loading && (
            <div className="mt-6">

              <div className="mb-2 flex justify-between text-xs text-zinc-500">
                <span>
                  {loadingStep ||
                    "Analyzing..."}
                </span>

                <span>
                  {loadingProgress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                  style={{
                    width: `${loadingProgress}%`,
                  }}
                />

              </div>

            </div>
          )}

        </section>

        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <div className="mt-6">
            <ErrorCard
              message={error}
              onRetry={() =>
                void handleSearch()
              }
            />
          </div>
        )}

        {/* ====================================================
            RESEARCH SNAPSHOT
        ==================================================== */}

        {results.length > 0 && (
          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <ResearchMetric
              label="Videos Analyzed"
              value={results.length.toString()}
            />

            <ResearchMetric
              label="Average Views"
              value={averageViews.toLocaleString()}
            />

            <ResearchMetric
              label="Benchmark Score"
              value={`${report?.score ?? 0}/100`}
            />

            <ResearchMetric
              label="Opportunity"
              value={`${opportunityScoreV2.total}/100`}
            />

          </section>
        )}

        {/* ====================================================
            RESEARCH RESULTS
        ==================================================== */}

        <section className="mt-10">

          <AnalysisSection
            topVideos={topVideos}
            results={results}
            channels={channels}
            keyword={keyword}
            loading={loading}
            language={language}
            calculateBenchmarkScore={
              calculateBenchmarkScore
            }
            formatDuration={
              formatDuration
            }
          />

        </section>

      </div>
    </main>
  );
}

/* ============================================================
   METRIC
============================================================ */

function ResearchMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">

      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-white">
        {value}
      </p>

    </div>
  );
}