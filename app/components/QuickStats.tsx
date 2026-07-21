import TopVideos from "./TopVideos";
import { Video } from "../lib/types";
import ThumbnailGenerator from "./ThumbnailGenerator";
type Props = {
  results: Video[];
  averageViews: number;
  loading: boolean;
  report: string;
  idea: string;
  strategy: string;
  competition: string;
   titles: string;
   thumbnailPrompt: string;
  topVideos: Video[];
  calculateBenchmarkScore: (video: Video) => number;
  formatDuration: (duration: string) => string;
};

export default function QuickStats({
  results,
  averageViews,
  loading,
  report,
  idea,
  strategy,
  competition,
  titles,
  thumbnailPrompt,
  topVideos,
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

      {report && (
        <div className="mt-8 whitespace-pre-line rounded-xl border border-cyan-500 bg-zinc-900 p-6">
          <h2 className="mb-4 text-2xl font-bold">
            🤖 AI 분석 리포트
          </h2>

          <p>{report}</p>
        </div>
      )}

      {idea && (
        <div className="mt-8 rounded-xl border border-green-500 bg-zinc-900 p-6 whitespace-pre-line">
          <h2 className="text-2xl font-bold">
            💡 AI 추천 콘텐츠 아이디어
          </h2>

          <p className="mt-4">{idea}</p>
        </div>
      )}
      

      {strategy && (
        <div className="mt-8 whitespace-pre-line rounded-xl border border-blue-500 bg-zinc-900 p-6">
          <h2 className="mb-4 text-2xl font-bold">
            📈 AI 성장 전략
          </h2>

          <p>{strategy}</p>
        </div>
      )}
      

      {competition && (
        <div className="mt-8 whitespace-pre-line rounded-xl border border-red-500 bg-zinc-900 p-6">
          <h2 className="mb-4 text-2xl font-bold">
            🎯 AI 경쟁도 분석
          </h2>

          <p>{competition}</p>
        </div>
      )}
      {titles && (
  <div className="mt-8 whitespace-pre-line rounded-xl border border-yellow-500 bg-zinc-900 p-6">
    <h2 className="mb-4 text-2xl font-bold">
      📝 AI 추천 제목 20개
    </h2>

    <p>{titles}</p>
  </div>
)}
{thumbnailPrompt && (
  <div className="mt-8 rounded-xl border border-pink-500 bg-zinc-900 p-6 whitespace-pre-line">
    <h2 className="text-2xl font-bold">
      🎨 AI 썸네일 기획안
    </h2>

    <p className="mt-4">
      {thumbnailPrompt}
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
{thumbnailPrompt && (
  <ThumbnailGenerator
    prompt={thumbnailPrompt}
  />
)}
      
    </div>
  );
}