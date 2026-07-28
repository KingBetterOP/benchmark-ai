import { Video } from "../lib/types";
import { analyzeTitle } from "../lib/titleAnalyzer";

type Props = {
  video: Video;
};

export default function TitleAnalysisCard({
  video,
}: Props) {
  const titleAnalysis = analyzeTitle(
    video.snippet.title
  );

  return (
    <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">

      <p className="mb-3 text-sm font-semibold text-cyan-300">
        📝 Title Analysis
      </p>

      <div className="grid grid-cols-2 gap-3">

        <div className="rounded-lg bg-zinc-800/50 p-3">
          <p className="text-xs text-zinc-400">
            SEO
          </p>

          <h4 className="text-xl font-bold">
            {titleAnalysis.seo}
          </h4>
        </div>

        <div className="rounded-lg bg-zinc-800/50 p-3">
          <p className="text-xs text-zinc-400">
            CTR
          </p>

          <h4 className="text-xl font-bold">
            {titleAnalysis.ctr}
          </h4>
        </div>

        <div className="rounded-lg bg-zinc-800/50 p-3">
          <p className="text-xs text-zinc-400">
            Emotion
          </p>

          <h4 className="text-xl font-bold">
            {titleAnalysis.emotion}
          </h4>
        </div>

        <div className="rounded-lg bg-zinc-800/50 p-3">
          <p className="text-xs text-zinc-400">
            Keyword
          </p>

          <h4 className="text-xl font-bold">
            {titleAnalysis.keyword}
          </h4>
        </div>

        <div className="col-span-2 rounded-lg bg-zinc-800/50 p-3">
          <p className="text-xs text-zinc-400">
            Length
          </p>

          <h4 className="text-xl font-bold">
            {titleAnalysis.length}/100
          </h4>
        </div>

      </div>

    </div>
  );
}