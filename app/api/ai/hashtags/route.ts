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

function cleanHashtag(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  let tag = value.trim();

  if (!tag) {
    return "";
  }

  // Remove common list formatting
  tag = tag
    .replace(/^[-•*\d.)\s]+/, "")
    .replace(/^["']|["']$/g, "")
    .trim();

  if (!tag) {
    return "";
  }

  // Remove spaces inside hashtags
  tag = tag.replace(/\s+/g, "");

  // Ensure # prefix
  if (!tag.startsWith("#")) {
    tag = `#${tag}`;
  }

  return tag;
}

function normalizeHashtags(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const result: string[] = [];

  for (const item of value) {
    const tag = cleanHashtag(item);

    if (!tag) {
      continue;
    }

    const normalized = tag.toLowerCase();

    if (
      result.some(
        (existing) =>
          existing.toLowerCase() === normalized
      )
    ) {
      continue;
    }

    result.push(tag);

    if (result.length >= 20) {
      break;
    }
  }

  return result;
}

function createHashtagSchema() {
  return {
    type: "object",

    additionalProperties: false,

    properties: {
      hashtags: {
        type: "array",

        items: {
          type: "string",
        },

        minItems: 20,
        maxItems: 20,
      },
    },

    required: ["hashtags"],
  };
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
      typeof body.keyword === "string"
        ? body.keyword.trim()
        : "";

    const language =
      typeof body.language === "string"
        ? body.language.trim()
        : "en";

    const instruction =
      typeof body.instruction === "string"
        ? body.instruction.trim()
        : "";

    /*
    ============================================================
    4. VALIDATION
    ============================================================
    */

    if (!keyword) {
      return NextResponse.json(
        {
          success: false,
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
          success: false,
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
      "Generate a strong mix of broad, specific, and niche YouTube hashtags that are directly relevant to the topic and useful for discoverability.";

    /*
    ============================================================
    7. AI GENERATION
    ============================================================
    */

    const response =
      await openai.responses.create({
        model: "gpt-4.1-mini",

        input: `
You are the YouTube Hashtag Intelligence engine inside Benchmark AI.

Generate exactly 20 highly relevant YouTube hashtags.

Topic:
${keyword}

Language:
${selectedLanguage}

Growth Plan Instruction:
${growthInstruction}

Important rules:

1. Generate exactly 20 hashtags.
2. Every hashtag must begin with #.
3. Do not use duplicate hashtags.
4. Use a mixture of:
   - broad topic hashtags
   - specific topic hashtags
   - niche audience hashtags
   - relevant content-format hashtags
5. Every hashtag must be directly relevant to the topic.
6. Avoid spammy hashtags.
7. Avoid unrelated trending hashtags.
8. Do not invent fake brands, creators, events, or organizations.
9. Do not claim that a hashtag has a specific search volume unless actual search-volume data was provided.
10. Prioritize semantic relevance and likely discoverability.
11. Keep hashtags concise and natural.
12. Return ONLY the requested JSON structure.

Topic relevance is more important than artificially forcing popular hashtags.
`,

        text: {
          format: {
            type: "json_schema",

            name: "youtube_hashtags",

            strict: true,

            schema:
              createHashtagSchema(),
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
      parsed = JSON.parse(
        response.output_text
      );
    } catch {
      console.error(
        "Hashtag JSON parsing failed:",
        response.output_text
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "AI returned an invalid hashtag response.",
        },
        {
          status: 502,
        }
      );
    }

    /*
    ============================================================
    9. NORMALIZE
    ============================================================
    */

    const source =
      typeof parsed === "object" &&
      parsed !== null
        ? (parsed as Record<string, unknown>)
        : {};

    const hashtags =
      normalizeHashtags(
        source.hashtags
      );

    /*
    ============================================================
    10. FINAL VALIDATION
    ============================================================
    */

    if (hashtags.length !== 20) {
      console.error(
        "Invalid hashtag count:",
        hashtags
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "AI returned an invalid number of hashtags.",
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

      // Array for reliable internal/frontend processing
      hashtags,

      // Backward-compatible string
      hashtagsText:
        hashtags.join("\n"),
    });
  } catch (error) {
    console.error(
      "Hashtag generation error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        hashtags: [],
        hashtagsText: "",
        error:
          "Failed to generate hashtags.",
      },
      {
        status: 500,
      }
    );
  }
}