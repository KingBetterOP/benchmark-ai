type Props = {
  score: number;
  confidence: number;
  verdict: string;

  demand: number;
  competition: number;
 trend: number;
  ctr: number;
  thumbnail: number;
  title: number;
  freshness: number;
  gap: number;
};

export default function OpportunityScoreV2Card({
  score,
  confidence,
  verdict,
  demand,
  competition,
  trend,
  ctr,
  thumbnail,
  title,
  freshness,
  gap,
}: Props) {
  const rows = [
    ["Demand", demand, 20],
    ["Competition", competition, 20],
    ["Trend", trend, 15],
    ["CTR", ctr, 10],
    ["Thumbnail", thumbnail, 10],
    ["Title", title, 10],
    ["Freshness", freshness, 10],
    ["Gap", gap, 5],
  ];

  return (
    <section className="mx-8 mt-8 rounded-3xl border border-cyan-500/30 bg-cyan-500/10 p-8">
      <h2 className="text-3xl font-extrabold">
        🚀 Opportunity Score V2
      </h2>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:justify-between">
        <div>
          <p className="text-sm uppercase text-cyan-300">
            Overall Score
          </p>

          <h3 className="mt-2 text-6xl font-extrabold">
            {score}
            <span className="text-3xl text-zinc-500">
              /100
            </span>
          </h3>

          <p className="mt-3">
            Confidence: {confidence}%
          </p>

          <p className="mt-2 font-bold">
            Verdict: {verdict}
          </p>
        </div>

        <div className="min-w-[340px] space-y-3">
          {rows.map(([label, value, max]) => (
            <div
              key={label as string}
              className="flex justify-between rounded-xl bg-white/5 px-4 py-3"
            >
              <span>{label}</span>

              <strong>
                {value as number}/{max as number}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}