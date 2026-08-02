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
You are a YouTube SEO expert.

Write the ENTIRE response in ${
  language === "ko" ? "Korean" : "English"
}.

Generate the best YouTube hashtags for this topic.

Topic:
${keyword}

Requirements:
- Generate exactly 20 hashtags
- Prioritize high-search-volume YouTube keywords
- Mix broad and niche hashtags
- Avoid duplicates
- Every hashtag must start with #
- Return ONLY hashtags
- One hashtag per line
- No numbering
- No explanations
`,
    });

    return NextResponse.json({
      hashtags: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        hashtags: "Failed to generate hashtags.",
      },
      {
        status: 500,
      }
    );
  }
}