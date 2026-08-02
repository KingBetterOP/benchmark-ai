import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      keyword,
      videos,
    } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Return ONLY valid JSON.

{
  "opportunities": [
    {
      "title": "",
      "reason": ""
    },
    {
      "title": "",
      "reason": ""
    },
    {
      "title": "",
      "reason": ""
    },
    {
      "title": "",
      "reason": ""
    },
    {
      "title": "",
      "reason": ""
    }
  ]
}

Keyword:
${keyword}

Videos:
${JSON.stringify(videos)}

Analyze the videos and identify content opportunities that competitors are missing.

Focus on:
- Topics nobody covers
- Missing keywords
- Weak thumbnails
- Weak titles
- Missing audience segments
- New video angles

Use the provided YouTube data.

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
        opportunities: [],
      },
      {
        status: 500,
      }
    );
  }
}