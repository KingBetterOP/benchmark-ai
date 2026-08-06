"use client";

type Props = {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;

  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;

  onSearch: () => void;

  loading: boolean;

  language: string;

  min10Minutes: boolean;
  setMin10Minutes: React.Dispatch<React.SetStateAction<boolean>>;

  last30Days: boolean;
  setLast30Days: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBarV2({
  keyword,
  setKeyword,
  order,
  setOrder,
  onSearch,
  loading,
  language,
  min10Minutes,
  setMin10Minutes,
  last30Days,
  setLast30Days,
}: Props) {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !loading) {
      onSearch();
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex flex-col gap-5">

        <div className="text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            AI Research
          </p>

          <h2 className="text-3xl font-bold text-white md:text-5xl">
            {language === "ko"
              ? "YouTube를 AI로 분석해보세요"
              : "Analyze YouTube with AI"}
          </h2>

          <p className="mt-3 text-zinc-400">
            {language === "ko"
              ? "키워드를 입력하면 AI가 경쟁 채널과 콘텐츠를 분석합니다."
              : "Enter a keyword and Benchmark AI will analyze competitors and content opportunities."}
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              language === "ko"
                ? "예: ChatGPT"
                : "Search YouTube keyword..."
            }
            className="h-16 flex-1 rounded-2xl border border-zinc-700 bg-white/5 backdrop-blur-xl px-6 text-lg text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />

          <button
            onClick={onSearch}
            disabled={loading}
            className="h-16 rounded-2xl bg-blue-600 px-8 font-semibold text-white transition-all duration-300 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? (language === "ko" ? "분석 중..." : "Analyzing...")
              : (language === "ko" ? "분석 시작" : "Analyze")}
          </button>
        </div>
                <div className="flex flex-wrap items-center gap-4">

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-white/5 backdrop-blur-xl px-4 py-3 text-sm text-white outline-none"
          >
            <option value="relevance">
              {language === "ko" ? "관련도순" : "Relevance"}
            </option>

            <option value="viewCount">
              {language === "ko" ? "조회수순" : "Views"}
            </option>

            <option value="date">
              {language === "ko" ? "최신순" : "Latest"}
            </option>
          </select>

          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={min10Minutes}
              onChange={(e) =>
                setMin10Minutes(e.target.checked)
              }
            />
            {language === "ko"
              ? "10분 이상"
              : "10+ Minutes"}
          </label>

          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={last30Days}
              onChange={(e) =>
                setLast30Days(e.target.checked)
              }
            />
            {language === "ko"
              ? "최근 30일"
              : "Last 30 Days"}
          </label>

        </div>

      </div>
    </div>
  );
}