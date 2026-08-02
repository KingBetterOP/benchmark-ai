type Props = {
  score: number;
  decision: string;
  reasons: string[];
  action: string;
};

export default function FinalDecisionCard({
  score,
  decision,
  reasons,
  action,
}: Props) {
  const color =
    decision === "MAKE THIS VIDEO"
      ? "text-green-400"
      : decision === "WAIT"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="mt-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8">

      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
        AI FINAL DECISION
      </p>

      <h2 className={`mt-3 text-5xl font-extrabold ${color}`}>
        {decision}
      </h2>

      <div className="mt-8 rounded-2xl bg-zinc-900 p-6">

        <p className="text-zinc-400">
          Decision Score
        </p>

        <p className="mt-2 text-5xl font-bold">
          {score}/100
        </p>

      </div>
      <div className="mt-8">

  <h3 className="text-xl font-bold">
    Why?
  </h3>

  <ul className="mt-4 space-y-2">
    {reasons.map((reason, index) => (
      <li key={index}>
        ✅ {reason}
      </li>
    ))}
  </ul>

</div>

<div className="mt-8 rounded-2xl bg-zinc-900 p-5">

  <p className="text-zinc-400">
    Recommended Action
  </p>

  <p className="mt-2 text-xl font-bold text-cyan-400">
    {action}
  </p>

</div>

    </div>
  );
}