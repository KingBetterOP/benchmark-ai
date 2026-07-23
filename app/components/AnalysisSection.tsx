import TopVideos from "./TopVideos";
import BestVideoCard from "./BestVideoCard";
import AnalyticsCharts from "./AnalyticsCharts";
import VideoGrid from "./VideoGrid";
import ChannelAnalysis from "./ChannelAnalysis";

import { Video, Channel } from "../lib/types";

type Props = {
  topVideos: Video[];
  results: Video[];
  channels: Channel[];
  keyword: string;
  loading: boolean;

  calculateBenchmarkScore: (video: Video) => number;
  formatDuration: (duration: string) => string;
};

export default function AnalysisSection({
  topVideos,
  results,
  channels,
  keyword,
  loading,
  calculateBenchmarkScore,
  formatDuration,
}: Props) {
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

      <VideoGrid videos={results} />

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
    </>
  );
}