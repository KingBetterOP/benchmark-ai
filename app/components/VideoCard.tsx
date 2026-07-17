import { Video } from "../lib/types";
import { getNativeBadge } from "../lib/badge";
import { formatDuration } from "../lib/videoUtils";
type Props = {
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
}: Props) {
    const recommendation = getRecommendation(score);
    const badge = getNativeBadge(video);
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl border border-gray-700 p-4 hover:border-red-500 transition block"
    >
      <img
        src={video.snippet.thumbnails.high.url}
        alt={video.snippet.title}
        className="rounded-lg hover:opacity-80 transition"
      />
<div
  className={`mb-3 rounded-lg p-2 text-center font-bold ${
    score >= 80
      ? "bg-green-600"
      : score >= 60
      ? "bg-yellow-600"
      : "bg-red-600"
  }`}
>
  🤖 AI Benchmark Score : {score}/100
  <div
  className={`${recommendation.color} rounded-lg p-2 mb-3 text-center font-semibold`}
>
  {recommendation.text}
</div>
<div
  className={`${badge.color} rounded-lg p-2 mb-3 text-center font-semibold`}
>
  {badge.label}
</div>
</div>
      <h2 className="mt-3 font-bold">
        {video.snippet.title}
      </h2>

      <div className="mt-2 flex items-center gap-3">
  {video.channel && (
    <img
      src={video.channel.thumbnail}
      alt={video.channel.name}
      className="h-10 w-10 rounded-full"
    />
  )}

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
      <p className="text-gray-500 text-sm">
        📅 {new Date(video.snippet.publishedAt).toLocaleDateString()}
      </p>
      <p className="text-blue-400">
  ⏱ {formatDuration(video.contentDetails.duration)}
</p>
    </a>
  );
}