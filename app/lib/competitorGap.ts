import { Video } from "./types";

export type ContentGap = {
  topic: string;
  opportunity: number;
  reason: string;
};

export function findCompetitorGaps(
  videos: Video[]
): ContentGap[] {
  if (videos.length === 0) return [];

  const gaps: ContentGap[] = [];

  const titles = videos.map((v) =>
    v.snippet.title.toLowerCase()
  );

  if (!titles.some((t) => t.includes("beginner"))) {
    gaps.push({
      topic: "Beginner Guide",
      opportunity: 96,
      reason:
        "Very few beginner-focused videos exist.",
    });
  }

  if (!titles.some((t) => t.includes("2026"))) {
    gaps.push({
      topic: "2026 Update",
      opportunity: 93,
      reason:
        "Most competitors have outdated content.",
    });
  }

  if (!titles.some((t) => t.includes("mistake"))) {
    gaps.push({
      topic: "Common Mistakes",
      opportunity: 91,
      reason:
        "Educational content is underrepresented.",
    });
  }

  if (!titles.some((t) => t.includes("vs"))) {
    gaps.push({
      topic: "Comparison (VS)",
      opportunity: 88,
      reason:
        "Comparison videos are missing.",
    });
  }

  if (!titles.some((t) => t.includes("secret"))) {
    gaps.push({
      topic: "Hidden Secrets",
      opportunity: 84,
      reason:
        "High CTR style is rarely used.",
    });
  }

  return gaps.sort(
    (a, b) => b.opportunity - a.opportunity
  );
}