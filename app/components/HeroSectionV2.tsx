"use client";

import { motion } from "framer-motion";

type HeroSectionV2Props = {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;

  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;

  loading: boolean;

  min10Minutes: boolean;
  setMin10Minutes: React.Dispatch<React.SetStateAction<boolean>>;

  last30Days: boolean;
  setLast30Days: React.Dispatch<React.SetStateAction<boolean>>;

  onSearch: () => void;

  language: string;
};

export default function HeroSectionV2({
  keyword,
  setKeyword,
  order,
  setOrder,
  loading,
  min10Minutes,
  setMin10Minutes,
  last30Days,
  setLast30Days,
  onSearch,
  language,
}: HeroSectionV2Props) {
  return (
    <section className="relative isolate overflow-hidden bg-[#07090F] text-white">
      {/* Aurora Background */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-60 top-0 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[220px]" />

        <div className="absolute right-0 top-20 h-[700px] w-[700px] rounded-full bg-blue-500/10 blur-[240px]" />

        <div className="absolute bottom-0 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[260px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center"
      >
                {/* Premium Badge */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-white/5 px-7 py-3 backdrop-blur-3xl shadow-[0_0_40px_rgba(34,211,238,0.08)]"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />

          <span className="bg-gradient-to-r from-cyan-300 via-white to-blue-400 bg-clip-text text-sm font-semibold tracking-wide text-transparent">
            {language === "ko"
              ? "AI 기반 YouTube Intelligence Platform"
              : "AI Powered YouTube Intelligence Platform"}
          </span>
        </motion.div>

        {/* Hero Title */}

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 max-w-6xl bg-gradient-to-r from-white via-cyan-200 to-blue-500 bg-clip-text text-6xl font-black leading-[1.05] tracking-tight text-transparent md:text-[110px]"
        >
          {language === "ko" ? (
            <>
              AI로
              <br />
              YouTube를 지배하세요.
            </>
          ) : (
            <>
              Dominate
              <br />
              YouTube with AI.
            </>
          )}
        </motion.h1>

        {/* Hero Description */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-8 max-w-4xl text-lg leading-9 text-zinc-300 md:text-xl"
        >
          {language === "ko"
            ? "Benchmark AI는 경쟁 채널 분석, 바이럴 키워드 탐색, CTR 예측, SEO 최적화, AI 콘텐츠 전략을 하나의 플랫폼에서 제공합니다."
            : "Benchmark AI analyzes competitors, discovers viral keywords, predicts CTR, optimizes SEO and generates complete AI-powered content strategies in one platform."}
        </motion.p>
                {/* Premium Badge */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-white/5 px-7 py-3 backdrop-blur-3xl shadow-[0_0_40px_rgba(34,211,238,0.08)]"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />

          <span className="bg-gradient-to-r from-cyan-300 via-white to-blue-400 bg-clip-text text-sm font-semibold tracking-wide text-transparent">
            {language === "ko"
              ? "AI 기반 YouTube Intelligence Platform"
              : "AI Powered YouTube Intelligence Platform"}
          </span>
        </motion.div>

        {/* Hero Title */}

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 max-w-6xl bg-gradient-to-r from-white via-cyan-200 to-blue-500 bg-clip-text text-6xl font-black leading-[1.05] tracking-tight text-transparent md:text-[110px]"
        >
          {language === "ko" ? (
            <>
              AI로
              <br />
              YouTube를 지배하세요.
            </>
          ) : (
            <>
              Dominate
              <br />
              YouTube with AI.
            </>
          )}
        </motion.h1>

        {/* Hero Description */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-8 max-w-4xl text-lg leading-9 text-zinc-300 md:text-xl"
        >
          {language === "ko"
            ? "Benchmark AI는 경쟁 채널 분석, 바이럴 키워드 탐색, CTR 예측, SEO 최적화, AI 콘텐츠 전략을 하나의 플랫폼에서 제공합니다."
            : "Benchmark AI analyzes competitors, discovers viral keywords, predicts CTR, optimizes SEO and generates complete AI-powered content strategies in one platform."}
        </motion.p>
                {/* Premium Filters */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="bg-transparent text-sm text-white outline-none"
            >
              <option className="bg-zinc-900" value="relevance">
                {language === "ko"
                  ? "🎯 관련도순"
                  : "🎯 Relevance"}
              </option>

              <option className="bg-zinc-900" value="viewCount">
                {language === "ko"
                  ? "🔥 조회수순"
                  : "🔥 View Count"}
              </option>

              <option className="bg-zinc-900" value="date">
                {language === "ko"
                  ? "🆕 최신순"
                  : "🆕 Latest"}
              </option>
            </select>
          </div>

          <button
            onClick={() =>
              setMin10Minutes(!min10Minutes)
            }
            className={`rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
              min10Minutes
                ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20"
                : "border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-500"
            }`}
          >
            ⏱️ {language === "ko"
              ? "10분 이상"
              : "10+ Minutes"}
          </button>

          <button
            onClick={() =>
              setLast30Days(!last30Days)
            }
            className={`rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
              last30Days
                ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20"
                : "border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-500"
            }`}
          >
            📅 {language === "ko"
              ? "최근 30일"
              : "Last 30 Days"}
          </button>

          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-300">
            ✅ AI Ready
          </div>
        </motion.div>
        {/* Premium Live Dashboard */}

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.95 }}
  className="mt-24 grid w-full max-w-6xl gap-6 md:grid-cols-4"
>
  {[
    {
      value: "1.2M+",
      label:
        language === "ko"
          ? "분석한 영상"
          : "Videos Analyzed",
      icon: "🎥",
      color: "from-cyan-500/20 to-blue-500/10",
    },
    {
      value: "98.4%",
      label:
        language === "ko"
          ? "AI 정확도"
          : "AI Accuracy",
      icon: "🧠",
      color: "from-emerald-500/20 to-green-500/10",
    },
    {
      value: "24/7",
      label:
        language === "ko"
          ? "실시간 분석"
          : "Live Analysis",
      icon: "⚡",
      color: "from-violet-500/20 to-indigo-500/10",
    },
    {
      value: "500K+",
      label:
        language === "ko"
          ? "키워드"
          : "Keywords",
      icon: "🚀",
      color: "from-orange-500/20 to-red-500/10",
    },
  ].map((item) => (
    <motion.div
      key={item.label}
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br ${item.color} p-7 backdrop-blur-3xl`}
    >
      <div className="flex items-center justify-between">
        <span className="text-4xl">
          {item.icon}
        </span>

        <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_20px_#34d399]" />
      </div>

      <h2 className="mt-8 text-5xl font-black tracking-tight text-white">
        {item.value}
      </h2>

      <p className="mt-3 text-sm uppercase tracking-wider text-zinc-400">
        {item.label}
      </p>

      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
      </div>
    </motion.div>
  ))}
</motion.div>
        {/* Trending Keywords */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-20 w-full max-w-6xl"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/30" />

            <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">
              {language === "ko"
                ? "실시간 인기 키워드"
                : "Trending Searches"}
            </p>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/30" />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                keyword: "ChatGPT",
                growth: "+187%",
              },
              {
                keyword: "AI",
                growth: "+154%",
              },
              {
                keyword: "Bitcoin",
                growth: "+92%",
              },
              {
                keyword: "Finance",
                growth: "+81%",
              },
              {
                keyword: "Music",
                growth: "+74%",
              },
              {
                keyword: "Gaming",
                growth: "+69%",
              },
            ].map((item) => (
              <motion.button
                whileHover={{
                  y: -6,
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.2,
                }}
                key={item.keyword}
                onClick={() => setKeyword(item.keyword)}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-2xl transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-xl shadow-lg shadow-cyan-500/20">
                    🔥
                  </div>

                  <div className="text-left">
                    <h3 className="font-bold text-white">
                      {item.keyword}
                    </h3>

                    <p className="mt-1 text-xs text-emerald-400">
                      {item.growth}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
                {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25 }}
          className="mt-20 w-full max-w-5xl"
        >
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-4 backdrop-blur-3xl shadow-[0_0_60px_rgba(34,211,238,0.08)]">
            <div className="flex flex-col gap-4 md:flex-row">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearch();
                }}
                placeholder={
                  language === "ko"
                    ? "검색할 키워드를 입력하세요..."
                    : "Search any YouTube keyword..."
                }
                className="flex-1 rounded-2xl bg-transparent px-6 py-5 text-lg text-white outline-none placeholder:text-zinc-500"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                onClick={onSearch}
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 font-bold text-white shadow-xl transition-all hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? language === "ko"
                    ? "분석 중..."
                    : "Analyzing..."
                  : language === "ko"
                  ? "AI 분석 시작"
                  : "Analyze"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-400"
        >
          <div>✓ AI Powered</div>
          <div>✓ Real-time YouTube Data</div>
          <div>✓ SEO Optimization</div>
          <div>✓ CTR Prediction</div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
          }}
          className="mt-20 flex flex-col items-center text-zinc-500"
        >
          <span className="mb-2 text-xs uppercase tracking-[0.35em]">
            Scroll
          </span>

          <div className="flex h-10 w-6 justify-center rounded-full border border-white/20">
            <motion.div
              animate={{
                y: [4, 18, 4],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
              }}
              className="mt-1 h-2 w-2 rounded-full bg-cyan-400"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}