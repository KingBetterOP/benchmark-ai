import { Video } from "../lib/types";
import { calculateSearchSEO } from "../lib/searchSeoScore";

type Props = {
  keyword: string;
  videos: Video[];
};

export default function SearchSEOCard({
  keyword,
  videos,
}: Props) {
  const seo = calculateSearchSEO(keyword, videos);

  return (
    <div className="mx-8 mt-8 overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-500/5 p-8 shadow-2xl shadow-cyan-500/10">

      <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
        SEO SCORE
      </p>

      <h2 className="mt-3 bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-5xl font-extrabold text-transparent">
        {seo.score}
        <span className="text-2xl text-zinc-400"> / 100</span>
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <div className="flex justify-between rounded-xl bg-black/20 p-4">
          <span>Title Length</span>
          <strong>{seo.title ? "✅" : "❌"}</strong>
        </div>

        <div className="flex justify-between rounded-xl bg-black/20 p-4">
          <span>Keyword Usage</span>
          <strong>{seo.keyword ? "✅" : "❌"}</strong>
        </div>

        <div className="flex justify-between rounded-xl bg-black/20 p-4">
          <span>Competition</span>
          <strong>{seo.competition ? "✅" : "⚠️"}</strong>
        </div>

        <div className="flex justify-between rounded-xl bg-black/20 p-4">
          <span>Search Volume</span>
          <strong>{seo.volume ? "✅" : "⚠️"}</strong>
        </div>

      </div>

    </div>
  );
}