type Props = {
  successProbability: number;
  expectedViews: string;
  expectedCTR: string;
  estimatedRPM: string;
  estimatedRevenue: string;
  competition: string;
  recommendation: string;
  confidence: number;
};

export default function ViralPredictorCard({
  successProbability,
  expectedViews,
  expectedCTR,
  estimatedRPM,
  estimatedRevenue,
  competition,
  recommendation,
  confidence,
}: Props) {
  return (
    <section className="mt-10 rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8">

      <p className="text-sm uppercase tracking-[0.3em] text-red-400">
        AI Viral Predictor
      </p>

      <h2 className="mt-2 text-4xl font-extrabold">
        🚀 {recommendation}
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-4">

        <Card title="Success Probability" value={`${successProbability}%`} />

        <Card title="Expected Views" value={expectedViews} />

        <Card title="Expected CTR" value={expectedCTR} />

        <Card title="Competition" value={competition} />

        <Card title="Estimated RPM" value={estimatedRPM} />

        <Card title="Estimated Revenue" value={estimatedRevenue} />

        <Card title="Confidence" value={`${confidence}%`} />

      </div>

    </section>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-5 text-center">

      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <p className="mt-3 text-2xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}