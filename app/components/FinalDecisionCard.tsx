type Props = {
  score: number;
  decision: string;
  reasons: string[];
  action: string;
  language: string;
};

export default function FinalDecisionCard({
  score,
  decision,
  reasons,
  action,
  language,
}: Props) {
  const color =
    decision === "MAKE THIS VIDEO"
      ? "text-green-400"
      : decision === "WAIT"
      ? "text-yellow-400"
      : "text-red-400";

  const text =
    language === "ko"
      ? {
          title: "AI 최종 판단",
          score: "최종 점수",
          why: "판단 이유",
          action: "추천 행동",
        }
      : {
          title: "AI FINAL DECISION",
          score: "Decision Score",
          why: "Why?",
          action: "Recommended Action",
        };

  return (
    <div className="mt-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
        {text.title}
      </p>

      <h2 className={`mt-3 text-5xl font-extrabold ${color}`}>
        {decision}
      </h2>

      <div className="mt-8 rounded-2xl bg-white/5 p-6 backdrop-blur-xl">
        <p className="text-zinc-400">
          {text.score}
        </p>

        <p className="mt-2 text-5xl font-bold">
          {score}/100
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold">
          {text.why}
        </h3>

        <ul className="mt-4 space-y-2">
          {reasons.map((reason, index) => (
            <li key={index}>
              ✅ {reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-2xl bg-white/5 p-5 backdrop-blur-xl">
        <p className="text-zinc-400">
          {text.action}
        </p>

        <p className="mt-2 text-xl font-bold text-cyan-400">
          {action}
        </p>
      </div>
    </div>
  );
}