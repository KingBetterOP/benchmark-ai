import { ChannelAudit } from "../lib/types";

type Props = {
  audit: ChannelAudit | null;
};

export default function ChannelAuditCard({
  audit,
}: Props) {
  if (!audit) return null;
  return (
    <div className="mt-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8">

      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
        t.channelAudit
      </p>

      <h2 className="mt-2 text-4xl font-extrabold">
        📺 {audit.niche}
      </h2>

      <div className="mt-6 rounded-2xl bg-white/5 backdrop-blur-xl p-5">
        <p className="text-zinc-400">
          Channel Score
        </p>

        <p className="mt-2 text-4xl font-bold text-cyan-400">
          {audit.overallScore}/100
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div>
          <h3 className="font-bold text-green-400">
            Strengths
          </h3>

          <ul className="mt-2 space-y-2">
            {audit.strengths.map((item, i) => (
              <li key={i}>✅ {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-red-400">
            Weaknesses
          </h3>

          <ul className="mt-2 space-y-2">
            {audit.weaknesses.map((item, i) => (
              <li key={i}>❌ {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-yellow-400">
            Opportunities
          </h3>

          <ul className="mt-2 space-y-2">
            {audit.opportunities.map((item, i) => (
              <li key={i}>🔥 {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-cyan-400">
            Recommendations
          </h3>

          <ul className="mt-2 space-y-2">
  <li>💡 {audit.recommendation}</li>
</ul>
            
          
        </div>

      </div>

    </div>
  );
}