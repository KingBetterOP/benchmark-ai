import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { keyword, language } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are the world's best YouTube thumbnail designer.

Write the ENTIRE response in ${
  language === "ko" ? "Korean" : "English"
}.

Generate ONE AI image prompt for a YouTube thumbnail.

Topic:
${keyword}

Requirements:
- Photorealistic
- Cinematic composition
- Ultra realistic
- High click-through-rate (CTR)
- Strong emotional expression
- Bright vibrant colors
- High contrast
- Professional lighting
- Modern YouTube style
- 16:9 composition
- Leave room for large title text
- Extremely detailed
- No camera settings
- No markdown
- No explanations
- Output ONLY the final image prompt
`,
    });

    return NextResponse.json({
      prompt: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        prompt: "Failed to generate thumbnail prompt.",
      },
      {
        status: 500,
      }
    );
  }
}