import { BenchmarkReport } from "../lib/types";

type Props = {
  report: BenchmarkReport | null;
};

export default function BenchmarkReportCard({
  report,
}: Props) {
  if (!report) return null;

  return (
    <div className="rounded-2xl border border-cyan-500 bg-zinc-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        📊 Benchmark Report
      </h2>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-gray-400">
            Benchmark Score
          </p>

          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {report.score}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-gray-400">
            Avg Views
          </p>

          <p className="mt-2 text-xl font-bold">
            {report.overview.avgViews}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-gray-400">
            Avg Duration
          </p>

          <p className="mt-2 text-xl font-bold">
            {report.overview.avgDuration}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-gray-400">
            Upload Frequency
          </p>

          <p className="mt-2 text-xl font-bold">
            {report.overview.uploadFrequency}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-800 p-5">
        <h3 className="mb-3 text-xl font-bold">
          🏆 Best Video
        </h3>

        <p>{report.overview.bestVideo}</p>
      </div>

      <div className="mt-6 rounded-xl bg-zinc-800 p-5">
        <h3 className="mb-3 text-xl font-bold">
          💡 Insights
        </h3>

        <ul className="space-y-2">
          {report.insights.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl bg-zinc-800 p-5">
        <h3 className="mb-3 text-xl font-bold">
          🚀 Action Plan
        </h3>

        <ul className="space-y-2">
          {report.actionPlan.map((item, index) => (
            <li key={index}>✅ {item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl bg-zinc-800 p-5">
        <h3 className="mb-3 text-xl font-bold">
          📝 Analysis
        </h3>

        <p>{report.analysis}</p>
      </div>
    </div>
  );
}