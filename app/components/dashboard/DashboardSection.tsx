"use client";

import { motion } from "framer-motion";
import { Video } from "../../lib/types";
import {
  getDashboardStats,
  getDashboardSummary,
} from "../../lib/dashboardAnalytics";

import SearchOverview from "./SearchOverview";
import ViewAnalytics from "./ViewAnalytics";
import UploadAnalytics from "./UploadAnalytics";
import TopChannelCard from "./TopChannelCard";
import AISummaryCard from "./AISummaryCard";

type DashboardSectionProps = {
  keyword: string;
  videos: Video[];
  language: string;
};

export default function DashboardSection({
  keyword,
  videos,
  language,
}: DashboardSectionProps) {
  const stats = getDashboardStats(videos);
  const summary = getDashboardSummary(videos);

  return (
    <section className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.55,
        }}
        className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              {language === "ko"
                ? "Dashboard"
                : "Dashboard"}
            </p>

            <h2 className="mt-2 text-4xl font-black text-white">
              {language === "ko"
                ? "검색 결과 분석"
                : "Search Analytics"}
            </h2>

            <p className="mt-3 max-w-2xl text-zinc-400">
              {language === "ko"
                ? "검색된 YouTube 데이터를 기반으로 핵심 지표를 분석했습니다."
                : "Core metrics calculated from the YouTube search results."}
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3">
            <p className="text-xs uppercase tracking-widest text-cyan-300">
              {language === "ko"
                ? "현재 키워드"
                : "Current Keyword"}
            </p>

            <h3 className="mt-1 text-xl font-bold text-white">
              {keyword || "-"}
            </h3>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <SearchOverview
            stats={stats}
            summary={summary}
            language={language}
          />

          <ViewAnalytics
            stats={stats}
            summary={summary}
            language={language}
          />

          <UploadAnalytics
            stats={stats}
            language={language}
          />

          <TopChannelCard
            stats={stats}
            language={language}
          />
        </div>

        <div className="mt-6">
          <AISummaryCard
            stats={stats}
            language={language}
          />
        </div>
      </motion.div>
    </section>
  );
}