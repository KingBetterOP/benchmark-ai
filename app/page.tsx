"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { downloadCSV } from "./lib/downloadCSV";
import { downloadPDF } from "./lib/downloadPDF";
import { useUser } from "@clerk/nextjs";
import { validateSearch } from "./hooks/searchValidation";
import { useBenchmarkState } from "./hooks/useBenchmarkState";
import { calculateOpportunityScore } from "./lib/opportunityScore";
import { calculateTrendingScore } from "./lib/trendingScore";
import { useAIAnalysis } from "./hooks/useAIAnalysis";
import { useBenchmarkSearch } from "./hooks/useBenchmarkSearch";
import { calculateFinalDecision } from "./lib/finalDecision";
import {
  saveProject,
  getProjects,
  deleteProject,
  SavedProject,
} from "./lib/projectStorage";
import {
  formatDuration,
  calculateBenchmarkScore,
} from "./lib/videoUtils";
import {
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
} from "./lib/types";
import SearchBar from "./components/SearchBar";
import TopVideos from "./components/TopVideos";
import ChannelAnalysis from "./components/ChannelAnalysis";
import QuickStats from "./components/QuickStats";
import SearchFilters from "./components/SearchFilters";
import ProjectList from "./components/ProjectList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import BestVideoCard from "./components/BestVideoCard";
import AIChat from "./components/AIChat";
import BenchmarkReportCard from "./components/BenchmarkReportCard";
import ContentIdeasCard from "./components/ContentIdeasCard";
import GrowthStrategyCard from "./components/GrowthStrategyCard";
import CompetitionCard from "./components/CompetitionCard";
import TitleGeneratorCard from "./components/TitleGeneratorCard";
import ThumbnailPlanCard from "./components/ThumbnailPlanCard";
import AnalyticsCharts from "./components/AnalyticsCharts";
import OpportunityFinder from "./components/OpportunityFinder";
import LoadingProgress from "./components/LoadingProgress";
import { executeBenchmarkSearch } from "./hooks/useSearch";
import RecentSearches from "./components/RecentSearches";
import VideoGrid from "./components/VideoGrid";
import HeroSectionV2 from "./components/HeroSectionV2";
import PlanCard from "./components/PlanCard";
import SearchSummary from "./components/SearchSummary";
import AIResultsSection from "./components/AIResultsSection";
import SearchSection from "./components/SearchSection";
import AnalysisSection from "./components/AnalysisSection";
import QuickNavigation from "./components/QuickNavigation";
import KeywordSuggestionsCard from "./components/KeywordSuggestionsCard";
import AIScriptGeneratorCard from "./components/AIScriptGeneratorCard";
import AICreatorToolkit from "./components/AICreatorToolkit";
import CreatorKitCard from "./components/CreatorKitCard";
import ErrorCard from "./components/ErrorCard";
import TrustBar from "./components/TrustBar";
import KeywordIntelligenceSection from "./components/keyword/KeywordIntelligenceSection";
import CompetitorIntelligenceSection from "./components/competitor/CompetitorIntelligenceSection";
import SEOIntelligenceSection from "./components/seo/SEOIntelligenceSection";
import CTRIntelligenceSection from "./components/ctr/CTRIntelligenceSection";
import RevenueIntelligenceSection from "./components/revenue/RevenueIntelligenceSection";
import IntelligenceSection from "./components/sections/IntelligenceSection";
import AIAnalysisSection from "./components/sections/AIAnalysisSection";



import {
  startLoading,
  finishLoading,
} from "./hooks/loadingState";

export default function Home() {
  const router = useRouter();
 const { user, isLoaded, isSignedIn } = useUser();


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

const [strategy, setStrategy] =
  useState<Strategy[]>([]);

const [competition, setCompetition] =
  useState<CompetitionAnalysis | null>(null);

const [titles, setTitles] =
  useState<TitleSuggestion[]>([]);

const [topVideos, setTopVideos] = useState<Video[]>([]);

const [channels, setChannels] = useState<Channel[]>([]);

const [thumbnailPrompt, setThumbnailPrompt] =
  useState<ThumbnailPlan[]>([]);
  const [opportunities, setOpportunities] =
  useState<Opportunity[]>([]);

const [recommendedChannels, setRecommendedChannels] =
  useState("");

const [loading, setLoading] = useState(false);
const {
  keywordIntelligence,
  setKeywordIntelligence,

  missedOpportunities,
  setMissedOpportunities,

  thumbnailAnalysis,
  setThumbnailAnalysis,
} = useAIAnalysis();

const [titleAnalysis, setTitleAnalysis] =
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
  useState({
    successProbability: 0,
    expectedViews: "-",
    expectedCTR: "-",
    estimatedRPM: "-",
    estimatedRevenue: "-",
    competition: "-",
    recommendation: "-",
    confidence: 0,
  });

const [error, setError] = useState("");
  const [loadingStep, setLoadingStep] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [order, setOrder] = useState("relevance");
  const [excludeShorts, setExcludeShorts] = useState(false);
  const [min10Minutes, setMin10Minutes] = useState(false);
  const [last30Days, setLast30Days] = useState(false);
  const [language, setLanguage] = useState("en");
const [searchHistory, setSearchHistory] =
  useState<string[]>([]);
  useEffect(() => {
  const saved = localStorage.getItem("searchHistory");

  if (saved) {
    setSearchHistory(JSON.parse(saved));
  }
}, []);
useEffect(() => {
  const saved = localStorage.getItem("language");

  if (saved) {
    setLanguage(saved);
  }
}, []);
useEffect(() => {
  localStorage.setItem("language", language);
}, [language]);
const [projects, setProjects] = useState<SavedProject[]>([]);
const [messages, setMessages] = useState<
  {
    role: "user" | "assistant";
    content: string;
  }[]
>([]);
const [plan, setPlan] = useState("free");
const [dailyUsage, setDailyUsage] = useState(0);


useEffect(() => {
  async function loadProjects() {
    if (!user) return;

    const data = await getProjects();
    setProjects(data);
  }

  loadProjects();
}, [user]);
useEffect(() => {
  async function loadUser() {
    if (!user) return;

    const res = await fetch("/api/me");
    const data = await res.json();

    setPlan(data.plan);
    setDailyUsage(data.dailyUsage);
  }

  loadUser();
}, [user]);


const refreshUsage = async () => {
  await fetch("/api/usage", {
    method: "POST",
  });

  const usageRes = await fetch("/api/me");
  const usageData = await usageRes.json();

  setPlan(usageData.plan);
  setDailyUsage(usageData.dailyUsage);
};
const applyProcessedResults = (processed: {
  averageViews: number;
  results: Video[];
  topVideos: Video[];
  channels: Channel[];
}) => {
  setAverageViews(processed.averageViews);
  setResults(processed.results);
  setTopVideos(processed.topVideos);
  setChannels(processed.channels);
};
const applyAIResults = (ai: {
  report: BenchmarkReport | null;
  idea: ContentIdea[];
  strategy: Strategy[];
  competition: CompetitionAnalysis | null;
  titles: TitleSuggestion[];
  seo: SEOAnalysis;
  seoOptimizer: SEOOptimizer | null;
  contentGap: ContentGap[];
  channelAudit: ChannelAudit | null;
  contentPlanner: ContentPlanner[];
  aiThumbnail: AIThumbnail[];
  thumbnail: ThumbnailPlan[];
  creatorKit: CreatorKit | null;
  recommendedChannels: string;
  opportunities: Opportunity[];
}) => {
  setReport(ai.report);
  setIdea(ai.idea);
  setStrategy(ai.strategy);
  setCompetition(ai.competition);
  setTitles(ai.titles);
  setSeoAnalysis(ai.seo);
setSeoOptimizer(ai.seoOptimizer);
setContentGap(ai.contentGap);
setChannelAudit(ai.channelAudit);
setContentPlanner(ai.contentPlanner);
setAIThumbnail(ai.aiThumbnail);
setThumbnailPrompt(ai.thumbnail);
  setCreatorKit(ai.creatorKit);
  setRecommendedChannels(ai.recommendedChannels);
  setOpportunities(ai.opportunities);
};
const applySearchResults = async (
  processed: {
    averageViews: number;
    results: Video[];
    topVideos: Video[];
    channels: Channel[];
  },
  ai: {
    report: BenchmarkReport | null;
    idea: ContentIdea[];
    strategy: Strategy[];
    competition: CompetitionAnalysis | null;
    titles: TitleSuggestion[];
    seo: SEOAnalysis;
    seoOptimizer: SEOOptimizer | null;
contentGap: ContentGap[];
channelAudit: ChannelAudit | null;
contentPlanner: ContentPlanner[];
aiThumbnail: AIThumbnail[];
thumbnail: ThumbnailPlan[];
    creatorKit: CreatorKit | null;
    recommendedChannels: string;
    opportunities: Opportunity[];

  }
) => {
  applyProcessedResults(processed);

  await refreshUsage();

  applyAIResults(ai);
};
const handleSearch = async (
  searchOrder = order,
  searchKeyword = keyword
) => {
  const canSearch = validateSearch({
    keyword: searchKeyword,
    user,
    router,
  });

  if (!canSearch) return;

  try {
    setError("");
    startLoading({
  setLoading,
  setLoadingStep,
  setLoadingProgress,
});

setMessages([]);
setLoadingStep(
  language === "ko"
    ? "🔍 YouTube 데이터를 가져오는 중..."
    : "🔍 Fetching YouTube data..."
);
const { processed, ai } =
  await executeBenchmarkSearch({
    keyword: searchKeyword,
    order: searchOrder,
    language,
    excludeShorts,
    min10Minutes,
    last30Days,
    onStep: setLoadingStep,
    onProgress: setLoadingProgress,
  });

setKeywordIntelligence(ai.keywordIntelligence);

setViralPrediction({
  successProbability: ai.keywordIntelligence.opportunity,

  expectedViews: ai.keywordIntelligence.expectedViews,

  expectedCTR: ai.keywordIntelligence.expectedCTR,

  estimatedRPM: ai.keywordIntelligence.estimatedRPM,

  estimatedRevenue: ai.keywordIntelligence.estimatedRevenue,

  competition: ai.keywordIntelligence.trend,

  recommendation: ai.keywordIntelligence.recommendation,

  confidence: ai.keywordIntelligence.confidence,
});
const missedRes = await fetch(
  "/api/ai/missed-opportunities",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keyword: searchKeyword,
      videos: processed.results,
    }),
  }
);

const missedData = await missedRes.json();

setMissedOpportunities(
  missedData.opportunities
);
const thumbnailRes = await fetch(
  "/api/ai/thumbnail-analyzer",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title:
        ai.titles?.[0]?.title ??
        keyword,
      thumbnailPrompt:
        ai.thumbnail?.[0]?.prompt ??
        "",
    }),
  }
);

const thumbnailData =
  await thumbnailRes.json();

setThumbnailAnalysis(
  thumbnailData
);
const titleRes = await fetch(
  "/api/ai/title-analyzer",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title:
        ai.titles?.[0]?.title ??
        keyword,
    }),
  }
);

const titleData = await titleRes.json();

setTitleAnalysis(titleData);


await applySearchResults(processed, ai);
} catch (error) {
  console.error(error);

  if (
    error instanceof Error &&
    error.message === "UPGRADE_REQUIRED"
  ) {
    router.push("/pricing");
    return;
  }

  setError(
  language === "ko"
    ? "키워드를 분석하는 중 오류가 발생했습니다. 다시 시도해주세요."
    : "Something went wrong while analyzing this keyword. Please try again."
);
} finally {
  finishLoading({
    setLoading,
    setLoadingStep,
  });
}



  };
  const runSearchWithNextState = (
  callback: () => void
) => {
  callback();

  setTimeout(() => {
    handleSearch(order, keyword);
  }, 0);
};
const reloadProjects = async () => {
  const updated = await getProjects();
  setProjects(updated);
};
const handleSaveProject = async () => {
  if (!user) {
    alert(
  language === "ko"
    ? "로그인이 필요합니다."
    : "Please sign in."
);
    return;
  }

  try {
    const projectData = {
  createdAt: Date.now(),
  keyword,
  report,
  idea,
  strategy,
  competition,
  titles,
  recommendedChannels,
  chatMessages: messages,
};

await saveProject(projectData);

    await reloadProjects();

    alert(
  language === "ko"
    ? "프로젝트가 저장되었습니다."
    : "Project saved."
);
  } catch (error) {
    console.error(error);
    alert(
  language === "ko"
    ? "저장 실패"
    : "Failed to save project."
);
  }
};
const handleLoadProject = (project: SavedProject) => {
  setKeyword(project.keyword);
  setReport(project.report);
  setIdea(project.idea);
  setStrategy(project.strategy);
  setCompetition(project.competition);
  setTitles(project.titles);
  setRecommendedChannels(project.recommendedChannels);
  setMessages(project.chatMessages ?? []);
};
const handleDeleteProject = async (id: string) => {
  if (!user) return;

  await deleteProject(id);

  await reloadProjects();
};
const aiContext = useMemo(
  () =>
    JSON.stringify(
      {
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
    report,
    idea,
    strategy,
    competition,
    titles,
    recommendedChannels,
  ]
);
const finalDecision = calculateFinalDecision({
  opportunity: keywordIntelligence.opportunity,
  difficulty: keywordIntelligence.difficulty,
  confidence: keywordIntelligence.confidence,
  benchmarkScore: report?.score ?? 0,
});
  return (
    <>
    <Navbar
  language={language}
  setLanguage={setLanguage}
/>
    <main className="min-h-screen bg-gradient-to-b from-[#09090B] via-[#111827] to-[#09090B] text-white p-4 md:p-10">
     <LoadingProgress
  loading={loading}
  loadingProgress={loadingProgress}
  loadingStep={loadingStep}
  language={language}
/>
{error && (
  <ErrorCard
    message={error}
    onRetry={() => handleSearch()}
  />
)}
<HeroSectionV2
  keyword={keyword}
  setKeyword={setKeyword}
  order={order}
  setOrder={setOrder}
  min10Minutes={min10Minutes}
  setMin10Minutes={setMin10Minutes}
  last30Days={last30Days}
  setLast30Days={setLast30Days}
  loading={loading}
  onSearch={() => handleSearch()}
  language={language}
/>
<TrustBar />
<QuickNavigation />

<OpportunityFinder
  opportunities={opportunities}
  language={language}
  onSelect={handleSearch}
  onRefresh={() => handleSearch()}
/>
  
 <PlanCard
  plan={plan}
  dailyUsage={dailyUsage}
/>
<section id="search">
  <SearchSection
  keyword={keyword}
  setKeyword={setKeyword}
  order={order}
  setOrder={setOrder}
  onSearch={() => handleSearch()}
  loading={loading}
  language={language}
  min10Minutes={min10Minutes}
  setMin10Minutes={setMin10Minutes}
  last30Days={last30Days}
  setLast30Days={setLast30Days}
  averageViews={averageViews}
  results={results}
  report={report}
  idea={idea}
  strategy={strategy}
  competition={competition}
  titles={titles}
  topVideos={topVideos}
  thumbnailPrompt={thumbnailPrompt}
  history={searchHistory}
  onHistorySelect={(item) => {
    setKeyword(item);
    handleSearch(order, item);
  }}
  calculateBenchmarkScore={calculateBenchmarkScore}
  formatDuration={formatDuration}
/>
</section>


<div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
       <SearchFilters
  min10Minutes={min10Minutes}
  setMin10Minutes={setMin10Minutes}
  last30Days={last30Days}
  setLast30Days={setLast30Days}
  order={order}
  setOrder={setOrder}
  runSearchWithNextState={runSearchWithNextState}
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
onSaveProject={handleSaveProject}
language={language}
/>

      </div>
      <section id="videos">
  <AnalysisSection
    topVideos={topVideos}
    results={results}
    channels={channels}
    keyword={keyword}
    loading={loading}
    language={language}
    calculateBenchmarkScore={calculateBenchmarkScore}
    formatDuration={formatDuration}
  />
</section>
<IntelligenceSection
  averageViews={averageViews}
  keywordDifficulty={keywordIntelligence.difficulty}
  keywordOpportunity={keywordIntelligence.opportunity}
  estimatedRPM={keywordIntelligence.estimatedRPM}
  benchmarkScore={report?.score ?? 0}
  seoOptimizer={seoOptimizer}
  thumbnailScore={thumbnailAnalysis.overallScore ?? 50}
  titleScore={titleAnalysis.overallScore ?? 50}
  language={language}
/>
<section id="ai">

<AIAnalysisSection
  language={language}
  keyword={keyword}
  finalDecision={finalDecision}
  keywordIntelligence={keywordIntelligence}
  viralPrediction={viralPrediction}
  missedOpportunities={missedOpportunities}
  thumbnailAnalysis={thumbnailAnalysis}
  titleAnalysis={titleAnalysis}
  seoAnalysis={seoAnalysis}
  seoOptimizer={seoOptimizer}
  contentGap={contentGap}
  channelAudit={channelAudit}
  contentPlanner={contentPlanner}
  aiThumbnail={aiThumbnail}
/>
<AIResultsSection
  report={report}
  idea={idea}
  strategy={strategy}
  competition={competition}
  titles={titles}
  thumbnailPrompt={thumbnailPrompt}
  creatorKit={creatorKit}
  language={language}
  aiContext={aiContext}
  messages={messages}
  setMessages={setMessages}
  benchmarkScore={report?.score ?? 0}
  opportunityScore={calculateOpportunityScore(results).score}
  trendingScore={calculateTrendingScore(results)}
/>
  <div className="mt-10">
  <CreatorKitCard
    keyword={keyword}
    language={language}
  />
</div>
  <AICreatorToolkit
  keyword={keyword}
  language={language}
/>
</section>
<AIScriptGeneratorCard
  keyword={keyword}
  language={language}
/>

<section id="projects">
  <ProjectList
  projects={projects}
  onLoad={handleLoadProject}
  onDelete={handleDeleteProject}
  language={language}
/>
</section>
    </main>
    <Footer
  language={language}
/>
    </>
  );
}