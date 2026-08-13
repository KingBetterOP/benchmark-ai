"use client";

type Params = {
  keyword: string;
  order: string;
  language: string;

  excludeShorts: boolean;
  min10Minutes: boolean;
  last30Days: boolean;

  onStep?: (text: string) => void;
  onProgress?: (progress: number) => void;
};

export async function benchmarkService({
  keyword,
  order,
  language,
  excludeShorts,
  min10Minutes,
  last30Days,
  onStep,
  onProgress,
}: Params) {
  onStep?.(
    language === "ko"
      ? "🔍 Benchmark 분석을 시작하는 중..."
      : "🔍 Starting Benchmark analysis..."
  );

  onProgress?.(5);

  const response = await fetch(
    "/api/benchmark",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        keyword,
        order,
        language,
        excludeShorts,
        min10Minutes,
        last30Days,
      }),
    }
  );

  if (!response.ok) {
    const data =
      await response.json().catch(() => null);

    throw new Error(
      data?.error ??
        "Benchmark analysis failed."
    );
  }

  onStep?.(
    language === "ko"
      ? "📊 Benchmark 결과를 불러오는 중..."
      : "📊 Loading Benchmark results..."
  );

  onProgress?.(90);

  const data = await response.json();

onStep?.(
  language === "ko"
    ? "✅ Benchmark 분석 완료!"
    : "✅ Benchmark analysis complete!"
);

onProgress?.(100);

return data.result;
}