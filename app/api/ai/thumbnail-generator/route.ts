import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_PROMPT_LENGTH = 5000;

export async function POST(
  req: NextRequest
) {
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

    let body: {
      prompt?: unknown;
    };

    try {
      body =
        (await req.json()) as {
          prompt?: unknown;
        };
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

    const prompt =
      typeof body.prompt === "string"
        ? body.prompt.trim()
        : "";

    /*
    ============================================================
    4. VALIDATION
    ============================================================
    */

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          error: "Prompt is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      prompt.length >
      MAX_PROMPT_LENGTH
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Prompt is too long.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ============================================================
    5. IMAGE GENERATION
    ============================================================
    */

    const image =
      await client.images.generate({
        model: "gpt-image-1",

        prompt,

        size: "1536x1024",
      });

    /*
    ============================================================
    6. VALIDATE RESPONSE
    ============================================================
    */

    const generatedImage =
      image.data?.[0];

    if (!generatedImage) {
      console.error(
        "OpenAI returned no generated image."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "No image generated.",
        },
        {
          status: 502,
        }
      );
    }

    /*
    ============================================================
    7. EXTRACT IMAGE DATA
    ============================================================
    */

    const imageBase64 =
      generatedImage.b64_json;

    const imageUrl =
      generatedImage.url;

    if (
      !imageBase64 &&
      !imageUrl
    ) {
      console.error(
        "Generated image contains neither b64_json nor url."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Generated image data is unavailable.",
        },
        {
          status: 502,
        }
      );
    }

    /*
    ============================================================
    8. SUCCESS
    ============================================================
    */

    return NextResponse.json({
      success: true,

      image: {
        b64_json:
          imageBase64 ?? null,

        url:
          imageUrl ?? null,
      },
    });
  } catch (error) {
    console.error(
      "Thumbnail image generation error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        image: null,
        error:
          "Failed to generate thumbnail.",
      },
      {
        status: 500,
      }
    );
  }
}