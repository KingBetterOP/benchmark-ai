import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import {
  consumeUsage,
  refundUsage,
} from "@/app/lib/usage";

const apiKey = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey,
});

function createTitleSchema() {
  return {
    type: "object",

    additionalProperties: false,

    properties: {
      titles: {
        type: "array",
        minItems: 5,
        maxItems: 5,
        items: {
          type: "string",
          minLength: 1,
          maxLength: 100,
        },
      },
    },

    required: ["titles"],
  };
}

function normalizeTitles(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalized =
    value
      .filter(
        (title): title is string =>
          typeof title === "string"
      )
      .map((title) =>
        title
          .trim()
          .replace(
            /^["']|["']$/g,
            ""
          )
      )
      .filter(Boolean);

  /*
  ============================================================
  REMOVE DUPLICATES
  ============================================================
  */

  return normalized.filter(
    (title, index, array) =>
      array.findIndex(
        (item) =>
          item.toLowerCase() ===
          title.toLowerCase()
      ) === index
  );
}

export async function POST(
  req: Request
) {
  let userId: string | null = null;
  let usageConsumed = false;

  try {
    /*
    ============================================================
    1. AUTHENTICATION
    ============================================================
    */

    const authResult =
  await auth();

userId =
  authResult.userId;

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
      instruction?: unknown;
    };

    try {
      body =
        (await req.json()) as {
          keyword?: unknown;
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
    5. INSTRUCTION VALIDATION
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
      "Create highly clickable YouTube titles with strong curiosity and clear viewer value.";

    /*
============================================================
6. USAGE CHECK
============================================================
*/

let usage;

try {
  usage =
    await consumeUsage(
      userId
    );

  usageConsumed = true;
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

/*
============================================================
7. OPENAI STRUCTURED OUTPUT
============================================================
*/

const response =
  await client.responses.create({
        model: "gpt-5-mini",

        input: `
You are an expert YouTube growth strategist inside Benchmark AI.

Generate highly clickable YouTube titles.

TARGET KEYWORD:
${keyword}

GROWTH PLAN INSTRUCTION:
${growthInstruction}

Requirements:

1. Generate exactly 5 English YouTube titles.

2. Apply the Growth Plan instruction directly.

3. Make every title meaningfully different.

4. Optimize for:
- curiosity
- click-through rate
- clear viewer value
- natural human language

5. Do not use misleading claims.

6. Avoid generic titles.

7. Avoid repetitive title structures.

8. Avoid excessive capitalization.

9. Avoid fake urgency.

10. Keep titles suitable for real YouTube videos.

11. Do not add explanations.

12. Do not number the titles.

13. Each title should be no longer than 100 characters.

Return ONLY the structured JSON.
`,

        text: {
          format: {
            type: "json_schema",
            name: "youtube_titles",
            strict: true,
            schema:
              createTitleSchema(),
          },
        },
      });

    /*
    ============================================================
    7. PARSE STRUCTURED OUTPUT
    ============================================================
    */

    let parsed: unknown;

    try {} catch (parseError) {
  console.error(
    "Title JSON parsing failed:",
    parseError
  );

  throw new Error(
    "TITLE_INVALID_JSON"
  );
}

    /*
    ============================================================
    8. NORMALIZE OUTPUT
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
    9. FINAL VALIDATION
    ============================================================
    */

    const validTitles =
      titles.filter(
        (title) =>
          title.length > 0 &&
          title.length <= 100
      );

    if (
  validTitles.length !== 5
) {
  console.error(
    "Invalid title output:",
    validTitles
  );

  throw new Error(
    "TITLE_INVALID_OUTPUT"
  );
}

    /*
    ============================================================
    10. SUCCESS
    ============================================================
    */

    return NextResponse.json({
      success: true,
      titles: validTitles,
    });
  } catch (error) {
  console.error(
    "Title generation error:",
    error
  );

  if (
    usageConsumed &&
    userId
  ) {
    try {
      await refundUsage(
        userId
      );
    } catch (refundError) {
      console.error(
        "Failed to refund title usage:",
        refundError
      );
    }
  }

  return NextResponse.json(
    {
      success: false,
      titles: [],
      error:
        error instanceof Error
          ? error.message
          : "Failed to generate titles.",
    },
    {
      status: 500,
    }
  );
}
}