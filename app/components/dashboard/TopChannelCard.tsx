"use client";

import { motion } from "framer-motion";
import { DashboardStats } from "../../lib/dashboardAnalytics";

type Props = {
  stats: DashboardStats;
  language: string;
};

export default function TopChannelCard({
  stats,
  language,
}: Props) {
  const topChannel = stats.topChannel;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          {language === "ko"
            ? "채널"
            : "Channel"}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          {language === "ko"
            ? "대표 채널"
            : "Top Channel"}
        </h3>
      </div>

      {topChannel ? (
        <>
          <motion.div
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5"
          >
            <div className="flex items-center gap-4">
              <img
                src={topChannel.channel.thumbnail}
                alt={topChannel.channel.name}
                className="h-16 w-16 rounded-full border border-cyan-500/30 object-cover"
              />

              <div className="flex-1">
                <h4 className="text-xl font-bold text-white">
                  {topChannel.channel.name}
                </h4>

                <p className="mt-1 text-sm text-zinc-400">
                  {language === "ko"
                    ? `${topChannel.appearances}개 영상`
                    : `${topChannel.appearances} Videos`}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-black/20 p-4">
                <p className="text-xs text-zinc-400">
                  {language === "ko"
                    ? "평균 조회수"
                    : "Average Views"}
                </p>

                <h5 className="mt-2 text-lg font-bold text-cyan-300">
                  {Math.round(
                    topChannel.averageViews
                  ).toLocaleString()}
                </h5>
              </div>

              <div className="rounded-xl bg-black/20 p-4">
                <p className="text-xs text-zinc-400">
                  {language === "ko"
                    ? "구독자"
                    : "Subscribers"}
                </p>

                <h5 className="mt-2 text-lg font-bold text-cyan-300">
                  {topChannel.channel.subscribers.toLocaleString()}
                </h5>
              </div>

              <div className="rounded-xl bg-black/20 p-4">
                <p className="text-xs text-zinc-400">
                  {language === "ko"
                    ? "총 조회수"
                    : "Total Views"}
                </p>

                <h5 className="mt-2 text-lg font-bold text-cyan-300">
                  {Math.round(
                    topChannel.totalViews
                  ).toLocaleString()}
                </h5>
              </div>

              <div className="rounded-xl bg-black/20 p-4">
                <p className="text-xs text-zinc-400">
                  {language === "ko"
                    ? "채널 영상 수"
                    : "Channel Videos"}
                </p>

                <h5 className="mt-2 text-lg font-bold text-cyan-300">
                  {topChannel.channel.videos.toLocaleString()}
                </h5>
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-zinc-400">
          {language === "ko"
            ? "채널 정보를 찾을 수 없습니다."
            : "No channel data available."}
        </div>
      )}
    </div>
  );
}