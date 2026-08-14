"use client";

type BenchmarkVideo = {
  rank: number;
  title: string;
  channel: string;
  views: string;
  score: number;
};

type BenchmarkShowcaseProps = {
  keyword: string;
  videos: BenchmarkVideo[];
};

export default function BenchmarkShowcase({
  keyword,
  videos,
}: BenchmarkShowcaseProps) {
  return (
    <section className="relative flex h-[760px] w-[1270px] overflow-hidden bg-[#07090f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(59,130,246,0.14),transparent_35%)]" />

      <div className="relative z-10 w-full px-[72px] py-[58px]">
        <div className="text-[14px] font-bold tracking-[0.25em] text-cyan-300">
          AI BENCHMARKING
        </div>

        <h1 className="mt-7 text-[52px] font-black tracking-[-0.04em]">
          See what is winning
          <br />
          around your topic.
        </h1>

        <p className="mt-5 text-[20px] text-zinc-400">
          AI-ranked competitive videos for{" "}
          <span className="font-semibold text-white">
            {keyword}
          </span>
        </p>

        <div className="mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]">
          <div className="grid grid-cols-[70px_1fr_150px_120px] border-b border-white/10 px-6 py-4 text-[11px] font-semibold tracking-[0.15em] text-zinc-500">
            <span>RANK</span>
            <span>VIDEO</span>
            <span>VIEWS</span>
            <span>AI SCORE</span>
          </div>

          {videos.slice(0, 5).map((video) => (
            <div
              key={`${video.rank}-${video.title}`}
              className="grid grid-cols-[70px_1fr_150px_120px] items-center border-b border-white/[0.06] px-6 py-5 last:border-0"
            >
              <span className="text-lg font-black text-cyan-300">
                #{video.rank}
              </span>

              <div className="min-w-0 pr-6">
                <div className="truncate text-[16px] font-semibold text-white">
                  {video.title}
                </div>

                <div className="mt-1 text-[12px] text-zinc-500">
                  {video.channel}
                </div>
              </div>

              <span className="text-sm font-medium text-zinc-300">
                {video.views}
              </span>

              <span className="text-lg font-bold text-cyan-300">
                {video.score}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-7 text-[12px] text-zinc-600">
          Benchmark AI analyzes market signals to help creators
          identify opportunities before publishing.
        </div>
      </div>
    </section>
  );
}