import { NextRequest, NextResponse } from "next/server";

import { workflow } from "@/app/lib/workflow/workflow";

export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json();

    if (!keyword) {
      return NextResponse.json(
        {
          error: "Keyword is required.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await workflow.start(keyword);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Generate Everything failed.",
      },
      {
        status: 500,
      }
    );
  }
}