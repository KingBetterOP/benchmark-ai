type Props = {
  hookScore: number;
  retentionScore: number;
  clarityScore: number;
  engagementScore: number;
  ctaScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  improvedHook: string;
  estimatedWatchTime: string;
};

export default function ScriptAnalyzerCard({
  hookScore,
  retentionScore,
  clarityScore,
  engagementScore,
  ctaScore,
  overallScore,
  strengths,
  weaknesses,
  improvedHook,
  estimatedWatchTime,
}: Props) {
  return (
    <section className="mt-10 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8">

      <h2 className="text-3xl font-extrabold">
        🎬 AI Script Analyzer
      </h2>

      <p className="mt-2 text-zinc-400">
        Analyze your script before recording.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <ScoreCard title="Hook" score={hookScore} />
        <ScoreCard title="Retention" score={retentionScore} />
        <ScoreCard title="Clarity" score={clarityScore} />
        <ScoreCard title="Engagement" score={engagementScore} />
        <ScoreCard title="CTA" score={ctaScore} />
        <ScoreCard title="Overall" score={overallScore} />

      </div>

      <div className="mt-8 rounded-2xl bg-zinc-900 p-5">
        <h3 className="text-xl font-bold text-cyan-400">
          🎣 Improved Hook
        </h3>

        <p className="mt-3 text-zinc-300">
          {improvedHook}
        </p>
      </div>

      <div className="mt-6 rounded-2xl bg-zinc-900 p-5">
        <h3 className="text-xl font-bold text-purple-400">
          ⏱ Estimated Watch Time
        </h3>

        <p className="mt-3 text-2xl font-bold">
          {estimatedWatchTime}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-zinc-900 p-5">

          <h3 className="text-xl font-bold text-green-400">
            ✅ Strengths
          </h3>

          <ul className="mt-4 space-y-2">
            {strengths.map((item, index) => (
              <li key={index}>
                • {item}
              </li>
            ))}
          </ul>

        </div>

        <div className="rounded-2xl bg-zinc-900 p-5">

          <h3 className="text-xl font-bold text-red-400">
            ⚠ Weaknesses
          </h3>

          <ul className="mt-4 space-y-2">
            {weaknesses.map((item, index) => (
              <li key={index}>
                • {item}
              </li>
            ))}
          </ul>

        </div>

      </div>

    </section>
  );
}

function ScoreCard({
  title,
  score,
}: {
  title: string;
  score: number;
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-5 text-center">

      <p className="text-zinc-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-emerald-400">
        {score}
      </p>

    </div>
  );
}