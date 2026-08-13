import { ContentGap } from "@/app/lib/competitorGap";

type Props = {
  gaps: ContentGap[];
};

export default function CompetitorGapCard({
  gaps,
}: Props) {
  if (gaps.length === 0) return null;

  return (
    <section className="mt-8 rounded-3xl border border-cyan-500/30 bg-cyan-500/10 p-8">
      <h2 className="text-3xl font-extrabold">
        🚀 AI Competitor Gap Finder
      </h2>

      <p className="mt-2 text-zinc-400">
        Content opportunities your competitors are missing.
      </p>

      <div className="mt-8 space-y-4">
        {gaps.map((gap) => (
          <div
            key={gap.topic}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {gap.topic}
              </h3>

              <span className="rounded-full bg-cyan-500 px-4 py-1 text-sm font-bold text-black">
                {gap.opportunity}/100
              </span>
            </div>

            <p className="mt-3 text-zinc-300">
              {gap.reason}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}