import { Video } from "../lib/types";
import { formatDuration } from "../lib/videoUtils";

type Props = {
  video: Video;
  score: number;
};

export default function VideoHeader({
  video,
  score,
}: Props) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative">

        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
          className="aspect-video w-full object-cover"
        />

        <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-sm font-bold">
          AI {score}
        </div>

        <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs">
          {formatDuration(video.contentDetails.duration)}
        </div>

      </div>

      <div className="p-4">

        <h2 className="line-clamp-2 text-base font-bold md:text-lg">
          {video.snippet.title}
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          {video.channel
            ? video.channel.name
            : video.snippet.channelTitle}
        </p>

      </div>
    </a>
  );
}