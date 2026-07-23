"use client";

import { Opportunity } from "../lib/types";

type Props = {
  opportunities: Opportunity[];
  onSelect: (keyword: string) => void;
  onRefresh?: () => void;
};

export default function OpportunityFinder({
  opportunities,
  onSelect,
  onRefresh,
}: Props) {
  if (opportunities.length === 0) return null;

  return (
    <section className="mx-auto mt-12 max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            AI Opportunity Finder
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            🔥 Today's Best Opportunities
          </h2>
        </div>

        <button
          onClick={onRefresh}
          className="rounded-xl border border-cyan-500 px-4 py-2 transition hover:bg-cyan-500/10"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {opportunities.map((item) => (
          <div
            key={item.keyword}
            onClick={() => onSelect(item.keyword)}
            className="cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-bold">
              {item.keyword}
            </h3>

            <div className="mt-6 space-y-3 text-zinc-300">
              <p>
                📉 Competition:{" "}
                <strong className="text-red-400">
                  {item.competition}
                </strong>
              </p>

              <p>
                📈 Growth:{" "}
                <strong className="text-green-400">
                  {item.growth}
                </strong>
              </p>

              <p>
                👀 Expected Views:{" "}
                <strong className="text-cyan-400">
                  {item.expectedViews}
                </strong>
              </p>

              <p className="pt-3 text-sm leading-6 text-zinc-400">
                {item.reason}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(item.keyword);
                }}
                className="mt-6 w-full rounded-xl bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400"
              >
                🚀 Analyze Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}