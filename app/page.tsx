"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useUser } from "@clerk/nextjs";

import { downloadCSV } from "./lib/downloadCSV";
import { downloadPDF } from "./lib/downloadPDF";

import { useBenchmarkController } from "./hooks/useBenchmarkController";
import { useBenchmarkState } from "./hooks/useBenchmarkState";
import { useBenchmarkIntelligence } from "./hooks/useBenchmarkIntelligence";
import { useAIAnalysis } from "./hooks/useAIAnalysis";
import { useCreatorWorkspace } from "./hooks/useCreatorWorkspace";
import { useBenchmarkSearch } from "./hooks/useBenchmarkSearch";
import { useProjectManager } from "./hooks/useProjectManager";
import { useProjectDataBuilder } from "./hooks/useProjectDataBuilder";

import {
  formatDuration,
  calculateBenchmarkScore,
} from "./lib/videoUtils";

import type { PlannerResponse } from "./types/planner";

import type {
  Video,
  Channel,
  BenchmarkReport,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
  ThumbnailPlan,
  Opportunity,
  CreatorKit,
  SEOAnalysis,
  SEOOptimizer,
  ContentGap,
  ChannelAudit,
  ContentPlanner,
  AIThumbnail,
  ContentStrategy,
} from "./lib/types";

import SearchFilters from "./components/SearchFilters";
import ProjectList from "./components/ProjectList";
import OpportunityScoreCard from "./components/OpportunityScoreCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OpportunityFinder from "./components/OpportunityFinder";
import LoadingProgress from "./components/LoadingProgress";
import HeroSectionV2 from "./components/HeroSectionV2";
import PlanCard from "./components/PlanCard";
import AIResultsSection from "./components/AIResultsSection";
import SearchSection from "./components/SearchSection";
import AnalysisSection from "./components/AnalysisSection";
import QuickNavigation from "./components/QuickNavigation";
import ErrorCard from "./components/ErrorCard";
import TrustBar from "./components/TrustBar";
import IntelligenceSection from "./components/sections/IntelligenceSection";
import AIAnalysisSection from "./components/sections/AIAnalysisSection";
import PlannerCalendar from "./components/planning/PlannerCalendar";
import OneClickCreator from "./components/OneClickCreator";
import ProjectSummary from "./components/dashboard/ProjectSummary";
import GrowthPlanCard from "./components/GrowthPlanCard";
import CreatorWorkspace from "./components/CreatorWorkspace";
import ResearchSnapshot from "./components/ResearchSnapshot";
import DecisionEngine from "./components/DecisionEngine";
import FinalDecisionCard from "./components/FinalDecisionCard";
import ContentStrategyCard from "./components/ContentStrategyCard";
import Link from "next/link";

/* ============================================================
   DEFAULT VALUES
   ============================================================ */

const DEFAULT_TITLE_ANALYSIS = {
  ctrScore: 0,
  seoScore: 0,
  emotionScore: 0,
  curiosityScore: 0,
  lengthScore: 0,
  overallScore: 0,
  improvements: [] as string[],
  betterTitles: [] as string[],
};

const DEFAULT_VIRAL_PREDICTION = {
  successProbability: 0,
  expectedViews: "-",
  expectedCTR: "-",
  estimatedRPM: "-",
  estimatedRevenue: "-",
  competition: "-",
  recommendation: "-",
  confidence: 0,
};

/* ============================================================
   HOME
   ============================================================ */

export default function Home() {
  const { user } = useUser();

  /* ==========================================================
     REFS
     ========================================================== */

  const dashboardRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  /* ==========================================================
     BENCHMARK STATE
     ========================================================== */

  const {
    keyword,
    setKeyword,

    results,
    setResults,

    averageViews,
    setAverageViews,

    report,
    setReport,

    idea,
    setIdea,

    creatorKit,
    setCreatorKit,
  } = useBenchmarkState();

  const [strategy, setStrategy] = useState<Strategy[]>([]);
  const [competition, setCompetition] =
    useState<CompetitionAnalysis | null>(null);
  const [titles, setTitles] = useState<TitleSuggestion[]>([]);

  const [topVideos, setTopVideos] = useState<Video[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);

  const [thumbnailPrompt, setThumbnailPrompt] =
    useState<ThumbnailPlan[]>([]);

  const [opportunities, setOpportunities] =
    useState<Opportunity[]>([]);

  const [recommendedChannels, setRecommendedChannels] =
    useState("");

  /* ==========================================================
     AI ANALYSIS STATE
     ========================================================== */

  const {
    keywordIntelligence,
    setKeywordIntelligence,

    missedOpportunities,
    setMissedOpportunities,

    thumbnailAnalysis,
    setThumbnailAnalysis,
  } = useAIAnalysis();

  const [titleAnalysis, setTitleAnalysis] = useState(
    DEFAULT_TITLE_ANALYSIS
  );

  const [seoAnalysis, setSeoAnalysis] =
    useState<SEOAnalysis | null>(null);

  const [seoOptimizer, setSeoOptimizer] =
    useState<SEOOptimizer | null>(null);

  const [contentGap, setContentGap] =
    useState<ContentGap[]>([]);

  const [channelAudit, setChannelAudit] =
    useState<ChannelAudit | null>(null);

  const [contentPlanner, setContentPlanner] =
    useState<ContentPlanner[]>([]);

  const [aiThumbnail, setAIThumbnail] =
    useState<AIThumbnail[]>([]);

  const [viralPrediction, setViralPrediction] =
    useState(DEFAULT_VIRAL_PREDICTION);

  /* ==========================================================
     GENERAL STATE
     ========================================================== */

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loadingStep, setLoadingStep] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [order, setOrder] = useState("relevance");

  const [excludeShorts] = useState(false);

  const [min10Minutes, setMin10Minutes] =
    useState(false);

  const [last30Days, setLast30Days] =
    useState(false);

  const [language, setLanguage] = useState("en");

  const [searchHistory, setSearchHistory] =
    useState<string[]>([]);

  const [messages, setMessages] = useState<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);

  const [plan, setPlan] = useState("free");
  const [dailyUsage, setDailyUsage] = useState(0);

  const [planner, setPlanner] =
    useState<PlannerResponse | null>(null);

  const [contentStrategy, setContentStrategy] =
    useState<ContentStrategy | null>(null);

  /* ==========================================================
     LANGUAGE
     ========================================================== */

  useEffect(() => {
    try {
      const savedLanguage =
        localStorage.getItem("language");

      if (
        savedLanguage === "ko" ||
        savedLanguage === "en"
      ) {
        setLanguage(savedLanguage);
      }
    } catch (storageError) {
      console.error(
        "Failed to load language:",
        storageError
      );
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "language",
        language
      );
    } catch (storageError) {
      console.error(
        "Failed to save language:",
        storageError
      );
    }
  }, [language]);

  /* ==========================================================
     SEARCH HISTORY
     ========================================================== */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          "searchHistory"
        );

      if (!saved) return;

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setSearchHistory(
          parsed.filter(
            (item): item is string =>
              typeof item === "string"
          )
        );
      }
    } catch (storageError) {
      console.error(
        "Failed to load search history:",
        storageError
      );
    }
  }, []);

  const saveSearchHistory = useCallback(
    (searchKeyword: string) => {
      const normalizedKeyword =
        searchKeyword.trim();

      if (!normalizedKeyword) {
        return;
      }

      setSearchHistory((previous) => {
        const updated = [
          normalizedKeyword,
          ...previous.filter(
            (item) =>
              item !== normalizedKeyword
          ),
        ].slice(0, 10);

        try {
          localStorage.setItem(
            "searchHistory",
            JSON.stringify(updated)
          );
        } catch (storageError) {
          console.error(
            "Failed to save search history:",
            storageError
          );
        }

        return updated;
      });
    },
    []
  );

  /* ==========================================================
     USER / PLAN
     ========================================================== */

  useEffect(() => {
    async function loadUserData() {
      if (!user) return;

      try {
        const response =
          await fetch("/api/me");

        if (!response.ok) {
          throw new Error(
            `Failed to load user: ${response.status}`
          );
        }

        const data =
          await response.json();

        setPlan(
          typeof data.plan === "string"
            ? data.plan
            : "free"
        );

        setDailyUsage(
          typeof data.dailyUsage === "number"
            ? data.dailyUsage
            : 0
        );
      } catch (loadError) {
        console.error(
          "Failed to load user:",
          loadError
        );
      }
    }

    loadUserData();
  }, [user]);

  const refreshUsage = useCallback(
    async () => {
      try {
        const usageResponse =
          await fetch("/api/me");

        if (!usageResponse.ok) {
          return;
        }

        const usageData =
          await usageResponse.json();

        setPlan(
          typeof usageData.plan === "string"
            ? usageData.plan
            : "free"
        );

        setDailyUsage(
          typeof usageData.dailyUsage ===
            "number"
            ? usageData.dailyUsage
            : 0
        );
      } catch (usageError) {
        console.error(
          "Failed to refresh usage:",
          usageError
        );
      }
    },
    []
  );

  /* ==========================================================
     CREATOR WORKSPACE
     ========================================================== */

  const {
    creatorWorkspace,
    setCreatorWorkspace,

    creatorWorkspaceLoading,
    creatorRegenerating,

    generateCreatorWorkspace,

    handleExportCreatorKit,

    regenerateCreatorSection,
  } = useCreatorWorkspace({
    keyword,
    setKeyword,
    language,
    setError,
  });

  /* ==========================================================
     BENCHMARK SEARCH
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
   PROJECT DATA BUILDER
   ========================================================== */

const {
  buildProjectData,
} = useProjectDataBuilder({
  keyword,

  results,
  topVideos,
  channels,
  averageViews,

  report,
  idea,
  strategy,
  competition,
  titles,
  recommendedChannels,

  keywordIntelligence,
  viralPrediction,

  thumbnailAnalysis,
  titleAnalysis,

  seoAnalysis,
  seoOptimizer,

  contentGap,
  channelAudit,
  contentPlanner,
  aiThumbnail,

  opportunities,
  missedOpportunities,

  contentStrategy,
  planner,

  creatorKit,
  creatorWorkspace,

  messages,
});

  /* ==========================================================
     PROJECT MANAGER
     ========================================================== */

  const {
    projects,

    handleSaveProject,
    handleLoadProject,
    handleDeleteProject,

    autoSaveProject,
  } = useProjectManager({
    language,

    keyword,
    results,
    topVideos,
    channels,
    averageViews,

    report,
    idea,
    strategy,
    competition,
    titles,
    recommendedChannels,

    keywordIntelligence,
    viralPrediction,

    thumbnailAnalysis,
    titleAnalysis,

    seoAnalysis,
    seoOptimizer,
    contentGap,
    channelAudit,
    contentPlanner,
    aiThumbnail,
    opportunities,
    missedOpportunities,

    contentStrategy,
    planner,

    creatorKit,
    creatorWorkspace,

    messages,

    setKeyword,
    setResults,
    setTopVideos,
    setChannels,
    setAverageViews,

    setReport,
    setIdea,
    setStrategy,
    setCompetition,
    setTitles,
    setRecommendedChannels,

    setKeywordIntelligence,
    setViralPrediction,

    setThumbnailAnalysis,
    setTitleAnalysis,

    setSeoAnalysis,
    setSeoOptimizer,
    setContentGap,
    setChannelAudit,
    setContentPlanner,
    setAIThumbnail,
    setOpportunities,
    setMissedOpportunities,

    setContentStrategy,
    setPlanner,

    setCreatorKit,
    setCreatorWorkspace,

    setMessages,

    setError,

    buildProjectData,

    onProjectLoaded: () => {
      window.setTimeout(() => {
        summaryRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    },
  });

  /* ==========================================================
   VIRAL PREDICTION
   ========================================================== */

const buildViralPrediction = useCallback(
  (intelligence: typeof keywordIntelligence) => ({
    successProbability:
      intelligence.opportunity,

    expectedViews:
      intelligence.expectedViews,

    expectedCTR:
      intelligence.expectedCTR,

    estimatedRPM:
      intelligence.estimatedRPM,

    estimatedRevenue:
      intelligence.estimatedRevenue,

    competition:
      intelligence.trend,

    recommendation:
      intelligence.recommendation,

    confidence:
      intelligence.confidence,
  }),
  []
);

/* ==========================================================
   BENCHMARK CONTROLLER
   ========================================================== */

const {
  handleSearch,
  runSearchWithNextState,
} = useBenchmarkController({
  keyword,

  order,

  loading,

  language,

  user,

  creatorWorkspace,

  setError,

  setLoading,
  setLoadingStep,
  setLoadingProgress,

  setContentStrategy,
  setMessages,

  setKeyword,
  setAverageViews,
  setResults,
  setTopVideos,
  setChannels,

  setReport,
  setIdea,
  setStrategy,
  setCompetition,
  setTitles,

  setSeoAnalysis,
  setSeoOptimizer,
  setContentGap,
  setChannelAudit,
  setContentPlanner,
  setAIThumbnail,
  setThumbnailPrompt,
  setCreatorKit,
  setRecommendedChannels,
  setOpportunities,

  setKeywordIntelligence,
  setViralPrediction,

  setMissedOpportunities,
  setThumbnailAnalysis,
  setTitleAnalysis,

  setPlanner,
  setCreatorWorkspace,

  runBenchmarkSearch,

  saveSearchHistory,

  refreshUsage,

  buildProjectData,

  autoSaveProject,

  buildViralPrediction,

  onSearchComplete: () => {
    window.setTimeout(() => {
      dashboardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  },
});

  /* ==========================================================
     AI CONTEXT
     ========================================================== */

  const aiContext = useMemo(
    () =>
      JSON.stringify(
        {
          keyword,
          report,
          idea,
          strategy,
          competition,
          titles,
          recommendedChannels,
        },
        null,
        2
      ),
    [
      keyword,
      report,
      idea,
      strategy,
      competition,
      titles,
      recommendedChannels,
    ]
  );

  /* ==========================================================
   BENCHMARK INTELLIGENCE
   ========================================================== */

const {
  opportunityScoreV2,
  trendingScore,
  finalDecision,
} = useBenchmarkIntelligence({
  results,
  keywordIntelligence,
  report,
});

  /* ==========================================================
     SAFE CREATOR WORKSPACE
     ========================================================== */

  const safeCreatorWorkspace =
    creatorWorkspace ?? ({} as any);

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <>
      <Navbar
        language={language}
        setLanguage={setLanguage}
      />

      <main className="min-h-screen bg-gradient-to-b from-[#09090B] via-[#111827] to-[#09090B] p-4 text-white md:p-10">
        {/* ====================================================
            LOADING
        ==================================================== */}

        <LoadingProgress
          loading={loading}
          loadingProgress={
            loadingProgress
          }
          loadingStep={loadingStep}
          language={language}
        />

        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <ErrorCard
            message={error}
            onRetry={() =>
              void handleSearch()
            }
          />
        )}

        {/* ====================================================
            HERO
        ==================================================== */}

        <HeroSectionV2
          keyword={keyword}
          setKeyword={setKeyword}
          order={order}
          setOrder={setOrder}
          min10Minutes={
            min10Minutes
          }
          setMin10Minutes={
            setMin10Minutes
          }
          last30Days={
            last30Days
          }
          setLast30Days={
            setLast30Days
          }
          loading={loading}
          onSearch={() =>
            void handleSearch()
          }
          language={language}
        />

        {/* ====================================================
            ONE CLICK CREATOR
        ==================================================== */}

        <OneClickCreator
          keyword={keyword}
          loading={loading}
          loadingStep={loadingStep}
          onCreate={() =>
            void handleSearch()
          }
        />

        {/* ====================================================
            TRUST
        ==================================================== */}

        <TrustBar />
        {/* ====================================================
    GLOBAL GROWTH HUB
==================================================== */}

<section
  id="growth"
  className="mx-auto mt-16 w-full max-w-7xl"
>
  <div className="rounded-3xl border border-cyan-400/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl md:p-10">

    {/* HEADER */}
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
        AI-POWERED YOUTUBE INTELLIGENCE
      </div>

      <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
        Turn YouTube Data Into Your Next Winning Video.
      </h2>

      <p className="mt-5 text-base leading-7 text-zinc-400 md:text-lg">
        Research the market, discover content opportunities,
        benchmark competitors, make better decisions,
        and turn insights into content with AI.
      </p>
    </div>

    {/* 3 STEP SYSTEM */}
    <div className="mt-10 grid gap-4 md:grid-cols-3">

      <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
        <div className="text-sm font-bold text-cyan-300">
          01 · RESEARCH
        </div>

        <h3 className="mt-3 text-xl font-bold text-white">
          Understand the Market
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Analyze YouTube search data, videos, channels,
          trends, competition, and audience opportunities.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
        <div className="text-sm font-bold text-cyan-300">
          02 · DECIDE
        </div>

        <h3 className="mt-3 text-xl font-bold text-white">
          Find What to Make
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Discover content gaps, opportunity scores,
          competitive advantages, and the best next move.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
        <div className="text-sm font-bold text-cyan-300">
          03 · CREATE
        </div>

        <h3 className="mt-3 text-xl font-bold text-white">
          Turn Insights Into Content
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Generate titles, hooks, scripts, descriptions,
          thumbnails, SEO assets, and a complete creator plan.
        </p>
      </div>

    </div>

    {/* FREE TOOLS */}
    <div className="mt-14">

      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Free Intelligence
        </p>

        <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">
          Start With One Question.
        </h3>

        <p className="mt-3 text-sm text-zinc-400 md:text-base">
          Enter a topic and discover what the market is telling you.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {[
          {
            title: "YouTube Benchmark",
            description:
              "Compare content performance and discover what separates stronger videos.",
          },
          {
            title: "Keyword Intelligence",
            description:
              "Understand demand, difficulty, trends, and opportunity before creating.",
          },
          {
            title: "Content Opportunity",
            description:
              "Find topics and gaps where your next video can compete.",
          },
          {
            title: "Competitor Intelligence",
            description:
              "See what competing channels are publishing and where they leave gaps.",
          },
          {
            title: "Title Intelligence",
            description:
              "Improve your titles using CTR, curiosity, SEO, and audience signals.",
          },
          {
            title: "Creator Workspace",
            description:
              "Turn research into titles, hooks, scripts, thumbnails, and publishing plans.",
          },
        ].map((tool) => (
          <button
            key={tool.title}
            type="button"
            onClick={() => {
              document
                .getElementById("search")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white">
                {tool.title}
              </h4>

              <span className="text-cyan-300 transition group-hover:translate-x-1">
                →
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {tool.description}
            </p>

            <div className="mt-4 text-xs font-semibold text-cyan-300">
              TRY IT FREE
            </div>
          </button>
        ))}

      </div>
    </div>

    {/* FINAL CTA */}
    <div className="mt-12 rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-500/10 p-6 text-center md:p-8">

      <h3 className="text-2xl font-black text-white md:text-3xl">
        Stop Guessing What to Create.
      </h3>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
        Let YouTube data show you where the opportunities are.
      </p>

      <button
        type="button"
        onClick={() => {
          document
            .getElementById("search")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-cyan-400 px-7 py-3 font-bold text-black transition hover:scale-[1.02] hover:bg-cyan-300"
      >
        Analyze for Free →
      </button>

    </div>

  </div>
</section>

        {/* ====================================================
            QUICK NAVIGATION
        ==================================================== */}

        <QuickNavigation />

        {/* ====================================================
            OPPORTUNITY FINDER
        ==================================================== */}

        <OpportunityFinder
          opportunities={
            opportunities
          }
          language={language}
          onSelect={
            handleSearch
          }
          onRefresh={() =>
            void handleSearch()
          }
        />

        {/* ====================================================
            PLAN
        ==================================================== */}

        <PlanCard
          plan={plan}
          dailyUsage={
            dailyUsage
          }
        />

        {/* ====================================================
            SEARCH
        ==================================================== */}

        <section id="search">
          <SearchSection
            keyword={keyword}
            setKeyword={setKeyword}
            order={order}
            setOrder={setOrder}
            onSearch={() =>
              void handleSearch()
            }
            onSaveProject={
              handleSaveProject
            }
            loading={loading}
            language={language}
            min10Minutes={
              min10Minutes
            }
            setMin10Minutes={
              setMin10Minutes
            }
            last30Days={
              last30Days
            }
            setLast30Days={
              setLast30Days
            }
            averageViews={
              averageViews
            }
            results={results}
            report={report}
            idea={idea}
            strategy={strategy}
            competition={
              competition
            }
            titles={titles}
            topVideos={
              topVideos
            }
            thumbnailPrompt={
              thumbnailPrompt
            }
            history={
              searchHistory
            }
            onHistorySelect={(
              historyKeyword
            ) => {
              setKeyword(
                historyKeyword
              );

              void handleSearch(
                order,
                historyKeyword
              );
            }}
            calculateBenchmarkScore={
              calculateBenchmarkScore
            }
            formatDuration={
              formatDuration
            }
          />
        </section>

        {/* ====================================================
            SEARCH FILTERS
        ==================================================== */}

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SearchFilters
            min10Minutes={
              min10Minutes
            }
            setMin10Minutes={
              setMin10Minutes
            }
            last30Days={
              last30Days
            }
            setLast30Days={
              setLast30Days
            }
            order={order}
            setOrder={setOrder}
            runSearchWithNextState={
              runSearchWithNextState
            }
            onDownloadCSV={() =>
              downloadCSV(
                results,
                keyword,
                calculateBenchmarkScore
              )
            }
            onDownloadPDF={() =>
              downloadPDF({
                keyword,
                report,
                idea,
                strategy,
                competition,
                titles,
                recommendedChannels,
              })
            }
            onSaveProject={
              handleSaveProject
            }
            language={language}
          />
        </div>

        {/* ====================================================
            VIDEO ANALYSIS
        ==================================================== */}

        <section id="videos">
          <AnalysisSection
            topVideos={
              topVideos
            }
            results={results}
            channels={
              channels
            }
            keyword={keyword}
            loading={loading}
            language={
              language
            }
            calculateBenchmarkScore={
              calculateBenchmarkScore
            }
            formatDuration={
              formatDuration
            }
          />
        </section>

        {/* ====================================================
            RESEARCH SNAPSHOT
        ==================================================== */}

        {results.length > 0 && (
          <ResearchSnapshot
            keyword={keyword}
            averageViews={
              averageViews
            }
            benchmarkScore={
              report?.score ?? 0
            }
            keywordIntelligence={
              keywordIntelligence
            }
            opportunityScore={
              opportunityScoreV2
            }
            language={language}
          />
        )}

        {/* ====================================================
            INTELLIGENCE
        ==================================================== */}

        <IntelligenceSection
          averageViews={
            averageViews
          }
          keywordDifficulty={
            keywordIntelligence.difficulty
          }
          keywordOpportunity={
            keywordIntelligence.opportunity
          }
          estimatedRPM={
            keywordIntelligence.estimatedRPM
          }
          benchmarkScore={
            report?.score ?? 0
          }
          seoOptimizer={
            seoOptimizer
          }
          thumbnailScore={
            thumbnailAnalysis.overallScore ??
            50
          }
          titleScore={
            titleAnalysis.overallScore ??
            50
          }
          language={language}
        />

        {/* ====================================================
            OPPORTUNITY SCORE
        ==================================================== */}

        <OpportunityScoreCard
          opportunityScoreV2={
            opportunityScoreV2
          }
        />

        {/* ====================================================
            AI DASHBOARD
        ==================================================== */}

        <section
          id="ai"
          ref={dashboardRef}
        >
          {/* ==================================================
              PROJECT SUMMARY
          ================================================== */}

          <div ref={summaryRef}>
            <ProjectSummary
              report={report}
              benchmarkScore={
                report?.score ?? 0
              }
              opportunity={
                keywordIntelligence.opportunity
              }
              opportunityScoreV2={
                opportunityScoreV2.total
              }
              competition={
                viralPrediction.competition
              }
              expectedViews={
                viralPrediction.expectedViews
              }
              uploadTime="7:00 PM"
              titles={titles}
            />

            {/* ================================================
                DECISION ENGINE
            ================================================ */}

            <DecisionEngine
              keyword={keyword}
              decision={
                finalDecision
              }
              opportunityScore={
                opportunityScoreV2.total
              }
              benchmarkScore={
                report?.score ?? 0
              }
              difficulty={
                keywordIntelligence.difficulty
              }
              confidence={
                keywordIntelligence.confidence
              }
              expectedViews={
                viralPrediction.expectedViews
              }
              competition={
                viralPrediction.competition
              }
              language={language}
            />
            <FinalDecisionCard
  score={finalDecision.score}
  decision={finalDecision.decision}
  reasons={finalDecision.reasons}
  action={finalDecision.action}
  language={language}
/>
          </div>

          {/* ==================================================
              CONTENT STRATEGY
          ================================================== */}

          <ContentStrategyCard
            strategy={
              contentStrategy
            }
            language={language}
            decision={
              finalDecision.decision
            }
            onCreateContent={() =>
              void generateCreatorWorkspace(
                keyword
              )
            }
          />

          {/* ==================================================
              AI ANALYSIS
          ================================================== */}

          <AIAnalysisSection
            language={language}
            keyword={keyword}
            finalDecision={
              finalDecision
            }
            keywordIntelligence={
              keywordIntelligence
            }
            viralPrediction={
              viralPrediction
            }
            missedOpportunities={
              missedOpportunities
            }
            thumbnailAnalysis={
              thumbnailAnalysis
            }
            titleAnalysis={
              titleAnalysis
            }
            seoAnalysis={
              seoAnalysis
            }
            seoOptimizer={
              seoOptimizer
            }
            contentGap={
              contentGap
            }
            channelAudit={
              channelAudit
            }
            contentPlanner={
              contentPlanner
            }
            aiThumbnail={
              aiThumbnail
            }
          />

          {/* ==================================================
              GROWTH PLAN
          ================================================== */}

          <GrowthPlanCard
            keyword={keyword}
            benchmarkScore={
              report?.score ?? 0
            }
            opportunityScore={
              opportunityScoreV2.total
            }
            thumbnailScore={
              thumbnailAnalysis.overallScore ??
              50
            }
            titleScore={
              titleAnalysis.overallScore ??
              50
            }
            seoScore={
              seoAnalysis?.overallScore ??
              50
            }
            contentGap={
              contentGap.length
            }
            expectedViews={
              viralPrediction.expectedViews
            }
            language={language}
          />

          {/* ==================================================
              AI RESULTS
          ================================================== */}

          <AIResultsSection
            report={report}
            idea={idea}
            strategy={strategy}
            competition={
              competition
            }
            titles={titles}
            thumbnailPrompt={
              thumbnailPrompt
            }
            creatorKit={
              creatorKit
            }
            language={language}
            aiContext={
              aiContext
            }
            messages={
              messages
            }
            setMessages={
              setMessages
            }
            benchmarkScore={
              report?.score ?? 0
            }
            opportunityScore={
              opportunityScoreV2.total
            }
            trendingScore={
              trendingScore
            }
          />

          {/* ==================================================
              CREATOR WORKSPACE
          ================================================== */}

          <CreatorWorkspace
            keyword={keyword}
            language={language}
            titles={
              safeCreatorWorkspace.titles
            }
            hook={
              safeCreatorWorkspace.hook
            }
            script={
              safeCreatorWorkspace.script
            }
            description={
              safeCreatorWorkspace.description
            }
            hashtags={
              safeCreatorWorkspace.hashtags
            }
            thumbnailPrompt={
              safeCreatorWorkspace.thumbnailPrompt
            }
            uploadStrategy={
              safeCreatorWorkspace.uploadStrategy
            }
            uploadTime={
              safeCreatorWorkspace.uploadTime
            }
            targetAudience={
              safeCreatorWorkspace.targetAudience
            }
            seoKeywords={
              safeCreatorWorkspace.seoKeywords
            }
            pinnedComment={
              safeCreatorWorkspace.pinnedComment
            }
            communityPost={
              safeCreatorWorkspace.communityPost
            }
            viralScore={
              safeCreatorWorkspace.viralScore
            }
            callToAction={
              safeCreatorWorkspace.callToAction
            }
            shortsScript={
              safeCreatorWorkspace.shortsScript
            }
            instagramCaption={
              safeCreatorWorkspace.instagramCaption
            }
            twitterPost={
              safeCreatorWorkspace.twitterPost
            }
            onGenerate={() =>
              void generateCreatorWorkspace(
                keyword
              )
            }
            onExport={
              handleExportCreatorKit
            }
            onRegenerate={
              regenerateCreatorSection
            }
            regeneratingSection={
              creatorRegenerating
            }
            loading={
              creatorWorkspaceLoading
            }
          />

          {/* ==================================================
              PLANNER
          ================================================== */}

          <PlannerCalendar
            planner={planner}
          />
        </section>

        {/* ====================================================
            PROJECTS
        ==================================================== */}

        <section id="projects">
          <ProjectList
            projects={projects}
            onLoad={
              handleLoadProject
            }
            onDelete={
              handleDeleteProject
            }
            language={language}
          />
        </section>
      </main>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer
        language={language}
      />
    </>
  );
}