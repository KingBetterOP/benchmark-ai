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
  const isKo = language === "ko";

  const trendingKeywords = [
    {
      keyword: "ChatGPT",
      icon: "AI",
    },
    {
      keyword: "AI",
      icon: "✦",
    },
    {
      keyword: "Bitcoin",
      icon: "₿",
    },
    {
      keyword: "Finance",
      icon: "$",
    },
    {
      keyword: "Music",
      icon: "♫",
    },
    {
      keyword: "Gaming",
      icon: "▶",
    },
  ];

  const featureCards = [
    {
      icon: "⌕",
      eyebrow: isKo ? "RESEARCH" : "RESEARCH",
      title: isKo
        ? "YouTube 시장을 분석하세요"
        : "Understand the YouTube market",
      description: isKo
        ? "검색 결과와 경쟁 영상을 분석해 현재 시장의 수요와 경쟁 상황을 파악합니다."
        : "Analyze search results and competing videos to understand demand and competition.",
    },
    {
      icon: "◈",
      eyebrow: isKo ? "DECIDE" : "DECIDE",
      title: isKo
        ? "만들 가치가 있는지 판단하세요"
        : "Know what is worth making",
      description: isKo
        ? "기회 점수와 경쟁도, 트렌드를 바탕으로 콘텐츠 제작 여부를 판단합니다."
        : "Use opportunity, competition, and trend signals to decide what is worth creating.",
    },
    {
      icon: "✦",
      eyebrow: isKo ? "CREATE" : "CREATE",
      title: isKo
        ? "바로 콘텐츠를 제작하세요"
        : "Turn insight into content",
      description: isKo
        ? "분석 결과를 바탕으로 제목, 훅, 스크립트, SEO, 썸네일까지 연결합니다."
        : "Turn research into titles, hooks, scripts, SEO, thumbnails, and more.",
    },
  ];

  const workflow = [
    {
      number: "01",
      title: isKo ? "분석" : "Analyze",
      description: isKo
        ? "YouTube 데이터"
        : "YouTube data",
    },
    {
      number: "02",
      title: isKo ? "판단" : "Decide",
      description: isKo
        ? "기회 발견"
        : "Find opportunity",
    },
    {
      number: "03",
      title: isKo ? "제작" : "Create",
      description: isKo
        ? "콘텐츠 생성"
        : "Build content",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#07090F] text-white">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-60 top-0 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[220px]" />

        <div className="absolute right-0 top-20 h-[700px] w-[700px] rounded-full bg-blue-500/10 blur-[240px]" />

        <div className="absolute bottom-0 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[260px]" />
      </div>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24 text-center"
      >
        {/* ===================================================
            BADGE
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.15,
          }}
          className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-white/5 px-6 py-3 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-3xl"
        >
          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-400" />

          <span className="bg-gradient-to-r from-cyan-300 via-white to-blue-400 bg-clip-text text-sm font-semibold tracking-wide text-transparent">
            {isKo
              ? "AI 기반 YouTube Intelligence Platform"
              : "AI-Powered YouTube Intelligence Platform"}
          </span>
        </motion.div>

        {/* ===================================================
            MAIN HEADLINE
        =================================================== */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-10 max-w-6xl bg-gradient-to-r from-white via-cyan-200 to-blue-500 bg-clip-text text-5xl font-black leading-[1.05] tracking-tight text-transparent md:text-[92px]"
        >
          {isKo ? (
            <>
              다음
              <br />
              성공 영상을 데이터로 찾아보세요.
            </>
          ) : (
            <>
              Find Your
              <br />
              Next Winning Video.
            </>
          )}
        </motion.h1>

        {/* ===================================================
            VALUE PROPOSITION
        =================================================== */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.45,
          }}
          className="mt-8 max-w-3xl text-lg leading-9 text-zinc-300 md:text-xl"
        >
          {isKo
            ? "YouTube 데이터를 분석하고, 경쟁자를 비교하고, 콘텐츠 기회를 발견한 뒤 AI로 다음 영상을 제작하세요."
            : "Analyze YouTube data, compare competitors, discover content opportunities, and turn your next idea into content with AI."}
        </motion.p>

        {/* ===================================================
            WORKFLOW
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.55,
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {workflow.map((item, index) => (
            <div
              key={item.number}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl"
              >
                <span className="text-xs font-bold text-cyan-400">
                  {item.number}
                </span>

                <span className="text-sm font-semibold text-white">
                  {item.title}
                </span>

                <span className="hidden text-xs text-zinc-500 sm:inline">
                  {item.description}
                </span>
              </div>

              {index < workflow.length - 1 && (
                <span className="hidden text-zinc-600 sm:block">
                  →
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* ===================================================
            SEARCH
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
          }}
          className="mt-12 w-full max-w-5xl"
        >
          <div className="rounded-[32px] border border-cyan-400/10 bg-white/5 p-3 shadow-[0_0_70px_rgba(34,211,238,0.10)] backdrop-blur-3xl">
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !loading
                  ) {
                    onSearch();
                  }
                }}
                placeholder={
                  isKo
                    ? "예: AI tools, fitness, gaming, finance..."
                    : "Try a topic like AI tools, fitness, gaming, or finance..."
                }
                className="min-w-0 flex-1 rounded-2xl bg-transparent px-6 py-5 text-lg text-white outline-none placeholder:text-zinc-500"
              />

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                disabled={loading}
                onClick={onSearch}
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 font-bold text-white shadow-xl transition-all hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? isKo
                    ? "분석 중..."
                    : "Analyzing..."
                  : isKo
                  ? "무료로 분석하기"
                  : "Analyze for Free"}
              </motion.button>
            </div>
          </div>

          <p className="mt-4 text-sm text-zinc-500">
            {isKo
              ? "키워드 하나로 수요, 경쟁, 기회, 트렌드와 콘텐츠 전략을 확인하세요."
              : "Discover demand, competition, trends, opportunities, and content strategy from one keyword."}
          </p>
        </motion.div>

        {/* ===================================================
            FILTERS
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.85,
          }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
            <select
              value={order}
              onChange={(e) =>
                setOrder(e.target.value)
              }
              className="bg-transparent text-sm text-white outline-none"
            >
              <option
                className="bg-zinc-900"
                value="relevance"
              >
                {isKo
                  ? "관련도순"
                  : "Relevance"}
              </option>

              <option
                className="bg-zinc-900"
                value="viewCount"
              >
                {isKo
                  ? "조회수순"
                  : "View Count"}
              </option>

              <option
                className="bg-zinc-900"
                value="date"
              >
                {isKo
                  ? "최신순"
                  : "Latest"}
              </option>
            </select>
          </div>

          <button
            type="button"
            onClick={() =>
              setMin10Minutes(
                !min10Minutes
              )
            }
            className={`rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
              min10Minutes
                ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20"
                : "border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-500"
            }`}
          >
            ⏱{" "}
            {isKo
              ? "10분 이상"
              : "10+ Minutes"}
          </button>

          <button
            type="button"
            onClick={() =>
              setLast30Days(
                !last30Days
              )
            }
            className={`rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
              last30Days
                ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20"
                : "border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-500"
            }`}
          >
            ◷{" "}
            {isKo
              ? "최근 30일"
              : "Last 30 Days"}
          </button>

          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-300">
            ✦{" "}
            {isKo
              ? "AI 분석 준비 완료"
              : "AI Ready"}
          </div>
        </motion.div>

        {/* ===================================================
            PRODUCT VALUE
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
          }}
          className="mt-20 grid w-full max-w-6xl gap-5 md:grid-cols-3"
        >
          {featureCards.map(
            (item) => (
              <motion.div
                key={item.title}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="group rounded-[30px] border border-white/10 bg-white/[0.04] p-7 text-left backdrop-blur-3xl transition-all hover:border-cyan-400/30 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-xl text-cyan-300">
                    {item.icon}
                  </div>

                  <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-400/70">
                    {item.eyebrow}
                  </span>
                </div>

                <h2 className="mt-7 text-xl font-bold text-white">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>
              </motion.div>
            )
          )}
        </motion.div>

        {/* ===================================================
            TRENDING KEYWORDS
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.15,
          }}
          className="mt-20 w-full max-w-6xl"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/30" />

            <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">
              {isKo
                ? "인기 검색 키워드"
                : "Popular Searches"}
            </p>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/30" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {trendingKeywords.map(
              (item) => (
                <motion.button
                  type="button"
                  whileHover={{
                    y: -5,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  key={item.keyword}
                  onClick={() => {
                    setKeyword(
                      item.keyword
                    );

                    if (!loading) {
                      window.setTimeout(
                        () => {
                          onSearch();
                        },
                        0
                      );
                    }
                  }}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-2xl transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
                      {item.icon}
                    </div>

                    <div className="text-left">
                      <h3 className="font-bold text-white">
                        {item.keyword}
                      </h3>

                      <p className="mt-0.5 text-xs text-zinc-500">
                        {isKo
                          ? "바로 분석"
                          : "Analyze now"}
                      </p>
                    </div>
                  </div>
                </motion.button>
              )
            )}
          </div>
        </motion.div>

        {/* ===================================================
            TRUST SIGNALS
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.3,
          }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-500"
        >
          <div>
            ✦{" "}
            {isKo
              ? "AI 콘텐츠 분석"
              : "AI Content Intelligence"}
          </div>

          <div>
            ◉{" "}
            {isKo
              ? "YouTube 데이터"
              : "YouTube Data"}
          </div>

          <div>
            ⌕{" "}
            {isKo
              ? "키워드 인텔리전스"
              : "Keyword Intelligence"}
          </div>

          <div>
            ◈{" "}
            {isKo
              ? "경쟁 분석"
              : "Competition Analysis"}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}