import type { SavedProject } from "@/app/lib/projectStorage";

export type LaunchData = {
  keyword: string;

  benchmarkScore: number;
  opportunityScore: number;

  opportunityVerdict: string;

  competition: string;
  expectedViews: string;

  trend: string;
  demand: string;
  uploadTime: string;

  topVideos: {
    rank: number;
    title: string;
    channel: string;
    views: string;
    score: number;
  }[];

  bestTitle: string;

  projects: {
    name: string;
    keyword: string;
    score: number;
    updated: string;
  }[];
};

function formatViews(value: string | number | undefined) {
  if (value === undefined || value === null) {
    return "-";
  }

  if (typeof value === "string") {
    return value;
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getVerdict(
  score: number,
  opportunity: number
) {
  const combined =
    score * 0.5 +
    opportunity * 0.5;

  if (combined >= 80) {
    return "Strong Opportunity";
  }

  if (combined >= 65) {
    return "Worth Exploring";
  }

  if (combined >= 50) {
    return "Moderate Opportunity";
  }

  return "Needs More Research";
}

export function createLaunchData(
  project: SavedProject,
  projects: SavedProject[] = []
): LaunchData {
  const report = project.report;

  const keywordIntelligence =
    project.keywordIntelligence;

  const viralPrediction =
    project.viralPrediction;

  const benchmarkScore =
    project.benchmarkScore ??
    project.opportunityScoreV2?.total ??
    report?.score ??
    0;

  const opportunityScore =
    project.opportunityScore ??
    keywordIntelligence?.opportunity ??
    project.opportunityScoreV2?.total ??
    0;

  const sourceVideos =
    project.topVideos?.length
      ? project.topVideos
      : project.results ?? [];

  const topVideos = sourceVideos
    .slice(0, 5)
    .map((video, index) => ({
      rank: index + 1,

      title:
        video.snippet?.title ??
        "Untitled video",

      channel:
        video.snippet?.channelTitle ??
        video.channel?.name ??
        "Unknown channel",

      views: formatViews(
        video.statistics?.viewCount
      ),

      score:
        video.benchmarkScore ??
        Math.max(
          0,
          Math.min(
            100,
            Math.round(
              benchmarkScore -
                index * 4
            )
          )
        ),
    }));

  const bestTitle =
    project.titles?.[0]?.title ??
    topVideos[0]?.title ??
    project.keyword;

  const projectCards = projects
    .slice(0, 4)
    .map((item) => ({
      name:
        item.keyword ||
        "Untitled Project",

      keyword:
        item.keyword,

      score:
        item.benchmarkScore ??
        item.report?.score ??
        item.opportunityScoreV2?.total ??
        0,

      updated: item.updatedAt
        ? new Date(
            item.updatedAt
          ).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          )
        : "Recently",
    }));

  return {
    keyword:
      project.keyword,

    benchmarkScore,

    opportunityScore,

    opportunityVerdict:
      getVerdict(
        benchmarkScore,
        opportunityScore
      ),

    competition:
      viralPrediction?.competition ??
      "Unknown",

    expectedViews:
      viralPrediction?.expectedViews ??
      keywordIntelligence?.expectedViews ??
      report?.prediction
        ?.expectedViews ??
      "Unknown",

    trend:
      keywordIntelligence?.trend ??
      "Unknown",

    demand:
      keywordIntelligence?.demand ??
      "Unknown",

    uploadTime:
      keywordIntelligence?.uploadTime ??
      project.creatorWorkspace
        ?.uploadTime ??
      "Unknown",

    topVideos,

    bestTitle,

    projects:
      projectCards,
  };
}