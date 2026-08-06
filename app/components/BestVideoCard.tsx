import { Video } from "../lib/types";
import { translations } from "../lib/translations";
import Image from "next/image";

type BestVideoCardProps = {
  video?: Video;
  language: string;
};

export default function BestVideoCard({
  video,
  language,
}: BestVideoCardProps) {
  if (!video) return null;
  const t =
  translations[language as keyof typeof translations];

  return (
    <div className="
mt-6
overflow-hidden
rounded-3xl
border
border-yellow-500/40
bg-gradient-to-br
from-zinc-900
via-zinc-900
to-black
p-8
shadow-2xl
shadow-yellow-500/10
">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-3xl">🏆</span>

        <h2 className="text-2xl font-bold">
          {t.bestVideo}
        </h2>
      </div>

      <div className="mb-5 overflow-hidden rounded-2xl">
  <Image
  src={video.snippet.thumbnails.high.url}
  alt={video.snippet.title}
  width={1280}
  height={720}
  className="
    h-[220px]
    w-full
    object-cover
    transition
    duration-500
    hover:scale-105
  "
/>
</div>

      <h3 className="line-clamp-2 text-2xl font-bold leading-tight">
        {video.snippet.title}
      </h3>

      <p className="mt-2 text-lg text-zinc-400">
        {video.snippet.channelTitle}
      </p>

      <p className="mt-4 text-2xl font-bold text-yellow-300">
        👀 {video.statistics.viewCount.toLocaleString()} {t.views}
      </p>
    </div>
  );
}