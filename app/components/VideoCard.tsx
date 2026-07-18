import { Video } from "../lib/types";
import { getNativeBadge } from "../lib/badge";
import { formatDuration } from "../lib/videoUtils";
import { calculateViralScore } from "../lib/viralScore";
import { predictCTR } from "../lib/ctrPredictor";
import { getCompetition } from "../lib/competition";
import { getSuccessScore } from "../lib/successScore";
import { getAIInsight } from "../lib/insight";
type VideoCardProps = {
  video: Video;
  score: number;
};
function getRecommendation(score: number) {
  if (score >= 80) {
    return {
      text: "🟢 AI 벤치마킹 추천",
      color: "bg-green-600",
    };
  }

  if (score >= 60) {
    return {
      text: "🟡 AI 참고 추천",
      color: "bg-yellow-600",
    };
  }

  return {
    text: "🔴 AI 비추천",
    color: "bg-red-600",
  };
}

export default function VideoCard({
  video,
  score,
}: VideoCardProps) {

  const viralScore = calculateViralScore(video);
  const viralColor =
  viralScore >= 90
    ? "text-red-400"
    : viralScore >= 75
    ? "text-orange-400"
    : viralScore >= 60
    ? "text-yellow-400"
    : "text-zinc-300";
    const viralGrade =
  viralScore >= 90
    ? "★★★★★"
    : viralScore >= 75
    ? "★★★★☆"
    : viralScore >= 60
    ? "★★★☆☆"
    : viralScore >= 40
    ? "★★☆☆☆"
    : "★☆☆☆☆";
const ctr = predictCTR(video);
const successScore = getSuccessScore(video, score);
const insights = getAIInsight(video);
const successLevel =
  successScore >= 90
    ? "🚀 Excellent"
    : successScore >= 75
    ? "🔥 High Potential"
    : successScore >= 60
    ? "👍 Good"
    : "⚠️ Low";
const competition = getCompetition(video);

const recommendation = getRecommendation(score);
    const scoreColor =
  score >= 80
    ? "bg-green-600"
    : score >= 60
    ? "bg-yellow-500"
    : "bg-red-600";
    const badge = getNativeBadge(video);
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl border border-gray-700 p-4 hover:border-red-500 transition block"
    >
      <div className="relative overflow-hidden rounded-xl">
  <img
    src={video.snippet.thumbnails.high.url}
    alt={video.snippet.title}
    className="aspect-video w-full object-cover transition duration-300 hover:scale-105"
  />

  <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
    {formatDuration(video.contentDetails.duration)}
  </div>

  <div
    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-sm font-bold text-white ${scoreColor}`}
  >
    AI {score}
  </div>
</div>
        
<div className={`mb-3 rounded-lg p-2 text-center font-bold ${scoreColor}`}>
  🤖 AI Benchmark Score : {score}/100
</div>

<div
  className={`${recommendation.color} mb-3 rounded-lg p-2 text-center font-semibold`}
>
  {recommendation.text}
</div>

<div
  className={`${badge.color} mb-3 rounded-lg p-2 text-center font-semibold`}
>
  {badge.label}

</div>
      <h2 className="mt-3 font-bold">
        {video.snippet.title}
      </h2>

      <div className="mt-2 flex items-center gap-3">

  <p className="text-gray-400">
    {video.channel ? video.channel.name : video.snippet.channelTitle}
  </p>
</div>
     <p className="text-cyan-400 text-sm">
  👥 구독자{" "}
  {video.channel
    ? video.channel.subscribers.toLocaleString()
    : "-"}
</p>

<p className="text-orange-400 text-sm">
  📈 조회수/구독자{" "}
  {video.channel
    ? (
        Number(video.statistics?.viewCount || 0) /
        video.channel.subscribers
      ).toFixed(1)
    : "-"}
  배
</p>

      <p className="text-green-400 font-semibold mt-2">
        👀{" "}
        {video.statistics?.viewCount
          ? `${Number(video.statistics.viewCount).toLocaleString()} views`
          : "조회수 정보 없음"}
      </p>
<p className="text-pink-400">
  👍{" "}
  {video.statistics?.likeCount
    ? Number(video.statistics.likeCount).toLocaleString()
    : "-"}
</p>

<p className="text-yellow-400">
  💬{" "}
  {video.statistics?.commentCount
    ? Number(video.statistics.commentCount).toLocaleString()
    : "-"}
</p>
<div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
  <div className="flex items-center justify-between">
    <span className="text-sm font-semibold text-red-300">
      🔥 Viral Score
    </span>

    <span className={`text-3xl font-extrabold ${viralColor}`}>
      {viralScore}/100
    </span>
  </div>

  <p className="mt-2 text-center text-yellow-300 font-semibold">
    {viralGrade}
  </p>
</div>
<div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
  <div className="flex items-center justify-between">
    <span className="text-sm font-semibold text-cyan-300">
      📈 CTR Prediction
    </span>

    <span className="text-2xl font-bold text-cyan-400">
      {ctr}%
    </span>
  </div>
</div>
<div className="mt-3 rounded-xl border border-purple-500/30 bg-purple-500/10 p-4">
  <div className="flex items-center justify-between">
    <span className="text-sm font-semibold text-purple-300">
      ⚔️ Competition
    </span>

    <span className={`text-lg font-bold ${competition.color}`}>
      {competition.text}
    </span>
  </div>
</div>
<div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-semibold text-emerald-300">
        🎯 Success Probability
      </p>

      <p className="text-xs text-zinc-400">
        AI 종합 성공 확률
      </p>
    </div>

    <div className="text-right">
      <h3 className="text-3xl font-extrabold text-emerald-400">
        {successScore}%
      </h3>

      <p className="text-sm text-emerald-300">
        {successLevel}
      </p>
    </div>
  </div>
</div>
<div className="mt-3 rounded-xl border border-sky-500/30 bg-sky-500/10 p-4">
  <h3 className="mb-3 text-sm font-bold text-sky-300">
    🧠 AI Insight
  </h3>

  <ul className="space-y-2">
    {insights.map((item, index) => (
      <li
        key={index}
        className="text-sm text-zinc-200"
      >
        {item}
      </li>
    ))}
  </ul>
</div>
      <p className="text-gray-500 text-sm">
        📅 {new Date(video.snippet.publishedAt).toLocaleDateString()}
      </p>
      <p className="text-blue-400">
  ⏱ {formatDuration(video.contentDetails.duration)}
</p>
    </a>
  );
}