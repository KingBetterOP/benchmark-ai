type DashboardProps = {
  keyword: string;
  averageViews: number;
  videoCount: number;
};

export default function Dashboard({
  keyword,
  averageViews,
  videoCount,
}: DashboardProps) {
  if (!keyword || videoCount === 0) return null;

  const stats = [
    {
      icon: "🔍",
      title: "Keyword",
      value: keyword,
      color: "from-blue-500/20 to-cyan-500/10",
    },
    {
      icon: "👀",
      title: "Average Views",
      value: averageViews.toLocaleString(),
      color: "from-emerald-500/20 to-green-500/10",
    },
    {
      icon: "🎥",
      title: "Videos Analyzed",
      value: `${videoCount}`,
      color: "from-orange-500/20 to-red-500/10",
    },
  ];

  return (
    <section className="mx-auto mt-10 max-w-6xl">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-400">
              Dashboard
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Benchmark Overview
            </h2>

            <p className="mt-2 text-zinc-400">
              Quick summary of your current benchmark analysis.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-zinc-700 bg-zinc-800/40 px-5 py-3 lg:block">
            <span className="text-sm text-zinc-400">
              Status
            </span>

            <p className="font-semibold text-emerald-400">
              Analysis Complete
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`rounded-2xl border border-zinc-800 bg-gradient-to-br ${stat.color} p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-xl`}
            >
              <div className="text-3xl">
                {stat.icon}
              </div>

              <p className="mt-4 text-sm uppercase tracking-wide text-zinc-400">
                {stat.title}
              </p>

              <h3 className="mt-2 break-words text-3xl font-bold text-white">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}