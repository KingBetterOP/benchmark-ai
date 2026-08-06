import { SEOOptimizer } from "../lib/types";

type Props = {
  optimizer: SEOOptimizer | null;
  language: string;
};

export default function SEOOptimizerCard({
  optimizer,
  language,
}: Props) {
  if (!optimizer) return null;
  const text =
  language === "ko"
    ? {
        title: "🚀 SEO 최적화",
        betterTitle: "더 나은 제목",
        betterDescription: "더 나은 설명",
        searchIntent: "검색 의도",
        tags: "태그",
        keywordCluster: "키워드 클러스터",
        rankingTips: "랭킹 팁",
      }
    : {
        title: "🚀 SEO Optimizer",
        betterTitle: "Better Title",
        betterDescription: "Better Description",
        searchIntent: "Search Intent",
        tags: "Tags",
        keywordCluster: "Keyword Cluster",
        rankingTips: "Ranking Tips",
      };

  return (
    <div className="rounded-2xl border border-green-500 bg-white/5 backdrop-blur-xl p-6">

      <h2 className="mb-6 text-3xl font-bold">
        {text.title}
      </h2>

      <div className="space-y-6">

        <div>
          <h3 className="mb-2 font-bold">
            {text.betterTitle}
          </h3>

          <p>{optimizer.betterTitle}</p>
        </div>

        <div>
          <h3 className="mb-2 font-bold">
            {text.betterDescription}
          </h3>

          <p>{optimizer.betterDescription}</p>
        </div>

        <div>
          <h3 className="mb-2 font-bold">
            {text.searchIntent}
          </h3>

          <p>{optimizer.searchIntent}</p>
        </div>

        <div>
          <h3 className="mb-2 font-bold">
            {text.tags}
          </h3>

          <div className="flex flex-wrap gap-2">
            {optimizer.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-green-600/20 px-3 py-1 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-bold">
            {text.keywordCluster}
          </h3>

          <ul className="space-y-1">
            {optimizer.keywordCluster.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-bold">
            {text.rankingTips}
          </h3>

          <ul className="space-y-1">
            {optimizer.rankingTips.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}