"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#09090B] px-6 text-white">

      <h1 className="text-4xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-4 text-zinc-400 text-center max-w-md">
        An unexpected error occurred while loading Benchmark AI.
      </p>

      <button
        onClick={reset}
        className="mt-8 rounded-xl bg-emerald-600 px-6 py-3 font-semibold hover:bg-emerald-700"
      >
        Try Again
      </button>

    </main>
  );
}