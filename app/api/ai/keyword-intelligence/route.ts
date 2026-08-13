import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey,
});

type VideoInput = {
  title?: unknown;
  channelTitle?: unknown;
  viewCount?: unknown;
  publishedAt?: unknown;
  duration?: unknown;
  [key: string]: unknown;
};

type KeywordIntelligence = {
  difficulty: number;
  opportunity: number;
  trend: string;
  demand: string;
  uploadTime: string;
  audience: string;
  expectedViews: string;
  expectedCTR: string;
  estimatedRPM: string;
  estimatedRevenue: string;
  recommendation: "MAKE THIS VIDEO" | "WAIT" | "AVOID";
  confidence: number;
};

function clampScore(value: unknown): number {
  if (typeof value !== "number") {
    return 0;
  }

  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(value))
  );
}

function cleanString(
  value: unknown,
  fallback = "-"
): string {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();

  return trimmed || fallback;
}

function normalizeRecommendation(
  value: unknown
): KeywordIntelligence["recommendation"] {
  if (
    value === "MAKE THIS VIDEO" ||
    value === "WAIT" ||
    value === "AVOID"
  ) {
    return value;
  }

  return "WAIT";
}

function normalizeResult(
  value: unknown
): KeywordIntelligence {
  const data =
    typeof value === "object" &&
    value !== null
      ? (value as Record<string, unknown>)
      : {};

  return {
    difficulty:
      clampScore(data.difficulty),

    opportunity:
      clampScore(data.opportunity),

    trend:
      cleanString(
        data.trend,
        "Unknown"
      ),

    demand:
      cleanString(
        data.demand,
        "Unknown"
      ),

    uploadTime:
      cleanString(
        data.uploadTime
      ),

    audience:
      cleanString(
        data.audience
      ),

    expectedViews:
      cleanString(
        data.expectedViews
      ),

    expectedCTR:
      cleanString(
        data.expectedCTR
      ),

    estimatedRPM:
      cleanString(
        data.estimatedRPM
      ),

    estimatedRevenue:
      cleanString(
        data.estimatedRevenue
      ),

    recommendation:
      normalizeRecommendation(
        data.recommendation
      ),

    confidence:
      clampScore(
        data.confidence
      ),
  };
}

function normalizeVideos(
  value: unknown
): VideoInput[] {
  if (!Array.isArray(value)) {
    return [];
  }

  /*
   * Keep the AI payload bounded.
   * Benchmark results normally contain enough
   * information in the first 50 videos.
   */
  return value
    .slice(0, 50)
    .filter(
      (video): video is VideoInput =>
        typeof video === "object" &&
        video !== null
    );
}

function createKeywordIntelligenceSchema() {
  return {
    type: "object",

    additionalProperties: false,

    properties: {
      difficulty: {
        type: "number",
        minimum: 0,
        maximum: 100,
      },

      opportunity: {
        type: "number",
        minimum: 0,
        maximum: 100,
      },

      trend: {
        type: "string",
      },

      demand: {
        type: "string",
      },

      uploadTime: {
        type: "string",
      },

      audience: {
        type: "string",
      },

      expectedViews: {
        type: "string",
      },

      expectedCTR: {
        type: "string",
      },

      estimatedRPM: {
        type: "string",
      },

      estimatedRevenue: {
        type: "string",
      },

      recommendation: {
        type: "string",
        enum: [
          "MAKE THIS VIDEO",
          "WAIT",
          "AVOID",
        ],
      },

      confidence: {
        type: "number",
        minimum: 0,
        maximum: 100,
      },
    },

    required: [
      "difficulty",
      "opportunity",
      "trend",
      "demand",
      "uploadTime",
      "audience",
      "expectedViews",
      "expectedCTR",
      "estimatedRPM",
      "estimatedRevenue",
      "recommendation",
      "confidence",
    ],
  };
}

function fallbackResult(): KeywordIntelligence {
  return {
    difficulty: 0,
    opportunity: 0,
    trend: "Unknown",
    demand: "Unknown",
    uploadTime: "-",
    audience: "-",
    expectedViews: "-",
    expectedCTR: "-",
    estimatedRPM: "-",
    estimatedRevenue: "-",
    recommendation: "WAIT",
    confidence: 0,
  };
}

export async function POST(
  req: Request
) {
  try {
    /*
    ============================================================
    1. AUTHENTICATION
    ============================================================
    */

    const { userId } =
      await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /*
    ============================================================
    2. OPENAI API KEY
    ============================================================
    */

    if (!apiKey) {
      console.error(
        "OPENAI_API_KEY is missing."
      );

      return NextResponse.json(
        {
          error:
            "OpenAI API key is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
    ============================================================
    3. REQUEST BODY
    ============================================================
    */

    let body: {
      keyword?: unknown;
      videos?: unknown;
    };

    try {
      body =
        (await req.json()) as {
          keyword?: unknown;
          videos?: unknown;
        };
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ============================================================
    4. KEYWORD VALIDATION
    ============================================================
    */

    const keyword =
      typeof body.keyword === "string"
        ? body.keyword.trim()
        : "";

    if (!keyword) {
      return NextResponse.json(
        {
          error:
            "Keyword is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (keyword.length > 100) {
      return NextResponse.json(
        {
          error:
            "Keyword is too long.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ============================================================
    5. VIDEO DATA VALIDATION
    ============================================================
    */

    const videos =
      normalizeVideos(
        body.videos
      );

    if (videos.length === 0) {
      return NextResponse.json(
        {
          error:
            "Video data is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ============================================================
    6. OPENAI STRUCTURED ANALYSIS
    ============================================================
    */

    const response =
      await openai.responses.create({
        model: "gpt-4.1-mini",

        input: `
You are the Keyword Intelligence engine inside Benchmark AI.

Analyze the YouTube keyword using ONLY the supplied YouTube research data.

Return a structured analytical result.

Keyword:
${keyword}

YouTube Research Data:
${JSON.stringify(
  videos,
  null,
  2
)}

IMPORTANT RULES:

1. Use the supplied video data as the primary evidence.

2. Do not invent specific YouTube statistics that are not supported by the supplied data.

3. You may estimate derived metrics such as:
- difficulty
- opportunity
- expected views
- CTR
- RPM
- revenue

but these must be treated as analytical estimates based on the available evidence.

4. If the available data is insufficient to confidently estimate something, use:
"Unknown"
or
"-"

5. Scores must be between 0 and 100.

6. Confidence must be between 0 and 100.

7. recommendation must be exactly one of:
- MAKE THIS VIDEO
- WAIT
- AVOID

8. Difficulty:
Estimate how difficult it would be for a new or growing creator to compete for this topic.

9. Opportunity:
Estimate the opportunity relative to competition and apparent audience demand.

10. Trend:
Describe the apparent trend using the supplied video data.

11. Demand:
Describe apparent demand using the supplied data.

12. Upload time:
Provide a practical recommendation only if there is enough information to justify one.
Do not claim to have access to the user's private YouTube audience analytics.

13. Audience:
Describe the likely audience based on the topic and supplied videos.

14. Expected views:
Provide a realistic range based on the available research.
Do not guarantee performance.

15. Expected CTR:
Provide an estimated range or percentage.
Do not present it as guaranteed.

16. Estimated RPM:
Provide a reasonable estimate only when the topic allows it.
Otherwise return "-".

17. Estimated revenue:
Base this on the estimated views and RPM.
Do not represent it as guaranteed income.

18. Recommendation:
Choose the strongest action based on the overall evidence.

19. Confidence:
Reflect the quality and amount of evidence available.

Return ONLY the requested structured JSON.
`,
        text: {
          format: {
            type: "json_schema",
            name: "keyword_intelligence",
            strict: true,
            schema:
              createKeywordIntelligenceSchema(),
          },
        },
      });

    /*
    ============================================================
    7. PARSE STRUCTURED OUTPUT
    ============================================================
    */

    let parsed: unknown;

    try {
      parsed =
        JSON.parse(
          response.output_text
        );
    } catch (parseError) {
      console.error(
        "Keyword intelligence JSON parsing failed:",
        parseError
      );

      return NextResponse.json(
        {
          error:
            "AI returned an invalid structured response.",
        },
        {
          status: 502,
        }
      );
    }

    /*
    ============================================================
    8. NORMALIZE OUTPUT
    ============================================================
    */

    const result =
      normalizeResult(parsed);

    /*
    ============================================================
    9. SUCCESS
    ============================================================
    */

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(
      "Keyword intelligence generation error:",
      error
    );

    /*
    ============================================================
    10. SAFE ERROR RESPONSE
    ============================================================
    */

    return NextResponse.json(
      {
        success: false,
        ...fallbackResult(),
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate keyword intelligence.",
      },
      {
        status: 500,
      }
    );
  }
}