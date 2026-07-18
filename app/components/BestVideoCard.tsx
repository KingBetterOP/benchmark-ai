import { Video } from "../lib/types";

type BestVideoCardProps = {
  video?: Video;
};

export default function BestVideoCard({
  video,
}: BestVideoCardProps) {
  if (!video) return null;

  return (
    <div className="mt-8 rounded-2xl border border-yellow-500 bg-zinc-900 p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-3xl">🏆</span>

        <h2 className="text-2xl font-bold">
          Best Performing Video
        </h2>
      </div>

      <img
        src={video.snippet.thumbnails.high.url}
        alt={video.snippet.title}
        className="mb-4 w-full rounded-xl"
      />

      <h3 className="text-xl font-bold">
        {video.snippet.title}
      </h3>

      <p className="mt-2 text-gray-400">
        {video.snippet.channelTitle}
      </p>

      <p className="mt-4 text-lg font-semibold">
        👀 {video.statistics.viewCount.toLocaleString()} views
      </p>
    </div>
  );
}