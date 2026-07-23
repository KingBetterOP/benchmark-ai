import VideoCard from "./VideoCard";
import ThumbnailAnalysis from "./ThumbnailAnalysis";
import { Video } from "../lib/types";
import { calculateBenchmarkScore } from "../lib/videoUtils";

type Props = {
  videos: Video[];
};

export default function VideoGrid({ videos }: Props) {
  if (videos.length === 0) return null;

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
      {videos.map((video) => (
        <div key={video.id}>
          <VideoCard
            video={video}
            score={calculateBenchmarkScore(video)}
          />

          <ThumbnailAnalysis
            thumbnail={video.snippet.thumbnails.high.url}
          />
        </div>
      ))}
    </div>
  );
}