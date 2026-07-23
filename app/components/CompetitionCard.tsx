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

      <div className="grid grid-cols-3 gap-4">
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

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-zinc-800 p-5">
          <h3 className="mb-3 text-xl font-bold text-green-400">
            ✅ Strengths
          </h3>

          <ul className="space-y-2">
            {competition.strengths.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-zinc-800 p-5">
          <h3 className="mb-3 text-xl font-bold text-red-400">
            ❌ Weaknesses
          </h3>

          <ul className="space-y-2">
            {competition.weaknesses.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}