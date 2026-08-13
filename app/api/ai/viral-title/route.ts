import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey,
});

function normalizeTitles(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) =>
      item
        .replace(
          /^\s*(?:\d+[\.\)]|[-•*])\s*/,
          ""
        )
        .trim()
    )
    .filter(Boolean)
    .slice(0, 10);
}

function createTitlesSchema() {
  return {
    type: "object",

    additionalProperties: false,

    properties: {
      titles: {
        type: "array",
        minItems: 10,
        maxItems: 10,
        items: {
          type: "string",
          minLength: 1,
          maxLength: 60,
        },
      },
    },

    required: ["titles"],
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
    2. API KEY VALIDATION
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
    };

    try {
      body =
        (await req.json()) as {
          keyword?: unknown;
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
    4. INPUT VALIDATION
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
    5. OPENAI STRUCTURED GENERATION
    ============================================================
    */

    const response =
      await openai.responses.create({
        model: "gpt-4.1-mini",

        input: `
You are the Viral Title Engine inside Benchmark AI.

Generate exactly 10 high-quality YouTube titles.

Topic:
${keyword}

Requirements:

1. English only.

2. Generate exactly 10 titles.

3. Every title must be under 60 characters.

4. Optimize for:
- CTR
- curiosity
- emotional interest
- clarity
- natural human language

5. Create a meaningful information gap.

6. Avoid generic titles.

7. Avoid misleading claims.

8. Avoid fake urgency.

9. Avoid excessive capitalization.

10. Avoid repetitive title structures.

11. Every title should be meaningfully different.

12. The titles must remain directly related to the topic.

13. Do not include numbering inside the title itself.

Return ONLY the structured JSON.
`,

        text: {
          format: {
            type: "json_schema",
            name: "viral_titles",
            strict: true,
            schema:
              createTitlesSchema(),
          },
        },
      });

    /*
    ============================================================
    6. PARSE STRUCTURED OUTPUT
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
        "Viral title JSON parsing failed:",
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
    7. NORMALIZE OUTPUT
    ============================================================
    */

    const rawTitles =
      typeof parsed === "object" &&
      parsed !== null &&
      Array.isArray(
        (parsed as Record<string, unknown>)
          .titles
      )
        ? (parsed as Record<string, unknown>)
            .titles
        : [];

    const titles =
      normalizeTitles(rawTitles);

    /*
    ============================================================
    8. OUTPUT VALIDATION
    ============================================================
    */

    const validTitles =
      titles
        .filter(
          (title) =>
            title.length > 0 &&
            title.length <= 60
        )
        .slice(0, 10);

    if (
      validTitles.length !== 10
    ) {
      console.error(
        "Invalid viral title count:",
        validTitles
      );

      return NextResponse.json(
        {
          error:
            "AI did not return exactly 10 valid titles.",
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
      titles: validTitles,
    });
  } catch (error) {
    console.error(
      "Viral title generation error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        titles: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate viral titles.",
      },
      {
        status: 500,
      }
    );
  }
}