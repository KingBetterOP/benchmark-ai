import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import {
  consumeUsage,
  getUsageStatus,
} from "@/app/lib/usage";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    /* ========================================================
       1. AUTH
    ======================================================== */

    const { userId } = await auth();

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

    /* ========================================================
       2. REQUEST
    ======================================================== */

    let body: {
      keyword?: unknown;
      language?: unknown;
      decision?: unknown;
      opportunityScore?: unknown;
      results?: unknown;
    };

    try {
      body = (await req.json()) as {
        keyword?: unknown;
        language?: unknown;
        decision?: unknown;
        opportunityScore?: unknown;
        results?: unknown;
      };
    } catch {
      return NextResponse.json(
        {
          error: "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    const keyword =
      typeof body.keyword === "string"
        ? body.keyword.trim()
        : "";

    if (!keyword) {
      return NextResponse.json(
        {
          error: "Keyword is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (keyword.length > 100) {
      return NextResponse.json(
        {
          error: "Keyword is too long.",
        },
        {
          status: 400,
        }
      );
    }

    const language =
      typeof body.language === "string"
        ? body.language
        : "en";

    const decision =
      typeof body.decision === "string"
        ? body.decision
        : "Unknown";

    const opportunityScore =
      typeof body.opportunityScore === "number"
        ? body.opportunityScore
        : null;

    const results =
      Array.isArray(body.results)
        ? body.results
        : [];

    /* ========================================================
       3. USAGE CHECK
    ======================================================== */

    const usageBefore =
      await getUsageStatus(userId);

    if (usageBefore.remaining <= 0) {
      return NextResponse.json(
        {
          error: "Daily limit reached.",
          upgrade: true,
          usage: usageBefore,
        },
        {
          status: 403,
        }
      );
    }

    /* ========================================================
       4. OPENAI
    ======================================================== */

    const response =
      await openai.responses.create({
        model: "gpt-4.1-mini",

        input: `
You are an expert YouTube content strategist.

Return ONLY valid JSON.
Do not use markdown.
Do not include explanations outside the JSON.

The JSON MUST follow exactly this structure:

{
  "angle": "string",
  "format": "string",
  "length": "string",
  "hook": "string",
  "structure": [
    "string",
    "string",
    "string",
    "string",
    "string"
  ],
  "cta": "string",
  "reasoning": "string"
}

Analyze the following YouTube research data.

Keyword:
${keyword}

Language:
${language}

Decision:
${decision}

Opportunity Score:
${opportunityScore ?? "Unknown"}

Research Results:
${JSON.stringify(results, null, 2)}

Create a practical content strategy based on the research.

Requirements:

1. angle
- Give the strongest content angle for this topic.
- Make it specific and differentiated from competitors.

2. format
- Recommend the best YouTube format.
- Examples: long-form video, Shorts, tutorial, comparison, documentary, list, case study, commentary.

3. length
- Recommend an appropriate video length.
- Give a realistic range such as "8-12 minutes" or "30-45 seconds".

4. hook
- Write a strong opening hook that can immediately capture attention.
- Make it usable as the first sentence of the video.

5. structure
- Provide exactly 5 clear steps for the video structure.
- Each item should describe what happens in that section.

6. cta
- Write a natural call-to-action that fits the content.
- Avoid generic or overly aggressive wording.

7. reasoning
- Explain why this strategy is recommended based on the available research.
- Mention demand, competition, opportunity, audience interest, or other relevant signals when available.

Make the strategy actionable and specific.

Return ONLY valid JSON.
`,
      });

    /* ========================================================
       5. PARSE RESULT
    ======================================================== */

    let parsedResult: {
      angle: string;
      format: string;
      length: string;
      hook: string;
      structure: string[];
      cta: string;
      reasoning: string;
    };

    try {
      parsedResult =
        JSON.parse(
          response.output_text
        );
    } catch {
      console.error(
        "Invalid OpenAI JSON response:",
        response.output_text
      );

      return NextResponse.json(
        {
          error:
            "AI returned an invalid response.",
        },
        {
          status: 502,
        }
      );
    }

    /* ========================================================
       6. CONSUME USAGE
       
       AI 성공 후에만 사용량 차감
    ======================================================== */

    const usage =
      await consumeUsage(userId);

    /* ========================================================
       7. SUCCESS
    ======================================================== */

    return NextResponse.json({
      ...parsedResult,
      usage,
    });
  } catch (error) {
    console.error(
      "Content strategy generation error:",
      error
    );

    if (
      error instanceof Error &&
      error.message ===
        "USAGE_LIMIT_REACHED"
    ) {
      return NextResponse.json(
        {
          error: "Daily limit reached.",
          upgrade: true,
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Content strategy generation failed.",
      },
      {
        status: 500,
      }
    );
  }
}