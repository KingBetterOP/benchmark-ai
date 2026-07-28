import { Video } from "../lib/types";
import { calculateViralScore } from "../lib/viralScore";
import { getSuccessScore } from "../lib/successScore";
import { formatNumber } from "../lib/numberFormat";

type Props = {
  video: Video;
  score: number;
};

export default function VideoMetrics({
  video,
  score,
}: Props) {
  const viral = calculateViralScore(video);
  const success = getSuccessScore(video, score);

  return (
    <div className="p-4">

      <div className="mt-2 grid grid-cols-4 gap-2 text-center text-xs md:text-sm">

        <div className="rounded-lg bg-zinc-800 py-2">
          <p>👀</p>

          <p className="font-semibold">
            {formatNumber(
              Number(video.statistics?.viewCount ?? 0)
            )}
          </p>
        </div>

        <div className="rounded-lg bg-zinc-800 py-2">
          <p>👥</p>

          <p className="font-semibold">
            {video.channel
              ? formatNumber(video.channel.subscribers)
              : "-"}
          </p>
        </div>

        <div className="rounded-lg bg-emerald-500/20 py-2">
          <p>🎯</p>

          <p className="font-semibold">
            {success}%
          </p>
        </div>

        <div className="rounded-lg bg-red-500/20 py-2">
          <p>🔥</p>

          <p className="font-semibold">
            {viral}
          </p>
        </div>

      </div>
    </div>
  );
}