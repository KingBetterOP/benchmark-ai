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
  "difficulty": 65,
  "opportunity": 88,
  "trend": "Rising",
  "demand": "High",
  "uploadTime": "7 PM",
  "audience": "18-34 creators",

  "expectedViews": "80K - 150K",
  "expectedCTR": "8.7%",
  "estimatedRPM": "$4.20",
  "estimatedRevenue": "$336 - $630",
  "recommendation": "MAKE THIS VIDEO",
  "confidence": 91
}

Analyze this YouTube keyword using REAL YouTube data.

Keyword:
${keyword}

Videos:
${JSON.stringify(videos)}

Use the uploaded video data.
Do NOT guess.

Estimate:

- Keyword difficulty (0-100)
- Opportunity score (0-100)
- Trend
- Search demand
- Best upload time
- Target audience
- Expected views
- Expected CTR
- Estimated RPM
- Estimated Revenue
- Final recommendation (MAKE THIS VIDEO / WAIT / AVOID)
- Confidence (0-100)

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
        difficulty: 0,
        opportunity: 0,
        trend: "Unknown",
        demand: "Unknown",
        uploadTime: "-",
        audience: "-",
      },
      {
        status: 500,
      }
    );
  }
}