"use client";

type Props = {
  keyword: string;
  loading: boolean;
  loadingStep?: string;
  onCreate: () => void;
};

export default function OneClickCreator({
  keyword,
  loading,
  loadingStep,
  onCreate,
}: Props) {
  return (
    <section className="my-10 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8">

      <div className="flex flex-col items-center text-center">

        <h2 className="text-4xl font-extrabold">
          🚀 One-Click Creator
        </h2>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Generate your complete YouTube project with one click.
        </p>

        <button
          disabled={loading || !keyword}
          onClick={onCreate}
          className="mt-8 rounded-2xl bg-emerald-600 px-10 py-5 text-xl font-bold transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "🚀 Create Complete Project"}
        </button>

        {loading && (
          <div className="mt-6 w-full max-w-lg">

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-full animate-pulse rounded-full bg-emerald-500" />
            </div>

            <p className="mt-4 text-sm text-emerald-300">
              {loadingStep ?? "Preparing AI..."}
            </p>

          </div>
        )}

      </div>

    </section>
  );
}