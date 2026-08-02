import { SEOOptimizer } from "../lib/types";

type Props = {
  optimizer: SEOOptimizer | null;
};

export default function SEOOptimizerCard({
  optimizer,
}: Props) {
  if (!optimizer) return null;

  return (
    <div className="rounded-2xl border border-green-500 bg-zinc-900 p-6">

      <h2 className="mb-6 text-3xl font-bold">
        🚀 AI SEO Optimizer
      </h2>

      <div className="space-y-6">

        <div>
          <h3 className="mb-2 font-bold">
            Better Title
          </h3>

          <p>{optimizer.betterTitle}</p>
        </div>

        <div>
          <h3 className="mb-2 font-bold">
            Better Description
          </h3>

          <p>{optimizer.betterDescription}</p>
        </div>

        <div>
          <h3 className="mb-2 font-bold">
            Search Intent
          </h3>

          <p>{optimizer.searchIntent}</p>
        </div>

        <div>
          <h3 className="mb-2 font-bold">
            Tags
          </h3>

          <div className="flex flex-wrap gap-2">
            {optimizer.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-green-600/20 px-3 py-1 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-bold">
            Keyword Cluster
          </h3>

          <ul className="space-y-1">
            {optimizer.keywordCluster.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-bold">
            Ranking Tips
          </h3>

          <ul className="space-y-1">
            {optimizer.rankingTips.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}