import { Video } from "../lib/types";
import { calculatePrediction } from "../lib/prediction";

type Props = {
  videos: Video[];
};

export default function PredictionCard({
  videos,
}: Props) {
  const prediction = calculatePrediction(videos);
  const difficultyColor =
  prediction.difficulty <= 30
    ? "text-green-400"
    : prediction.difficulty <= 60
    ? "text-yellow-400"
    : "text-red-400";

const difficultyLabel =
  prediction.difficulty <= 30
    ? "🟢 EASY"
    : prediction.difficulty <= 60
    ? "🟡 MEDIUM"
    : "🔴 HARD";

  return (
    <div className="mt-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 p-6">

      <p className="text-sm uppercase tracking-[0.25em] text-indigo-400">
        🤖 AI Prediction
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">

        <div>
          <p className="text-xs text-zinc-400">
            Expected Views
          </p>

          <h3 className="text-2xl font-bold">
  {Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(prediction.expectedViews)}
</h3>
        </div>

        <div>
          <p className="text-xs text-zinc-400">
  Difficulty
</p>

<h3 className={`text-2xl font-bold ${difficultyColor}`}>
  {prediction.difficulty}/100
</h3>

<p className={`mt-1 text-sm ${difficultyColor}`}>
  {difficultyLabel}
</p>
        </div>

        <div>
          <p className="text-xs text-zinc-400">
            Trend
          </p>

         <h3 className="text-2xl font-bold">
  {prediction.trend === "Rising"
    ? "📈 Rising"
    : prediction.trend === "Stable"
    ? "➡️ Stable"
    : "📉 Falling"}
</h3>
        </div>

        <div>
          <p className="text-xs text-zinc-400">
  Confidence
</p>

<p className="text-yellow-400">
  {prediction.confidence >= 90
    ? "★★★★★"
    : prediction.confidence >= 80
    ? "★★★★☆"
    : prediction.confidence >= 70
    ? "★★★☆☆"
    : prediction.confidence >= 60
    ? "★★☆☆☆"
    : "★☆☆☆☆"}
</p>

<h3 className="text-2xl font-bold">
  {prediction.confidence}%
</h3>
        </div>

      
          </div>

      <div className="mt-6 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
  <p className="text-sm font-semibold text-indigo-300">
    💡 AI Analysis
  </p>

  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
    {prediction.reasons.map((reason, index) => (
      <li key={index}>
        {reason}
      </li>
    ))}
  </ul>
</div>
    </div>
  );
}