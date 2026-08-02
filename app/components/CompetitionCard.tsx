import { CompetitionAnalysis } from "../lib/types";

type Props = {
  competition: CompetitionAnalysis | null;
};

export default function CompetitionCard({
  competition,
}: Props) {
  if (!competition) return null;

  return (
    <div className="rounded-2xl border border-red-500 bg-zinc-900 p-6">

      <h2 className="mb-6 text-3xl font-bold">
        ⚔️ Competition Analysis
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-gray-400">
            Competition
          </p>

          <p className="mt-2 text-2xl font-bold">
            {competition.competitionScore}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-gray-400">
            Success
          </p>

          <p className="mt-2 text-2xl font-bold">
            {competition.successProbability}%
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-gray-400">
            Difficulty
          </p>

          <p className="mt-2 text-2xl font-bold">
            {competition.difficulty}
          </p>
        </div>
              </div>

      <div className="mt-6 rounded-xl bg-zinc-800 p-5">

        <h3 className="mb-3 text-xl font-bold">
          📌 Recommendation
        </h3>

        <p>{competition.recommendation}</p>

      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">

          <p className="text-sm text-zinc-400">
            📊 Market Saturation
          </p>

          <p className="mt-2 text-xl font-bold">
            {competition.marketSaturation}
          </p>

        </div>

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/10 p-4">

          <p className="text-sm text-zinc-400">
            🚪 Barrier to Entry
          </p>

          <p className="mt-2 text-xl font-bold">
            {competition.barrierToEntry}
          </p>

        </div>

        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">

          <p className="text-sm text-zinc-400">
            ⭐ Opportunity Score
          </p>
                    <p className="mt-2 text-xl font-bold">
            {competition.opportunityScore}/100
          </p>

        </div>

        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">

          <p className="text-sm text-zinc-400">
            📅 Upload Frequency
          </p>

          <p className="mt-2 text-xl font-bold">
            {competition.uploadFrequency}
          </p>

        </div>

      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div className="rounded-xl bg-zinc-800 p-5">

          <h3 className="mb-3 text-xl font-bold text-green-400">
            ✅ Strengths
          </h3>

          <ul className="space-y-2">
            {Array.isArray(competition.strengths) &&
              competition.strengths.map((item, index) => (
                <li key={index}>
                  • {item}
                </li>
              ))}
          </ul>

        </div>

        <div className="rounded-xl bg-zinc-800 p-5">

          <h3 className="mb-3 text-xl font-bold text-red-400">
            ❌ Weaknesses
          </h3>
                    <ul className="space-y-2">
            {Array.isArray(competition.weaknesses) &&
              competition.weaknesses.map((item, index) => (
                <li key={index}>
                  • {item}
                </li>
              ))}
          </ul>

        </div>

      </div>

      <div className="mt-6 rounded-xl bg-zinc-800 p-5">

        <h3 className="mb-4 text-xl font-bold">
          📈 Content Quality Analysis
        </h3>

        <div className="grid gap-4 md:grid-cols-3">

          <div>
            <p className="text-sm text-zinc-400">
              Content
            </p>

            <p className="text-2xl font-bold">
              {competition.contentQuality}/100
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-400">
              Thumbnail
            </p>

            <p className="text-2xl font-bold">
              {competition.thumbnailQuality}/100
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-400">
              Title
            </p>

            <p className="text-2xl font-bold">
              {competition.titleQuality}/100
            </p>
          </div>

        </div>

      </div>

      <div className="mt-6 rounded-xl bg-zinc-800 p-5">

        <h3 className="mb-4 text-xl font-bold">
          💎 Hidden Opportunities
        </h3>

        <ul className="space-y-2">
          {Array.isArray(competition.opportunities) &&
            competition.opportunities.map((item, index) => (
              <li key={index}>
                ✅ {item}
              </li>
            ))}
        </ul>

      </div>

    </div>
  );
}