type Props = {
  keyword: string;
};

export default function SearchSummary({
  keyword,
}: Props) {
  return (
    <div className="mx-auto mt-10 mb-6 max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
      <h2 className="text-center text-2xl font-bold">
        🔍 Start Your AI Benchmark
      </h2>

      <p className="mt-2 text-center text-gray-400">
        검색어 <strong>{keyword || "입력"}</strong> 하나만 입력하면 AI가
        YouTube 시장을 분석합니다.
      </p>
    </div>
  );
}