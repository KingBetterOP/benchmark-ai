import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey,
});

function createDescriptionSchema() {
  return {
    type: "object",

    additionalProperties: false,

    properties: {
      description: {
        type: "string",
        minLength: 1,
        maxLength: 5000,
      },
    },

    required: ["description"],
  };
}

function normalizeDescription(
  value: unknown
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
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
      language?: unknown;
      instruction?: unknown;
    };

    try {
      body =
        (await req.json()) as {
          keyword?: unknown;
          language?: unknown;
          instruction?: unknown;
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
    5. LANGUAGE
    ============================================================
    */

    const language =
      body.language === "ko"
        ? "Korean"
        : "English";

    /*
    ============================================================
    6. INSTRUCTION VALIDATION
    ============================================================
    */

    const instruction =
      typeof body.instruction === "string"
        ? body.instruction.trim()
        : "";

    if (instruction.length > 2000) {
      return NextResponse.json(
        {
          error:
            "Instruction is too long.",
        },
        {
          status: 400,
        }
      );
    }

    const growthInstruction =
      instruction ||
      "Create an SEO-optimized YouTube description that improves search discovery while maintaining strong viewer appeal.";

    /*
    ============================================================
    7. OPENAI STRUCTURED OUTPUT
    ============================================================
    */

    const response =
      await openai.responses.create({
        model: "gpt-4.1-mini",

        input: `
You are a professional YouTube SEO expert and growth strategist inside Benchmark AI.

Write the entire response in ${language}.

Create an SEO-optimized YouTube description for this topic.

Topic:
${keyword}

Growth Plan Instruction:
${growthInstruction}

Apply the Growth Plan instruction directly to the description.

Requirements:

1. Write approximately 150-200 words when the language naturally allows it.

2. Make the description natural and engaging.

3. Include important keywords naturally.

4. Optimize for YouTube search intent.

5. Clearly communicate the video's value.

6. Improve discoverability without keyword stuffing.

7. Include a natural call-to-action.

8. Make the description useful to real viewers.

9. Do not invent specific facts that were not provided.

10. Do not make unsupported promises.

11. Do not use excessive keyword repetition.

12. Do not include explanations outside the description.

13. Do not wrap the answer in markdown code fences.

14. Return only the final description.
`,

        text: {
          format: {
            type: "json_schema",
            name: "youtube_description",
            strict: true,
            schema:
              createDescriptionSchema(),
          },
        },
      });

    /*
    ============================================================
    8. PARSE STRUCTURED OUTPUT
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
        "Description JSON parsing failed:",
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
    9. EXTRACT DESCRIPTION
    ============================================================
    */

    const description =
      typeof parsed === "object" &&
      parsed !== null
        ? normalizeDescription(
            (
              parsed as Record<
                string,
                unknown
              >
            ).description
          )
        : "";

    /*
    ============================================================
    10. FINAL VALIDATION
    ============================================================
    */

    if (!description) {
      console.error(
        "AI returned an empty description."
      );

      return NextResponse.json(
        {
          error:
            "AI did not return a valid description.",
        },
        {
          status: 502,
        }
      );
    }

    /*
    ============================================================
    11. SUCCESS
    ============================================================
    */

    return NextResponse.json({
      success: true,
      description,
    });
  } catch (error) {
    console.error(
      "Description generation error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        description: "",
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate description.",
      },
      {
        status: 500,
      }
    );
  }
}