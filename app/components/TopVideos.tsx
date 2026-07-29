import { Video } from "../lib/types";
import { translations } from "../lib/translations";
type Props = {
  topVideos: Video[];
  calculateBenchmarkScore: (video: Video) => number;
  formatDuration: (duration: string) => string;
  language: string;
};

export default function TopVideos({
  topVideos,
  calculateBenchmarkScore,
  formatDuration,
  language,
}: Props) {
  const t =
  translations[language as keyof typeof translations];
  return (
    <div className="mt-6 rounded-xl border border-yellow-500 bg-zinc-900 p-6">
      <h2 className="mb-4 text-2xl font-bold">
  {t.bestVideos}
</h2>

      {topVideos.map((video, index) => (
        <div
          key={video.id}
          className="mb-3 rounded-lg border border-gray-700 p-4"
        >
          <p className="font-bold">
            #{index + 1} {video.snippet.title}
          </p>

          <p className="text-sm text-gray-400">
            {video.snippet.channelTitle}
          </p>

          <div className="mt-2">
            <div className="h-3 overflow-hidden rounded-full bg-zinc-700">
              <div
                className="h-full rounded-full bg-cyan-400"
                style={{
                  width: `${calculateBenchmarkScore(video)}%`,
                }}
              />
            </div>

            <p className="mt-2 text-cyan-400 font-bold">
              {t.aiScore} : {calculateBenchmarkScore(video)} / 100
            </p>

            <p className="mt-2 text-gray-400">
              👀 {t.views} :{" "}
              {Number(video.statistics?.viewCount || 0).toLocaleString()}
            </p>

            <p className="text-gray-400">
              📅 {t.uploadDate} :{" "}
              {new Date(video.snippet.publishedAt).toLocaleDateString()}
            </p>

            <p className="text-gray-400">
              📺 {t.duration} :{" "}
              {formatDuration(video.contentDetails?.duration || "")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}