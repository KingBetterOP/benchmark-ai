"use client";

type LaunchThumbnailProps = {
  brand?: string;
  tagline?: string;
};

export default function LaunchThumbnail({
  brand = "Benchmark AI",
  tagline = "Find your next winning YouTube video with AI",
}: LaunchThumbnailProps) {
  return (
    <div className="relative flex h-[240px] w-[240px] overflow-hidden rounded-[52px] bg-[#09090b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(34,211,238,0.28),transparent_58%)]" />

      <div className="relative z-10 flex w-full flex-col items-center justify-center">
        <div className="mb-4 flex h-[86px] w-[86px] items-center justify-center rounded-[26px] border border-cyan-300/30 bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_45px_rgba(34,211,238,0.35)]">
          <span className="text-[42px] font-black text-white">B</span>
        </div>

        <div className="text-center">
          <div className="text-[20px] font-bold tracking-tight text-white">
            {brand}
          </div>

          <div className="mt-1 px-5 text-[8px] leading-tight text-zinc-400">
            {tagline}
          </div>
        </div>
      </div>
    </div>
  );
}