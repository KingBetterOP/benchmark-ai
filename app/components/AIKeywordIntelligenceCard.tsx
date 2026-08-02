type Props = {
  keyword: string;
  difficulty: number;
  opportunity: number;
  trend: string;
  demand: string;
  uploadTime: string;
  audience: string;

  expectedViews: string;
  expectedCTR: string;
  estimatedRPM: string;
  estimatedRevenue: string;
  recommendation: string;
  confidence: number;
};

export default function AIKeywordIntelligenceCard({
  keyword,
  difficulty,
  opportunity,
  trend,
  demand,
  uploadTime,
  audience,

  expectedViews,
  expectedCTR,
  estimatedRPM,
  estimatedRevenue,
  recommendation,
  confidence,
}: Props) {
  return (
    <div className="mt-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8">

      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
        AI Keyword Intelligence
      </p>

      <h2 className="mt-2 text-4xl font-extrabold">
        🔥 {keyword}
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl bg-zinc-900 p-5">
          <p className="text-zinc-400">
            Difficulty
          </p>

          <p className="mt-2 text-3xl font-bold">
            {difficulty}/100
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-5">
          <p className="text-zinc-400">
            Opportunity
          </p>

          <p className="mt-2 text-3xl font-bold text-green-400">
            {opportunity}/100
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-5">
          <p className="text-zinc-400">
            Trend
          </p>

          <p className="mt-2 text-3xl font-bold">
            {trend}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-5">
          <p className="text-zinc-400">
            Search Demand
          </p>

          <p className="mt-2 text-2xl font-bold">
            {demand}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-5">
          <p className="text-zinc-400">
            Best Upload Time
          </p>

          <p className="mt-2 text-2xl font-bold">
            {uploadTime}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-5">
          <p className="text-zinc-400">
            Target Audience
          </p>

          

          <p className="mt-2 text-xl font-bold">
            {audience}
          </p>
        </div>
        <div className="rounded-2xl bg-zinc-900 p-5">
  <p className="text-zinc-400">
    Expected Views
  </p>

  <p className="mt-2 text-2xl font-bold">
    {expectedViews}
  </p>
</div>

<div className="rounded-2xl bg-zinc-900 p-5">
  <p className="text-zinc-400">
    Expected CTR
  </p>

  <p className="mt-2 text-2xl font-bold">
    {expectedCTR}
  </p>
</div>

<div className="rounded-2xl bg-zinc-900 p-5">
  <p className="text-zinc-400">
    Estimated RPM
  </p>

  <p className="mt-2 text-2xl font-bold">
    {estimatedRPM}
  </p>
</div>

<div className="rounded-2xl bg-zinc-900 p-5">
  <p className="text-zinc-400">
    Estimated Revenue
  </p>

  <p className="mt-2 text-2xl font-bold">
    {estimatedRevenue}
  </p>
</div>

<div className="rounded-2xl bg-zinc-900 p-5">
  <p className="text-zinc-400">
    Recommendation
  </p>

  <p className="mt-2 text-2xl font-bold text-green-400">
    {recommendation}
  </p>
</div>

<div className="rounded-2xl bg-zinc-900 p-5">
  <p className="text-zinc-400">
    Confidence
  </p>

  <p className="mt-2 text-2xl font-bold">
    {confidence}%
  </p>
</div>

      </div>

    </div>
  );
}