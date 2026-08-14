"use client";

type LaunchGalleryProps = {
  title: string;
  subtitle: string;
  eyebrow?: string;
  score?: number;
  verdict?: string;
  competition?: string;
  viralPotential?: string;
  growth?: string;
};

export default function LaunchGallery({
  title,
  subtitle,
  eyebrow = "BENCHMARK AI",
  score,
  verdict,
  competition,
  viralPotential,
  growth,
}: LaunchGalleryProps) {
  return (
    <section
      className="
        relative
        flex
        h-[760px]
        w-[1270px]
        overflow-hidden
        bg-[#07090d]
        text-white
      "
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_18%_85%,rgba(59,130,246,0.12),transparent_35%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.025),transparent_35%,rgba(255,255,255,0.015))]" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col px-[72px] py-[58px]">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_30px_rgba(34,211,238,0.28)]">
            <span className="text-xl font-black text-white">B</span>
          </div>

          <div>
            <div className="text-[15px] font-bold tracking-[0.18em] text-cyan-300">
              {eyebrow}
            </div>

            <div className="mt-1 text-[11px] text-zinc-500">
              AI-powered YouTube research platform
            </div>
          </div>
        </div>

        {/* Main title */}
        <div className="mt-[72px] max-w-[830px]">
          <h1 className="text-[54px] font-black leading-[1.04] tracking-[-0.04em]">
            {title}
          </h1>

          <p className="mt-7 max-w-[720px] text-[21px] leading-[1.45] text-zinc-400">
            {subtitle}
          </p>
        </div>

        {/* Verdict */}
        {typeof score === "number" && (
          <div className="mt-[64px] flex items-end gap-5">
            <div className="rounded-3xl border border-cyan-400/20 bg-white/[0.035] px-8 py-6 backdrop-blur-sm">
              <div className="text-[12px] font-semibold tracking-[0.18em] text-zinc-500">
                BENCHMARK SCORE
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[64px] font-black leading-none text-cyan-300">
                  {score}
                </span>

                <span className="text-[20px] font-semibold text-zinc-500">
                  / 100
                </span>
              </div>
            </div>

            {verdict && (
              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.06] px-7 py-6">
                <div className="text-[11px] font-semibold tracking-[0.18em] text-emerald-300/70">
                  AI VERDICT
                </div>

                <div className="mt-2 text-[24px] font-bold text-emerald-300">
                  {verdict}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Metrics */}
        {(competition || viralPotential || growth) && (
          <div className="mt-8 flex gap-4">
            {competition && (
              <Metric
                label="Competition"
                value={competition}
              />
            )}

            {viralPotential && (
              <Metric
                label="Viral Potential"
                value={viralPotential}
              />
            )}

            {growth && (
              <Metric
                label="Growth"
                value={growth}
              />
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-6">
          <div className="text-[12px] text-zinc-600">
            Benchmark AI · Find your next winning YouTube video
          </div>

          <div className="text-[11px] font-medium tracking-wide text-zinc-600">
            benchmark-ai-indol.vercel.app
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-[180px] rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600">
        {label}
      </div>

      <div className="mt-2 text-[17px] font-bold text-zinc-200">
        {value}
      </div>
    </div>
  );
}