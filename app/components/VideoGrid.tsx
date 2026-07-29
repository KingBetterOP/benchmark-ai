"use client";

import { useState } from "react";

import VideoCard from "./VideoCard";
import ThumbnailAnalysis from "./ThumbnailAnalysis";
import BenchmarkSummaryCard from "./BenchmarkSummaryCard";

import { Video } from "../lib/types";
import { calculateBenchmarkScore } from "../lib/videoUtils";
import { translations } from "../lib/translations";

type Props = {
  videos: Video[];
  language: string;
};

export default function VideoGrid({
  videos,
  language,
}: Props) {

  const t =
    translations[
      language as keyof typeof translations
    ];

  const [openedId, setOpenedId] =
    useState<string | null>(null);

  const VIDEOS_PER_PAGE = 20;

  const [currentPage, setCurrentPage] =
    useState(1);

  if (videos.length === 0) {
    return (
      <div className="mt-12 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 p-10 text-center">

        <div className="mb-4 text-5xl">
          🔍
        </div>

        <h2 className="text-2xl font-bold text-white">
          {t.emptySearchTitle}
        </h2>

        <p className="mt-3 text-zinc-400">
          {t.emptySearchDescription}
        </p>

      </div>
    );
  }
    const averageViews = Math.round(
    videos.reduce(
      (sum, video) =>
        sum +
        Number(video.statistics?.viewCount ?? 0),
      0
    ) / videos.length
  );

  const averageTitleLength = Math.round(
    videos.reduce(
      (sum, video) =>
        sum + video.snippet.title.length,
      0
    ) / videos.length
  );

  const averageDuration = "Coming Soon";

  const highestViews = Math.max(
    ...videos.map((video) =>
      Number(video.statistics?.viewCount ?? 0)
    )
  );

  const lowestViews = Math.min(
    ...videos.map((video) =>
      Number(video.statistics?.viewCount ?? 0)
    )
  );

  const totalPages = Math.ceil(
    videos.length / VIDEOS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * VIDEOS_PER_PAGE;

  const currentVideos = videos.slice(
    startIndex,
    startIndex + VIDEOS_PER_PAGE
  );

  return (
    <>
      <BenchmarkSummaryCard
        averageViews={averageViews}
        averageDuration={averageDuration}
        averageTitleLength={averageTitleLength}
        totalVideos={videos.length}
        highestViews={highestViews}
        lowestViews={lowestViews}
        language={language}
      />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {currentVideos.map((video) => (
          <div
            key={video.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-300 hover:border-red-500"
          >
            <VideoCard
              video={video}
              score={calculateBenchmarkScore(video)}
              language={language}
            />

            <button
              onClick={() =>
                setOpenedId(
                  openedId === video.id
                    ? null
                    : video.id
                )
              }
              className="mt-3 w-full rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm font-semibold text-purple-300 transition-all duration-300 hover:bg-purple-500/20 hover:text-white"
            >
              {openedId === video.id
                ? t.closeThumbnail
                : t.analyzeThumbnail}
            </button>

            {openedId === video.id && (
              <div className="mt-4 animate-in fade-in duration-300">
                <ThumbnailAnalysis
                  thumbnail={
                    video.snippet.thumbnails.high.url
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
            <div className="mt-10 flex flex-col items-center gap-6">

        <p className="text-sm text-zinc-400">
          {language === "ko"
            ? `${startIndex + 1}~${Math.min(
                startIndex + VIDEOS_PER_PAGE,
                videos.length
              )} / 총 ${videos.length}개 영상`
            : `Showing ${startIndex + 1}-${Math.min(
                startIndex + VIDEOS_PER_PAGE,
                videos.length
              )} of ${videos.length} videos`}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(page - 1, 1)
              )
            }
            className="rounded-xl border border-zinc-700 px-4 py-2 transition hover:border-cyan-400 disabled:opacity-40"
          >
            {language === "ko"
              ? "← 이전"
              : "← Previous"}
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`rounded-xl px-4 py-2 transition ${
                  currentPage === index + 1
                    ? "bg-cyan-500 font-bold text-black"
                    : "border border-zinc-700 hover:border-cyan-400"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(page + 1, totalPages)
              )
            }
            className="rounded-xl border border-zinc-700 px-4 py-2 transition hover:border-cyan-400 disabled:opacity-40"
          >
            {language === "ko"
              ? "다음 →"
              : "Next →"}
          </button>

        </div>

      </div>

    </>
  );
}