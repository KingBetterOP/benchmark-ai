"use client";

type VerdictShowcaseProps = {
  score: number;
  opportunityScore: number;
  verdict: string;
  competition: string;
  expectedViews: string;
};

export default function VerdictShowcase({
  score,
  opportunityScore,
  verdict,
  competition,
  expectedViews,
}: VerdictShowcaseProps) {
  return (
    <section className="relative flex h-[760px] w-[1270px] overflow-hidden bg-[#07090f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_15%_90%,rgba(37,99,235,0.12),transparent_35%)]" />

      <div className="relative z-10 flex w-full flex-col px-[72px] py-[58px]">
        <div className="text-[14px] font-bold tracking-[0.25em] text-cyan-300">
          BENCHMARK AI
        </div>

        <h1 className="mt-8 max-w-[900px] text-[58px] font-black leading-[1.05] tracking-[-0.04em]">
          Know if your next video
          <br />
          is worth making.
        </h1>

        <p className="mt-6 max-w-[700px] text-[21px] leading-relaxed text-zinc-400">
          Turn YouTube market signals into a clear,
          actionable content decision.
        </p>

        <div className="mt-14 flex gap-5">
          <ScoreCard
            label="BENCHMARK SCORE"
            value={`${score}`}
            suffix="/ 100"
          />

          <ScoreCard
            label="OPPORTUNITY"
            value={`${opportunityScore}`}
            suffix="/ 100"
          />

          <ScoreCard
            label="EXPECTED VIEWS"
            value={expectedViews}
          />
        </div>

        <div className="mt-8 flex gap-5">
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.06] px-7 py-6">
            <div className="text-[11px] tracking-[0.2em] text-emerald-300/70">
              AI VERDICT
            </div>

            <div className="mt-2 text-[26px] font-bold text-emerald-300">
              {verdict}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-7 py-6">
            <div className="text-[11px] tracking-[0.2em] text-zinc-500">
              COMPETITION
            </div>

            <div className="mt-2 text-[26px] font-bold text-white">
              {competition}
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-white/[0.08] pt-6 text-[12px] text-zinc-600">
          Research → Decision → Create
        </div>
      </div>
    </section>
  );
}

function ScoreCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="min-w-[235px] rounded-3xl border border-white/10 bg-white/[0.035] px-7 py-6">
      <div className="text-[11px] font-semibold tracking-[0.18em] text-zinc-500">
        {label}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-[42px] font-black text-cyan-300">
          {value}
        </span>

        {suffix && (
          <span className="text-[16px] text-zinc-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}