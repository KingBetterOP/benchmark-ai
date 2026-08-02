type Props = {
  ctrScore: number;
  seoScore: number;
  emotionScore: number;
  curiosityScore: number;
  lengthScore: number;
  overallScore: number;
  improvements: string[];
  betterTitles: string[];
};

export default function TitleAnalyzerCard({
  ctrScore,
  seoScore,
  emotionScore,
  curiosityScore,
  lengthScore,
  overallScore,
  improvements,
  betterTitles,
}: Props) {
  return (
    <section className="mt-10 rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-8">

      <h2 className="text-3xl font-extrabold">
        📝 AI Title Analyzer
      </h2>

      <p className="mt-2 text-zinc-400">
        Analyze your YouTube title before publishing.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <ScoreCard title="CTR" score={ctrScore} />
        <ScoreCard title="SEO" score={seoScore} />
        <ScoreCard title="Emotion" score={emotionScore} />
        <ScoreCard title="Curiosity" score={curiosityScore} />
        <ScoreCard title="Length" score={lengthScore} />
        <ScoreCard title="Overall" score={overallScore} />

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-zinc-900 p-5">
          <h3 className="text-xl font-bold text-green-400">
            ✅ Improvements
          </h3>

          <ul className="mt-4 space-y-2">
            {improvements.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-5">
          <h3 className="text-xl font-bold text-cyan-400">
            🚀 Better Titles
          </h3>

          <ul className="mt-4 space-y-2">
            {betterTitles.map((item, index) => (
              <li key={index}>
                {index + 1}. {item}
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

      <p className="mt-2 text-3xl font-bold text-yellow-400">
        {score}
      </p>

    </div>
  );
}