import { NextResponse } from "next/server";

type GrowthAction = {
  id: string;
  category:
    | "title"
    | "thumbnail"
    | "hook"
    | "seo"
    | "content";
  priority: "HIGH" | "MEDIUM" | "LOW";
  impact: number;
  title: string;
  problem: string;
  recommendation: string;
  action: string;
};

type GrowthPlan = {
  overallScore: number;
  growthPotential: "HIGH" | "MEDIUM" | "LOW";
  summary: string;
  actions: GrowthAction[];
};

function clamp(
  value: number,
  min = 0,
  max = 100
) {
  return Math.max(
    min,
    Math.min(max, value)
  );
}

function safeNumber(value: unknown) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      keyword,
      benchmarkScore,
      opportunityScore,
      thumbnailScore,
      titleScore,
      seoScore,
      contentGap,
      expectedViews,
    } = body;

    if (!keyword?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Keyword is required.",
        },
        { status: 400 }
      );
    }

    const benchmark =
      safeNumber(benchmarkScore);

    const opportunity =
      safeNumber(opportunityScore);

    const thumbnail =
      safeNumber(thumbnailScore);

    const title =
      safeNumber(titleScore);

    const seo =
      safeNumber(seoScore);

    const gap =
      safeNumber(contentGap);

    /*
     * Growth score
     *
     * Higher opportunity + weaker current
     * execution = larger growth opportunity.
     */
    const executionAverage =
      (benchmark +
        thumbnail +
        title +
        seo) /
      4;

    const growthScore = clamp(
      Math.round(
        opportunity * 0.45 +
          executionAverage * 0.35 +
          Math.min(gap * 5, 100) * 0.2
      )
    );

    const growthPotential =
      growthScore >= 75
        ? "HIGH"
        : growthScore >= 50
          ? "MEDIUM"
          : "LOW";

    const actions: GrowthAction[] = [];

    /*
     * TITLE
     */
    if (title < 75) {
      actions.push({
        id: "improve-title",
        category: "title",
        priority:
          title < 55
            ? "HIGH"
            : "MEDIUM",
        impact: clamp(
          Math.round(100 - title)
        ),
        title:
          "Strengthen the title",
        problem:
          "The current title score leaves room for stronger click-through performance.",
        recommendation:
          "Use a clearer promise, stronger curiosity, and a specific viewer benefit.",
        action:
          `Generate stronger title variations for "${keyword}" and select the highest-potential option.`,
      });
    }

    /*
     * THUMBNAIL
     */
    if (thumbnail < 75) {
      actions.push({
        id: "improve-thumbnail",
        category: "thumbnail",
        priority:
          thumbnail < 55
            ? "HIGH"
            : "MEDIUM",
        impact: clamp(
          Math.round(100 - thumbnail)
        ),
        title:
          "Improve thumbnail packaging",
        problem:
          "The thumbnail score indicates additional room to improve visual click appeal.",
        recommendation:
          "Reduce visual clutter, create one dominant focal point, and make the promise immediately understandable.",
        action:
          `Generate a new thumbnail concept optimized for "${keyword}".`,
      });
    }

    /*
     * HOOK
     */
    if (
      benchmark < 70 ||
      opportunity >= 70
    ) {
      actions.push({
        id: "improve-hook",
        category: "hook",
        priority:
          opportunity >= 80
            ? "HIGH"
            : "MEDIUM",
        impact: clamp(
          Math.round(
            opportunity * 0.8
          )
        ),
        title:
          "Create a stronger opening hook",
        problem:
          "The opportunity level suggests the topic has room for stronger initial viewer capture.",
        recommendation:
          "Make the first 5–15 seconds immediately establish the problem, payoff, or unexpected result.",
        action:
          `Create 3 high-retention opening hooks for "${keyword}".`,
      });
    }

    /*
     * SEO
     */
    if (seo < 75) {
      actions.push({
        id: "improve-seo",
        category: "seo",
        priority:
          seo < 55
            ? "HIGH"
            : "MEDIUM",
        impact: clamp(
          Math.round(100 - seo)
        ),
        title:
          "Strengthen search optimization",
        problem:
          "Search optimization can be improved to capture more relevant discovery traffic.",
        recommendation:
          "Align the primary keyword with the title, description, tags, and natural language used in the video.",
        action:
          `Build an SEO package around the keyword "${keyword}".`,
      });
    }

    /*
     * CONTENT GAP
     */
    if (gap > 0) {
      actions.push({
        id: "close-content-gap",
        category: "content",
        priority:
          gap >= 5
            ? "HIGH"
            : "MEDIUM",
        impact: clamp(
          Math.round(gap * 12)
        ),
        title:
          "Exploit the content gap",
        problem:
          `${gap} content gap${gap === 1 ? "" : "s"} indicate opportunities competitors may not be fully covering.`,
        recommendation:
          "Turn the strongest unmet viewer need into a differentiated content angle.",
        action:
          `Create a content concept specifically designed to exploit the strongest gap around "${keyword}".`,
      });
    }

    /*
     * FALLBACK
     */
    if (actions.length === 0) {
      actions.push({
        id: "optimize-existing",
        category: "content",
        priority: "MEDIUM",
        impact: 50,
        title:
          "Optimize the existing strategy",
        problem:
          "The current scores are already relatively strong.",
        recommendation:
          "Focus on incremental improvements rather than rebuilding the entire strategy.",
        action:
          `Generate optimization ideas for the current "${keyword}" strategy.`,
      });
    }

    /*
     * Highest impact first
     */
    actions.sort(
      (a, b) => b.impact - a.impact
    );

    /*
     * Limit the plan to the most
     * actionable recommendations.
     */
    const finalActions =
      actions.slice(0, 5);

    const summary =
      growthPotential === "HIGH"
        ? `The "${keyword}" opportunity is strong. The fastest path to growth is to improve the highest-impact packaging and content weaknesses first.`
        : growthPotential === "MEDIUM"
          ? `The "${keyword}" opportunity is promising. Focus on the largest execution gaps before expanding into more content.`
          : `The "${keyword}" opportunity is currently moderate. Focus on efficient optimization and validate the strongest content angle before scaling.`;

    const result: GrowthPlan = {
      overallScore:
        growthScore,
      growthPotential,
      summary,
      actions: finalActions,
    };

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(
      "Growth Plan API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate growth plan.",
      },
      { status: 500 }
    );
  }
}