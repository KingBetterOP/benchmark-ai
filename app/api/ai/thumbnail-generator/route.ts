import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const image = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1536x1024",
    });

    if (!image.data || image.data.length === 0) {
  return NextResponse.json(
    { error: "No image generated." },
    { status: 500 }
  );
}

return NextResponse.json({
  image: image.data[0],
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate thumbnail.",
      },
      {
        status: 500,
      }
    );
  }
}