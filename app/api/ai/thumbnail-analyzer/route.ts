import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      title,
      thumbnailPrompt,
    } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Return ONLY valid JSON.

{
  "ctrScore": 85,
  "emotionScore": 90,
  "colorScore": 82,
  "textScore": 80,
  "overallScore": 87,
  "strengths": [
    "...",
    "...",
    "..."
  ],
  "improvements": [
    "...",
    "...",
    "..."
  ]
}

Analyze this YouTube thumbnail concept.

Title:
${title}

Thumbnail Prompt:
${thumbnailPrompt}

Evaluate:

- Expected CTR
- Emotional impact
- Color effectiveness
- Text readability
- Overall quality

Return ONLY valid JSON.
`,
    });

    return NextResponse.json(
      JSON.parse(response.output_text)
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ctrScore: 0,
        emotionScore: 0,
        colorScore: 0,
        textScore: 0,
        overallScore: 0,
        strengths: [],
        improvements: [],
      },
      {
        status: 500,
      }
    );
  }
}