import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY,
});

export async function POST(
  request: NextRequest
) {
  console.log(
    "🔥 /api/analyze called"
  );

  try {
    const { userId } =
      await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const prompt =
      typeof body.prompt ===
      "string"
        ? body.prompt.trim()
        : "";

    const language =
      body.language === "ko"
        ? "ko"
        : "en";

    if (!prompt) {
      return NextResponse.json(
        {
          error:
            "AI prompt is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response =
      await openai.chat.completions.create(
        {
          model:
            "gpt-4.1-mini",

          temperature: 0.4,

          messages: [
            {
              role: "system",
              content:
                language === "ko"
                  ? `
당신은 Benchmark AI의 YouTube 분석 AI입니다.

반드시 한국어로 답변하세요.

사용자의 요청에 정확하게 답변하세요.

가능하면 구조화된 JSON을 반환하세요.
`
                  : `
You are the YouTube analysis engine
for Benchmark AI.

Answer accurately.

Return structured JSON whenever
the request requires structured data.
`,
            },

            {
              role: "user",
              content: prompt,
            },
          ],
        }
      );

    const result =
      response
        .choices[0]
        ?.message
        ?.content;

    if (!result) {
      throw new Error(
        "EMPTY_AI_RESULT"
      );
    }

    return NextResponse.json({
      result,
    });
  } catch (error) {
    console.error(
      "❌ /api/analyze failed:",
      error
    );

    return NextResponse.json(
  {
    error: "AI analysis failed.",
  },
  {
    status: 500,
  }
);
  }
}