type Stat = {
  icon: string;
  title: string;
  value: string;
  color: string;
};

type Props = {
  stats: Stat[];
};

export default function StatsGrid({
  stats,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-6 p-8 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${stat.color} p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20`}
        >
          <div className="flex items-center justify-between">
            <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
              {stat.icon}
            </span>

            <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            {stat.title}
          </p>

          <h3 className="mt-3 break-words text-3xl font-extrabold text-white">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}