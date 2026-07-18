"use client";

import { useEffect, useState } from "react";
import { generateAllAI } from "./lib/ai";
import { searchYoutube } from "./lib/search";
import { downloadCSV } from "./lib/downloadCSV";
import { downloadPDF } from "./lib/downloadPDF";
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
import { Video, Channel } from "./lib/types";
import { processVideos } from "./lib/processVideos";
import {
  createBenchmarkPrompt,
  createIdeaPrompt,
  createStrategyPrompt,
  createCompetitionPrompt,
  createTitlePrompt,
  createRecommendedChannelsPrompt,
} from "./lib/prompts";
import SearchBar from "./components/SearchBar";
import VideoCard from "./components/VideoCard";
import TopVideos from "./components/TopVideos";
import ThumbnailAnalysis from "./components/ThumbnailAnalysis";
import ChannelAnalysis from "./components/ChannelAnalysis";
import QuickStats from "./components/QuickStats";
import SearchFilters from "./components/SearchFilters";
import ProjectList from "./components/ProjectList";



export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Video[]>([]);
  const [averageViews, setAverageViews] = useState(0);
  const [report, setReport] = useState("");
  const [idea, setIdea] = useState("");
  const [strategy, setStrategy] = useState("");
  const [competition, setCompetition] = useState("");
  const [titles, setTitles] = useState("");
  const [topVideos, setTopVideos] = useState<Video[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [thumbnailPrompt, setThumbnailPrompt] = useState("");
  const [recommendedChannels, setRecommendedChannels] =
  useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [order, setOrder] = useState("relevance");
  const [excludeShorts, setExcludeShorts] = useState(false);
  const [min10Minutes, setMin10Minutes] = useState(false);
  const [last30Days, setLast30Days] = useState(false);
const [searchHistory, setSearchHistory] = useState<string[]>([]);
const [projects, setProjects] = useState<SavedProject[]>([]);
useEffect(() => {
  const savedHistory = localStorage.getItem("searchHistory");

  if (savedHistory) {
    setSearchHistory(JSON.parse(savedHistory));
  }
  setProjects(getProjects());
}, []);
  const handleSearch = async (
  searchOrder = order,
  searchKeyword = keyword
) => {
   if (!searchKeyword.trim()) return;
   try {
    setLoading(true);
setLoadingStep("🔍 YouTube 검색 중...");
setSearchHistory((prev) => {
  const history = [
  searchKeyword,
  ...prev.filter((item) => item !== searchKeyword),
].slice(0, 10);

  localStorage.setItem(
    "searchHistory",
    JSON.stringify(history)
  );

  return history;
});
setLoadingStep("🔍 YouTube 데이터를 가져오는 중...");
const data = await searchYoutube({
  keyword: searchKeyword,
  order: searchOrder,
  last30Days,
});



if (!data.items) {
  throw new Error("YouTube API 응답 오류");
}


setLoadingStep("📊 검색 결과 분석 중...");
const processed = processVideos(
  data.items || [],
  excludeShorts,
  min10Minutes
);

console.log("processed =", processed);

setAverageViews(processed.averageViews);
setResults(processed.results);
setTopVideos(processed.topVideos);
setChannels(processed.channels);

const prompt = createBenchmarkPrompt(
  searchKeyword,
  processed.topVideos
);

const ideaPrompt =
  createIdeaPrompt(searchKeyword);

const strategyPrompt =
  createStrategyPrompt(searchKeyword);

const competitionPrompt =
  createCompetitionPrompt(searchKeyword);

const titlePrompt =
  createTitlePrompt(searchKeyword);

const recommendedChannelsPrompt =
  createRecommendedChannelsPrompt(
  searchKeyword,
  processed.channels
);
setLoadingStep("🤖 AI가 분석 중...");
console.log("generateAllAI 호출 직전");
const ai = await generateAllAI({
  reportPrompt: prompt,
  ideaPrompt,
  strategyPrompt,
  competitionPrompt,
  titlePrompt,
  thumbnailPrompt: searchKeyword,
  recommendedChannelsPrompt,
});
setLoadingStep("✅ 결과를 정리하는 중...");
setReport(ai.report);
setIdea(ai.idea);
setStrategy(ai.strategy);
setCompetition(ai.competition);
setTitles(ai.titles);
setThumbnailPrompt(ai.thumbnail);
setRecommendedChannels(ai.recommendedChannels);
} catch (error) {
  console.error(error);

  alert("❌ 분석 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.");
} finally {
  setLoading(false);
  setLoadingStep("");
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

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-10">
      <h1 className="text-3xl md:text-5xl font-bold text-center">
        🚀 Benchmark AI
      </h1>

      <p className="mt-4 text-center text-sm md:text-base text-gray-400">
        YouTube AI Research Platform
      </p>
      
{loading && (
  <div className="mt-8 rounded-xl border border-blue-500 bg-zinc-900 p-6 text-center">
    <div className="text-2xl font-bold animate-pulse">
      {loadingStep}
    </div>

    <p className="mt-3 text-gray-400">
      잠시만 기다려주세요. AI가 벤치마킹 데이터를 분석하고 있습니다.
    </p>
  </div>
)}
      <SearchBar
  keyword={keyword}
  setKeyword={setKeyword}
  order={order}
  setOrder={setOrder}
  onSearch={() => handleSearch()}
/>
<QuickStats
  results={results}
  averageViews={averageViews}
  loading={loading}
  report={report}
  idea={idea}
  strategy={strategy}
  competition={competition}
  titles={titles}
  topVideos={topVideos}
  thumbnailPrompt={thumbnailPrompt}
  calculateBenchmarkScore={calculateBenchmarkScore}
  formatDuration={formatDuration}
/>
{results.length > 0 && !loading && (
  <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
    <div className="flex flex-wrap gap-6 text-sm">
      <span>🔎 <strong>{keyword}</strong></span>
      <span>🎥 {results.length}개 영상 분석</span>
      <span>👀 평균 조회수 {averageViews.toLocaleString()}</span>
    </div>
  </div>
)}
{searchHistory.length > 0 && (
  <div className="mt-6">
    <h2 className="mb-3 text-xl font-bold">
      🕒 최근 검색
    </h2>

    <div className="flex flex-wrap gap-2">
      {searchHistory.map((item) => (
        <button
          key={item}
         onClick={() => {
  setKeyword(item);
  handleSearch(order, item);
}}
          className="rounded-lg border border-gray-700 px-3 py-2 hover:bg-zinc-800"
        >
          {item}
        </button>
      ))}
    </div>
  </div>
)}
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
onSaveProject={() => {
  if (!keyword) {
    alert("먼저 검색을 해주세요.");
    return;
  }

  
  saveProject({
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    keyword,
    report,
    idea,
    strategy,
    competition,
    titles,
    recommendedChannels,
  });
setProjects(getProjects());
  alert("프로젝트가 저장되었습니다.");
}}
/>

      </div>
      <ProjectList
  projects={projects}
  onLoad={(project) => {
    setKeyword(project.keyword);
    setReport(project.report);
    setIdea(project.idea);
    setStrategy(project.strategy);
    setCompetition(project.competition);
    setTitles(project.titles);
    setRecommendedChannels(project.recommendedChannels);
  }}
  onDelete={(id) => {
    deleteProject(id);
    setProjects(getProjects());
  }}
/>
{topVideos.length > 0 && (
  <TopVideos
    topVideos={topVideos}
    calculateBenchmarkScore={calculateBenchmarkScore}
    formatDuration={formatDuration}
  />
)}

<div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
  {results.map((video: Video) => (
    <div key={video.id}>
      <VideoCard
        video={video}
        score={calculateBenchmarkScore(video)}
      />

      <ThumbnailAnalysis
        thumbnail={video.snippet.thumbnails.high.url}
      />
    </div>
  ))}
</div>
{!loading && keyword && results.length === 0 && (
  <div className="mt-8 rounded-xl border border-yellow-500 bg-zinc-900 p-8 text-center">
    <h2 className="text-2xl font-bold">
      😥 검색 결과가 없습니다.
    </h2>

    <p className="mt-4 text-gray-400">
      아래 방법을 시도해 보세요.
    </p>

    <ul className="mt-6 space-y-2 text-left inline-block">
      <li>✔ 다른 키워드로 검색하기</li>
      <li>✔ "10분 이상" 필터 끄기</li>
      <li>✔ "최근 30일" 필터 끄기</li>
      <li>✔ Shorts 제외 옵션 확인하기</li>
    </ul>
  </div>
)}
      <ChannelAnalysis channels={channels} />
      {recommendedChannels && (
  <div className="mt-8 rounded-xl border border-yellow-500 bg-zinc-900 p-6">
    <h2 className="mb-4 text-2xl font-bold">
      🤖 AI 추천 벤치마킹 채널 TOP3
    </h2>

    <pre className="whitespace-pre-wrap text-gray-300">
      {recommendedChannels}
    </pre>
  </div>
)}
    </main>
  );
}