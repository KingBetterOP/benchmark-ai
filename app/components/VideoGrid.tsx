"use client";

import { useState } from "react";
import VideoCard from "./VideoCard";
import ThumbnailAnalysis from "./ThumbnailAnalysis";
import { Video } from "../lib/types";
import { calculateBenchmarkScore } from "../lib/videoUtils";

type Props = {
  videos: Video[];
};

export default function VideoGrid({ videos }: Props) {
  const [openedId, setOpenedId] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {videos.map((video) => (
        <div
  key={video.id}
  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-300 hover:border-red-500"
>
          <VideoCard
            video={video}
            score={calculateBenchmarkScore(video)}
          />

          <button
            onClick={() =>
              setOpenedId(
                openedId === video.id ? null : video.id
              )
            }
            className="mt-3 w-full rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm font-semibold text-purple-300 transition-all duration-300 hover:bg-purple-500/20 hover:text-white"
          >
            {openedId === video.id
              ? "❌ Close Thumbnail Analysis"
              : "🎨 Analyze Thumbnail"}
          </button>

          {openedId === video.id && (
  <div className="mt-4 animate-in fade-in duration-300">
    <ThumbnailAnalysis
      thumbnail={video.snippet.thumbnails.high.url}
    />
  </div>
)}
        </div>
      ))}
    </div>
  );
}