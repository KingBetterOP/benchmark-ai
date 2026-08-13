import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type RequestBody = {
  keyword?: unknown;
  language?: unknown;
  instruction?: unknown;
};

function cleanString(
  value: unknown,
  maxLength: number
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .slice(0, maxLength);
}

export async function POST(req: Request) {
  try {
    /*
    ============================================================
    1. AUTH
    ============================================================
    */

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /*
    ============================================================
    2. API KEY
    ============================================================
    */

    if (!process.env.OPENAI_API_KEY) {
      console.error(
        "OPENAI_API_KEY is missing."
      );

      return NextResponse.json(
        {
          success: false,
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
    3. REQUEST
    ============================================================
    */

    let body: RequestBody;

    try {
      body =
        (await req.json()) as RequestBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    const keyword =
      cleanString(
        body.keyword,
        100
      );

    const language =
      cleanString(
        body.language,
        20
      );

    const instruction =
      cleanString(
        body.instruction,
        1000
      );

    /*
    ============================================================
    4. VALIDATION
    ============================================================
    */

    if (!keyword) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Keyword is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ============================================================
    5. LANGUAGE
    ============================================================
    */

    const selectedLanguage =
      language === "ko"
        ? "Korean"
        : "English";

    /*
    ============================================================
    6. GROWTH INSTRUCTION
    ============================================================
    */

    const growthInstruction =
      instruction ||
      "Create a highly clickable YouTube thumbnail that clearly communicates the topic and maximizes curiosity and CTR.";

    /*
    ============================================================
    7. AI GENERATION
    ============================================================
    */

    const response =
      await openai.responses.create({
        model: "gpt-4.1-mini",

        input: `
You are the Thumbnail Intelligence engine inside Benchmark AI.

Your task is to create ONE professional AI image-generation prompt for a YouTube thumbnail.

Topic:
${keyword}

Language:
${selectedLanguage}

Growth Plan Instruction:
${growthInstruction}

Apply the Growth Plan instruction directly to the thumbnail concept.

Requirements:

1. Create exactly ONE image-generation prompt.

2. The thumbnail must:
- Be photorealistic.
- Have a cinematic composition.
- Have a strong visual hierarchy.
- Have one primary focal point.
- Communicate the topic immediately.
- Create curiosity without misleading the viewer.
- Be optimized for YouTube CTR.
- Use strong contrast.
- Use vibrant but controlled colors.
- Use professional lighting.
- Have a modern YouTube thumbnail aesthetic.
- Be designed for a 16:9 composition.
- Remain understandable when displayed at a small size.

3. Composition:
- Clearly define the main subject.
- Clearly define the background.
- Clearly define important visual elements.
- Use depth and separation between foreground and background.
- Leave appropriate negative space for large thumbnail text.
- Avoid clutter.
- Avoid multiple competing focal points.

4. Human subjects:
- Use a strong and relevant facial expression when appropriate.
- The expression must match the topic.
- Do not add a human face when it does not improve the concept.

5. Text:
- Do NOT write the actual thumbnail title inside the prompt.
- Instead, specify where large readable text could be placed.
- Leave clear negative space for text.

6. Quality:
- Extremely detailed.
- Professional commercial quality.
- Visually striking.
- Instantly understandable.
- Suitable for an actual YouTube creator.

7. Avoid:
- Generic stock-photo appearance.
- Excessive visual clutter.
- Tiny unreadable details.
- Misleading imagery.
- Unrelated objects.
- Fake logos.
- Fake brands.
- Watermarks.
- Camera settings.
- Technical camera specifications.

Return ONLY the final image-generation prompt.

Do not include:
- Markdown
- Explanations
- Headings
- Quotes around the prompt
`,
      });

    /*
    ============================================================
    8. CLEAN OUTPUT
    ============================================================
    */

    const prompt =
      response.output_text
        .trim()
        .replace(/^["']|["']$/g, "")
        .trim();

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          error:
            "AI returned an empty thumbnail prompt.",
        },
        {
          status: 502,
        }
      );
    }

    /*
    ============================================================
    9. SUCCESS
    ============================================================
    */

    return NextResponse.json({
      success: true,
      prompt,
    });
  } catch (error) {
    console.error(
      "Thumbnail generation error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        prompt: "",
        error:
          "Failed to generate thumbnail prompt.",
      },
      {
        status: 500,
      }
    );
  }
}