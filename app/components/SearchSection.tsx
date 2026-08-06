import SearchSummary from "./SearchSummary";
import Dashboard from "./Dashboard";
import QuickStats from "./QuickStats";
import RecentSearches from "./RecentSearches";
import KeywordSuggestionsCard from "./KeywordSuggestionsCard";


import {
  Video,
  BenchmarkReport,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
  ThumbnailPlan,
} from "../lib/types";

type Props = {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;


  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;

  onSearch: () => void;

  loading: boolean;
  language: string;
  min10Minutes: boolean;
setMin10Minutes: React.Dispatch<React.SetStateAction<boolean>>;

last30Days: boolean;
setLast30Days: React.Dispatch<React.SetStateAction<boolean>>;

  averageViews: number;

  results: Video[];

  report: BenchmarkReport | null;
  idea: ContentIdea[];
  strategy: Strategy[];
  competition: CompetitionAnalysis | null;
  titles: TitleSuggestion[];

  topVideos: Video[];

  thumbnailPrompt: ThumbnailPlan[];

  history: string[];

  onHistorySelect: (keyword: string) => void;

  calculateBenchmarkScore: (video: Video) => number;
  formatDuration: (duration: string) => string;
};

export default function SearchSection({
  keyword,
  loading,
averageViews,
  results,
  report,
  idea,
  strategy,
  competition,
  titles,
  topVideos,
  thumbnailPrompt,
  history,
  onHistorySelect,
  calculateBenchmarkScore,
  formatDuration,
  language,
}: Props) {
  return (
    <>
      <SearchSummary
  keyword={keyword}
  language={language}
/>



<section id="dashboard">
<Dashboard
  keyword={keyword}
  averageViews={averageViews}
  videoCount={results.length}
  videos={results}
  language={language}
/>
</section>

{results.length > 0 && !loading && (
  <div className="mt-6 rounded-xl border border-zinc-700 bg-white/5 backdrop-blur-xl p-4">
    <div className="flex flex-wrap gap-6 text-sm">
      <span>🔎 <strong>{keyword}</strong></span>
      <span>
  🎥{" "}
  {language === "ko"
    ? `${results.length}개 영상 분석`
    : `${results.length} videos analyzed`}
</span>
      <span>
  👀{" "}
  {language === "ko"
    ? `평균 조회수 ${averageViews.toLocaleString()}`
    : `Average Views ${averageViews.toLocaleString()}`}
</span>
    </div>
  </div>
)}

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
  language={language}
/>

<RecentSearches
  history={history}
  onSelect={onHistorySelect}
  language={language}
/>
<KeywordSuggestionsCard
  keyword={keyword}
  onSelect={onHistorySelect}
  language={language}
/>
    </>
  );
}