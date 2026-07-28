import { Video } from "../lib/types";
import { calculateThumbnailScore } from "../lib/thumbnailScore";
import { analyzeThumbnail } from "../lib/thumbnailAnalyzer";
import { getThumbnailRecommendations } from "../lib/thumbnailRecommendation";

type Props = {
  video: Video;
};

export default function ThumbnailCard({
  video,
}: Props) {
  const thumbnailScore = calculateThumbnailScore(video);
  const analysis = analyzeThumbnail(video);
  const recommendations =
    getThumbnailRecommendations(analysis);

  return (
    <>
      <div className="rounded-xl border border-pink-500/30 bg-pink-500/10 p-4">
        <p className="mb-2 text-sm font-semibold text-pink-300">
          🖼 Thumbnail Quality
        </p>

        <h3 className="text-3xl font-bold text-pink-400">
          {thumbnailScore}
          <span className="text-lg text-zinc-400">
            {" "}
            /100
          </span>
        </h3>

        <p className="mt-2 text-sm text-zinc-300">
          {thumbnailScore >= 90
            ? "Excellent thumbnail quality."
            : thumbnailScore >= 75
            ? "Good thumbnail performance."
            : "Thumbnail could be improved."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className="rounded-lg bg-zinc-800/50 p-3">
          <p className="text-xs text-zinc-400">
            😊 Face
          </p>

          <h4 className="mt-1 text-xl font-bold">
            {analysis.face}
          </h4>
        </div>

        <div className="rounded-lg bg-zinc-800/50 p-3">
          <p className="text-xs text-zinc-400">
            🎨 Contrast
          </p>

          <h4 className="mt-1 text-xl font-bold">
            {analysis.contrast}
          </h4>
        </div>

        <div className="rounded-lg bg-zinc-800/50 p-3">
          <p className="text-xs text-zinc-400">
            📝 Text
          </p>

          <h4 className="mt-1 text-xl font-bold">
            {analysis.text}
          </h4>
        </div>

        <div className="rounded-lg bg-zinc-800/50 p-3">
          <p className="text-xs text-zinc-400">
            ⚡ Click
          </p>

          <h4 className="mt-1 text-xl font-bold">
            {analysis.click}
          </h4>
        </div>

      </div>

      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <p className="mb-3 text-sm font-semibold text-emerald-300">
          💡 AI Recommendations
        </p>

        <ul className="space-y-2 text-sm text-zinc-300">
          {recommendations.map((item, index) => (
            <li key={index}>
              ✅ {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}