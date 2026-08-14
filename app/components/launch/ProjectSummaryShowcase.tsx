"use client";

type ProjectSummaryShowcaseProps = {
  benchmarkScore: number;
  opportunityScore: number;
  competition: string;
  expectedViews: string;
  uploadTime: string;
  bestTitle: string;
};

export default function ProjectSummaryShowcase({
  benchmarkScore,
  opportunityScore,
  competition,
  expectedViews,
  uploadTime,
  bestTitle,
}: ProjectSummaryShowcaseProps) {
  return (
    <section className="relative flex h-[760px] w-[1270px] overflow-hidden bg-[#07090f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(34,211,238,0.13),transparent_34%)]" />

      <div className="relative z-10 w-full px-[72px] py-[58px]">
        <div className="text-[14px] font-bold tracking-[0.25em] text-cyan-300">
          PROJECT SUMMARY
        </div>

        <h1 className="mt-7 text-[52px] font-black tracking-[-0.04em]">
          From research
          <br />
          to a clear decision.
        </h1>

        <p className="mt-5 max-w-[700px] text-[20px] text-zinc-400">
          Everything you need to decide what to publish next.
        </p>

        <div className="mt-12 grid grid-cols-3 gap-5">
          <MetricCard
            label="BENCHMARK"
            value={`${benchmarkScore}`}
            suffix="/ 100"
          />

          <MetricCard
            label="OPPORTUNITY"
            value={`${opportunityScore}`}
            suffix="/ 100"
          />

          <MetricCard
            label="EXPECTED VIEWS"
            value={expectedViews}
          />

          <MetricCard
            label="COMPETITION"
            value={competition}
          />

          <MetricCard
            label="BEST UPLOAD"
            value={uploadTime}
          />

          <div className="rounded-3xl border border-cyan-400/15 bg-cyan-400/[0.04] p-6">
            <div className="text-[11px] tracking-[0.18em] text-cyan-300/70">
              BEST TITLE
            </div>

            <div className="mt-3 line-clamp-2 text-[18px] font-bold leading-relaxed text-white">
              {bestTitle}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] px-7 py-6">
          <div className="text-[11px] tracking-[0.18em] text-zinc-500">
            WORKFLOW
          </div>

          <div className="mt-4 flex items-center gap-5 text-[17px] font-semibold">
            <span>Research</span>
            <span className="text-cyan-400">→</span>
            <span>Opportunity</span>
            <span className="text-cyan-400">→</span>
            <span>Strategy</span>
            <span className="text-cyan-400">→</span>
            <span>Create</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="text-[11px] font-semibold tracking-[0.18em] text-zinc-500">
        {label}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-[31px] font-black text-white">
          {value}
        </span>

        {suffix && (
          <span className="text-sm text-zinc-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}