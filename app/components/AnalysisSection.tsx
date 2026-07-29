import TopVideos from "./TopVideos";
import BestVideoCard from "./BestVideoCard";
import AnalyticsCharts from "./AnalyticsCharts";
import VideoGrid from "./VideoGrid";
import ChannelAnalysis from "./ChannelAnalysis";

import { Video, Channel } from "../lib/types";
import { translations } from "../lib/translations";

type Props = {
  topVideos: Video[];
  results: Video[];
  channels: Channel[];
  keyword: string;
  loading: boolean;
  language: string;

  calculateBenchmarkScore: (video: Video) => number;
  formatDuration: (duration: string) => string;
};

export default function AnalysisSection({
  topVideos,
  results,
  channels,
  keyword,
  loading,
  language,
  calculateBenchmarkScore,
  formatDuration,
}: Props) {
const t =
  translations[language as keyof typeof translations];

return (
  
    <>
      {topVideos.length > 0 && (
        <>
          <TopVideos
            topVideos={topVideos}
            calculateBenchmarkScore={calculateBenchmarkScore}
            formatDuration={formatDuration}
          />

          <BestVideoCard video={topVideos[0]} />

          <AnalyticsCharts videos={results} />
        </>
      )}

      <VideoGrid videos={results} 
  language={language}
/>

      {!loading && keyword && results.length === 0 && (
        <div className="mt-8 rounded-xl border border-yellow-500 bg-zinc-900 p-8 text-center">
          <h2 className="text-2xl font-bold">
            {t.noResultsTitle}
          </h2>

          <p className="mt-4 text-gray-400">
            {t.noResultsDescription}
          </p>

          <ul className="mt-6 space-y-2 text-left inline-block">
            <li>{t.tipKeyword}</li>
<li>{t.tipDuration}</li>
<li>{t.tipRecent}</li>
<li>{t.tipShorts}</li>
          </ul>
        </div>
      )}

      <ChannelAnalysis channels={channels} />
    </>
  );
}