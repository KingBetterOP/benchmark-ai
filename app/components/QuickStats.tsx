import TopVideos from "./TopVideos";
import { Video, ThumbnailPlan } from "../lib/types";
import ThumbnailGenerator from "./ThumbnailGenerator";
type Props = {
  results: Video[];
  averageViews: number;
  loading: boolean;
  report: unknown;
idea: unknown;
strategy: unknown;
competition: unknown;
titles: unknown;
thumbnailPrompt: ThumbnailPlan[];
  topVideos: Video[];
  calculateBenchmarkScore: (video: Video) => number;
  formatDuration: (duration: string) => string;
};

export default function QuickStats({
  results,
  averageViews,
  loading,
  topVideos,
  thumbnailPrompt,
  calculateBenchmarkScore,
  formatDuration,
}: Props) {
    
  return (
    <div className="mt-8 rounded-xl border border-gray-700 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold">🧠 AI Quick Stats</h2>

      <p className="mt-3">
        검색 결과 : {results.length}개
      </p>

      <p>
        평균 조회수 : {averageViews.toLocaleString()}
      </p>

      {loading && (
        <div className="mt-6 rounded-xl border border-yellow-500 bg-zinc-900 p-6">
          <h2 className="text-xl font-bold">
            🤖 AI가 영상을 분석 중입니다...
          </h2>

          <p className="mt-3 text-gray-400">
            잠시만 기다려 주세요.
          </p>
        </div>
      )}

      
{topVideos.length > 0 && (
  <TopVideos
    topVideos={topVideos}
    calculateBenchmarkScore={calculateBenchmarkScore}
    formatDuration={formatDuration}
  />
)}
{/* {thumbnailPrompt.length > 0 && (
  <ThumbnailGenerator
    prompt=""
  />
)} */}
      
    </div>
  );
}