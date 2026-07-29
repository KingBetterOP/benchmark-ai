"use client";
import { translations } from "../lib/translations";

type Props = {
  loading: boolean;
  loadingProgress: number;
  loadingStep: string;
  language: string;
};

export default function LoadingProgress({
  loading,
  loadingProgress,
  loadingStep,
  language,
}: Props) {
  if (!loading) return null;

const t =
  translations[language as keyof typeof translations];

return (
    <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-cyan-500/30 bg-zinc-900 p-8 shadow-2xl">

      <div className="mb-6 text-center">
  <div className="mb-3 text-6xl animate-pulse">
    🤖
  </div>

  <h2 className="text-3xl font-bold">
    {t.loading}
  </h2>

  <p className="mt-2 text-zinc-400">
  {t.loadingSubtitle}
</p>
</div>

      {/* Progress Bar */}
      <div className="mb-8 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
          style={{
            width: `${loadingProgress}%`,
          }}
        />
      </div>

      <p className="mb-8 text-center text-3xl font-extrabold text-cyan-400">
        {loadingProgress}% Completed
      </p>

      <div className="space-y-4">

        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
          {loadingStep}
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4 transition-all duration-300 hover:border-cyan-500 hover:bg-zinc-800">
          <span>🔍 Searching YouTube</span>

          <span>
            <span className="text-xl">
  {loadingProgress >= 25 ? "✅" : "⏳"}
</span>
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4 transition-all duration-300 hover:border-cyan-500 hover:bg-zinc-800">
          <span>📊 Processing Videos</span>

          <span>
            {loadingProgress >= 50 ? "✅" : "⏳"}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4 transition-all duration-300 hover:border-cyan-500 hover:bg-zinc-800">
          <span>🤖 AI Analysis</span>

          <span>
            {loadingProgress >= 75 ? "✅" : "⏳"}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4 transition-all duration-300 hover:border-cyan-500 hover:bg-zinc-800">
          <span>📄 Building Dashboard</span>

          <span>
            {loadingProgress >= 100 ? "✅" : "⏳"}
          </span>
        </div>

      </div>
<p className="mt-8 text-center text-sm text-zinc-500">
  AI is processing thousands of data points to build your benchmark report.
</p>
    </div>
  );
}