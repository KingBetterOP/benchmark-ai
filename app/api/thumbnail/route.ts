import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt: `YouTube thumbnail, high CTR, vibrant colors, bold text, ${prompt}`,
      size: "1024x1024",
    });

    return NextResponse.json({
      image: response.data?.[0]?.b64_json ?? null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Thumbnail generation failed",
      },
      {
        status: 500,
      }
    );
  }
}