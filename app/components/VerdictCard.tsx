type Props = {
  verdict: string;
  confidence: number;
  summary: string;
};

export default function VerdictCard({
  verdict,
  confidence,
  summary,
}: Props) {
  const color =
    verdict === "STRONG BUY"
      ? "border-green-500 text-green-400"
      : verdict === "GOOD"
      ? "border-cyan-500 text-cyan-400"
      : verdict === "NEUTRAL"
      ? "border-yellow-500 text-yellow-400"
      : "border-red-500 text-red-400";

  return (
    <div
      className={`mx-8 mt-8 rounded-3xl border ${color} bg-zinc-900 p-8`}
    >
      <p className="text-sm uppercase tracking-[0.3em]">
        AI Verdict
      </p>

      <h2 className="mt-4 text-5xl font-bold">
        {verdict}
      </h2>

      <p className="mt-4 text-zinc-300">
        {summary}
      </p>

      <div className="mt-6">
        <p className="text-sm text-zinc-500">
          Confidence
        </p>

        <div className="mt-2 h-3 w-full rounded-full bg-zinc-800">
          <div
            className="h-3 rounded-full bg-cyan-400 transition-all"
            style={{
              width: `${confidence}%`,
            }}
          />
        </div>

        <p className="mt-2 text-right font-bold">
          {confidence}%
        </p>
      </div>
    </div>
  );
}