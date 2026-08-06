"use client";

import { Opportunity } from "../lib/types";
import { translations } from "../lib/translations";

type Props = {
  opportunities: Opportunity[];
  onSelect: (keyword: string) => void;
  onRefresh?: () => void;
  language: string;
};

export default function OpportunityFinder({
  opportunities,
  onSelect,
  onRefresh,
  language,
}: Props) {
  const t =
  translations[language as keyof typeof translations];
  if (opportunities.length === 0) return null;

  return (
    <section className="mx-auto mt-12 max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            {t.aiOpportunityFinder}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            🔥 {t.todayBestOpportunities}
          </h2>
        </div>

        <button
          onClick={onRefresh}
          className="rounded-xl border border-cyan-500 px-4 py-2 transition hover:bg-cyan-500/10"
        >
          {t.refresh}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {opportunities.map((item) => (
          <div
            key={item.keyword}
            onClick={() => onSelect(item.keyword)}
            className="cursor-pointer rounded-3xl border border-zinc-800 bg-gradient-to-br
from-zinc-900
via-zinc-900
to-black
backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-cyan-500/20"
          >
            <h3 className="text-2xl font-bold">
              {item.keyword}
            </h3>

            <div className="mt-6 space-y-3 text-zinc-300">
              <p>
                📉 {t.competition}:{" "}
                <strong className="text-red-400">
                  {item.competition}
                </strong>
              </p>

              <p>
                📈 {t.growth}:{" "}
                <strong className="text-green-400">
                  {item.growth}
                </strong>
              </p>

              <p>
                👀 {t.expectedViews}:{" "}
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
                {t.analyzeNow}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}