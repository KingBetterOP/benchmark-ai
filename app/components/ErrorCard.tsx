type Props = {
  message: string;
  onRetry: () => void;
};

export default function ErrorCard({
  message,
  onRetry,
}: Props) {
  return (
    <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">

      <div className="mb-4 text-6xl">
        ❌
      </div>

      <h2 className="text-3xl font-bold">
        Analysis Failed
      </h2>

      <p className="mt-4 text-zinc-300">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="mt-8 rounded-xl bg-red-600 px-8 py-3 font-semibold transition hover:bg-red-700"
      >
        🔄 Try Again
      </button>

    </div>
  );
}