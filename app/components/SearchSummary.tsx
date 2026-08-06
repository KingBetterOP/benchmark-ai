type Props = {
  keyword: string;
  language: string;
};

export default function SearchSummary({
  keyword,
  language,
}: Props) {
  return (
    <div className="mx-auto mt-10 mb-6 max-w-4xl rounded-2xl border border-zinc-800 bg-white/5 backdrop-blur-xl p-6 shadow-lg">
      <h2 className="text-center text-2xl font-bold">
        {language === "ko"
  ? "🔍 AI 벤치마크 시작"
  : "🔍 Start Your AI Benchmark"}
      </h2>

      <p className="mt-2 text-center text-gray-400">
        {language === "ko" ? (
  <>
    검색어 <strong>{keyword || "입력"}</strong> 하나만 입력하면 AI가
    YouTube 시장을 분석합니다.
  </>
) : (
  <>
    Enter just one keyword{" "}
    <strong>{keyword || "Enter"}</strong> and AI will analyze the
    YouTube market.
  </>
)}
      </p>
    </div>
  );
}