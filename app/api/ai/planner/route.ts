import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { askAI } from "@/app/lib/openai";

import {
  consumeUsage,
} from "@/app/lib/usage";
export async function POST(req: NextRequest) {
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

    const body = await req.json();

    const keyword =
      typeof body.keyword === "string"
        ? body.keyword.trim()
        : "";

    const language =
      body.language === "ko"
        ? "ko"
        : "en";

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

    /* ========================================================
       3. CONSUME USAGE
       
       AI 실행 전에 1회 차감
    ======================================================== */

    let usage;

    try {
      usage =
        await consumeUsage(userId);
    } catch (usageError) {
      if (
        usageError instanceof Error &&
        usageError.message ===
          "USAGE_LIMIT_REACHED"
      ) {
        return NextResponse.json(
          {
            error:
              "Daily limit reached.",
            upgrade: true,
          },
          {
            status: 403,
          }
        );
      }

      throw usageError;
    }

    /* ========================================================
       4. AI PROMPT
    ======================================================== */

    const prompt = `
You are a professional YouTube strategist.

Generate a 30-day YouTube content plan.

Keyword:
${keyword}

Return ONLY valid JSON.

Example:

{
  "month":"30 Days",
  "items":[
    {
      "id":"1",
      "day":1,
      "title":"...",
      "keyword":"...",
      "contentType":"Shorts",
      "uploadTime":"19:00",
      "expectedViews":12000,
      "successProbability":83,
      "reason":"...",
      "status":"planned"
    }
  ]
}
`;

    /* ========================================================
       5. AI EXECUTION
    ======================================================== */

    try {
      const response =
        await askAI(
          prompt,
          language
        );

      const result =
        JSON.parse(response);

      /* ======================================================
         6. SUCCESS
      ====================================================== */

      return NextResponse.json({
        success: true,
        result,
        usage,
      });
    } catch (aiError) {
      /* ======================================================
         REFUND USAGE ON AI FAILURE
      ====================================================== */

      console.error(
        "Planner AI failed:",
        aiError
      );

      /*
       * 중요:
       * 여기서는 refundUsage를 추가해야 한다.
       */

      const {
        refundUsage,
      } = await import(
        "@/app/lib/usage"
      );

      try {
        await refundUsage(userId);
      } catch (refundError) {
        console.error(
          "Planner usage refund failed:",
          refundError
        );
      }

      throw aiError;
    }
  } catch (error) {
    console.error(
      "Planner generation failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Planner generation failed.",
      },
      {
        status: 500,
      }
    );
  }
}