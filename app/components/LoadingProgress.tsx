"use client";

type Props = {
  loading: boolean;
  loadingProgress: number;
  loadingStep: string;
};

export default function LoadingProgress({
  loading,
  loadingProgress,
  loadingStep,
}: Props) {
  if (!loading) return null;

  return (
    <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-cyan-500/30 bg-zinc-900 p-8 shadow-2xl">

      <h2 className="mb-6 text-center text-3xl font-bold">
        🤖 AI Analysis in Progress
      </h2>

      {/* Progress Bar */}
      <div className="mb-8 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
          style={{
            width: `${loadingProgress}%`,
          }}
        />
      </div>

      <p className="mb-6 text-center text-lg font-bold text-cyan-400">
        {loadingProgress}% Completed
      </p>

      <div className="space-y-4">

        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
          {loadingStep}
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4">
          <span>🔍 Searching YouTube</span>

          <span>
            {loadingProgress >= 30 ? "✅" : "⏳"}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4">
          <span>📊 Processing Videos</span>

          <span>
            {loadingProgress >= 50 ? "✅" : "⏳"}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4">
          <span>🤖 AI Analysis</span>

          <span>
            {loadingProgress >= 80 ? "✅" : "⏳"}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4">
          <span>📄 Building Dashboard</span>

          <span>
            {loadingProgress >= 100 ? "✅" : "⏳"}
          </span>
        </div>

      </div>

    </div>
  );
}