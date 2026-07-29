import { translations } from "../lib/translations";
type Props = {
  averageViews: number;
  averageDuration: string;
  averageTitleLength: number;
  totalVideos: number;
  highestViews: number;
  lowestViews: number;
  language: string;
};

export default function BenchmarkSummaryCard({
  averageViews,
  averageDuration,
  averageTitleLength,
  totalVideos,
  highestViews,
  lowestViews,
  language,
}: Props) {
    const t =
  translations[language as keyof typeof translations];
  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6">

      <h2 className="mb-5 text-2xl font-bold">
        📊 {t.benchmarkSummary}
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">
            {t.videos}
          </p>

          <h3 className="text-2xl font-bold">
            {totalVideos}
          </h3>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">
            {t.averageViews}
          </p>

          <h3 className="text-2xl font-bold">
            {averageViews.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">
            {t.averageDuration}
          </p>

          <h3 className="text-2xl font-bold">
            {averageDuration}
          </h3>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">
            {t.averageTitleLength}
          </p>

          <h3 className="text-2xl font-bold">
            {averageTitleLength}
          </h3>
        </div>
<div className="rounded-xl bg-zinc-900 p-4">
  <p className="text-sm text-zinc-400">
    {t.highestViews}
  </p>

  <h3 className="text-2xl font-bold text-green-400">
    {highestViews.toLocaleString()}
  </h3>
</div>

<div className="rounded-xl bg-zinc-900 p-4">
  <p className="text-sm text-zinc-400">
    {t.lowestViews}
  </p>

  <h3 className="text-2xl font-bold text-red-400">
    {lowestViews.toLocaleString()}
  </h3>
</div>
      </div>

    </div>
  );
}