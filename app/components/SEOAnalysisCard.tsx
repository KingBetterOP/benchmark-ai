import { SEOAnalysis } from "../lib/types";

type Props = {
  seo: SEOAnalysis | null;
};

export default function SEOAnalysisCard({
  seo,
}: Props) {
  if (!seo) return null;

  return (
    <div className="rounded-2xl border border-emerald-500 bg-white/5 backdrop-blur-xl p-6">

      <h2 className="mb-6 text-3xl font-bold">
        🚀 AI SEO Analysis
      </h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-zinc-400">
            Overall
          </p>

          <p className="mt-2 text-2xl font-bold">
            {seo.overallScore}/100
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-zinc-400">
            Title
          </p>

          <p className="mt-2 text-2xl font-bold">
            {seo.titleScore}/100
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-zinc-400">
            Description
          </p>

          <p className="mt-2 text-2xl font-bold">
            {seo.descriptionScore}/100
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-zinc-400">
            Density
          </p>

          <p className="mt-2 text-2xl font-bold">
            {seo.keywordDensity}%
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-zinc-400">
            Ranking
          </p>

          <p className="mt-2 text-2xl font-bold">
            {seo.rankingProbability}%
          </p>
        </div>

      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">

        <div className="rounded-xl bg-zinc-800 p-5">
          <h3 className="mb-3 font-bold">
            ✅ Recommended Keywords
          </h3>

          <ul className="space-y-2">
            {seo.recommendedKeywords.map((item, index) => (
              <li key={index}>
                • {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-zinc-800 p-5">
          <h3 className="mb-3 font-bold">
            ❌ Missing Keywords
          </h3>

          <ul className="space-y-2">
            {seo.missingKeywords.map((item, index) => (
              <li key={index}>
                • {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-zinc-800 p-5">
          <h3 className="mb-3 font-bold">
            💡 AI Suggestions
          </h3>

          <ul className="space-y-2">
            {seo.suggestions.map((item, index) => (
              <li key={index}>
                • {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}