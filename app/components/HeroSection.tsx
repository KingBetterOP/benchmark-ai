type Props = {
  onStart: () => void;
};

export default function HeroSection({
  onStart,
}: Props) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
        🚀 AI Powered YouTube Intelligence
      </div>

      <h1 className="mx-auto max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
        The AI Operating System
        <br />
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          for YouTube Creators
        </span>
      </h1>

      <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-zinc-400">
        Analyze competitors, discover viral content opportunities,
        generate AI-powered strategies, and grow your YouTube
        channel with data instead of guesswork.
      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <button
          onClick={onStart}
          className="rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
        >
          🚀 Start Benchmark
        </button>

        <button className="rounded-2xl border border-zinc-700 bg-zinc-900 px-8 py-4 text-lg transition-all duration-300 hover:border-cyan-500 hover:bg-zinc-800">
          ▶ Watch Demo
        </button>
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-8 text-zinc-400">
        <div>🤖 AI Analysis</div>
        <div>📈 Competitor Research</div>
        <div>💡 Viral Ideas</div>
        <div>🎯 SEO Optimization</div>
        <div>📄 PDF Export</div>
      </div>
    </section>
  );
}