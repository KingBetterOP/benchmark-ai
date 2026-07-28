import { Video } from "../lib/types";
import { calculateSEOScore } from "../lib/seoScore";

type Props = {
  video: Video;
};

export default function SEOCard({
  video,
}: Props) {
  const seoScore = calculateSEOScore(video);

  return (
    <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">

      <p className="mb-2 text-sm font-semibold text-blue-300">
        🔍 SEO Score
      </p>

      <h3 className="text-3xl font-bold text-blue-400">
        {seoScore}
        <span className="text-lg text-zinc-400">
          {" "}
          /100
        </span>
      </h3>

      <p className="mt-2 text-sm text-zinc-300">
        {seoScore >= 90
          ? "Excellent SEO optimization."
          : seoScore >= 75
          ? "Good SEO performance."
          : "SEO can be improved."}
      </p>

    </div>
  );
}