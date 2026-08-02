import { ContentGap } from "../lib/types";

type Props = {
  gaps: ContentGap[];
};

export default function ContentGapCard({
  gaps,
}: Props) {
  if (!gaps.length) return null;

  return (
    <div className="mt-10 rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
        AI Content Gap
      </p>

      <h2 className="mt-2 text-4xl font-extrabold">
        🎯 Content Opportunities
      </h2>

      <div className="mt-6 space-y-6">
        {gaps.map((gap, index) => (
          <div
            key={index}
            className="rounded-2xl bg-zinc-900 p-5"
          >
            <h3 className="text-xl font-bold">
              {gap.keyword}
            </h3>

            <p className="mt-2 text-zinc-300">
              {gap.reason}
            </p>

            <div className="mt-4 flex gap-3 flex-wrap">
              <span className="rounded-full bg-green-500/20 px-3 py-1">
                Competition: {gap.competition}
              </span>

              <span className="rounded-full bg-cyan-500/20 px-3 py-1">
                Views: {gap.estimatedViews}
              </span>

              <span className="rounded-full bg-yellow-500/20 px-3 py-1">
                Opportunity: {gap.opportunityScore}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}