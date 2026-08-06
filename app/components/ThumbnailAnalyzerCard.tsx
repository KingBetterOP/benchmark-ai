type Props = {
  ctrScore: number;
  emotionScore: number;
  colorScore: number;
  textScore: number;
  overallScore: number;
  strengths: string[];
  improvements: string[];
};

export default function ThumbnailAnalyzerCard({
  ctrScore,
  emotionScore,
  colorScore,
  textScore,
  overallScore,
  strengths,
  improvements,
}: Props) {
  return (
    <section className="mt-10 rounded-3xl border border-pink-500/30 bg-pink-500/10 p-8">

      <h2 className="text-3xl font-extrabold">
        🖼 t.thumbnailAnalyzer
      </h2>

      <p className="mt-2 text-zinc-400">
        Analyze your thumbnail before publishing.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-5">

        <ScoreCard title="CTR" score={ctrScore} />

        <ScoreCard title="Emotion" score={emotionScore} />

        <ScoreCard title="Color" score={colorScore} />

        <ScoreCard title="Text" score={textScore} />

        <ScoreCard title="Overall" score={overallScore} />

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-5">
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

        <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-5">
          <h3 className="text-xl font-bold text-orange-400">
            🚀 Improvements
          </h3>

          <ul className="mt-4 space-y-2">
            {improvements.map((item, index) => (
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
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-5 text-center">

      <p className="text-zinc-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-pink-400">
        {score}
      </p>

    </div>
  );
}