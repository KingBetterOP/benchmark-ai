import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import {
  consumeUsage,
  refundUsage,
} from "@/app/lib/usage";

import { workflow } from "@/app/lib/workflow/workflow";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    /* ========================================
       1. AUTH
    ======================================== */

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /* ========================================
       2. REQUEST
    ======================================== */

    let body: {
      keyword?: unknown;
    };

    try {
      body =
        (await request.json()) as {
          keyword?: unknown;
        };
    } catch {
      return NextResponse.json(
        {
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

    if (keyword.length > 100) {
      return NextResponse.json(
        {
          error: "Keyword is too long.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================
   3. CONSUME USAGE
======================================== */

let usage;

try {
  usage = await consumeUsage(userId);
} catch (usageError) {
  if (
    usageError instanceof Error &&
    usageError.message ===
      "USAGE_LIMIT_REACHED"
  ) {
    return NextResponse.json(
      {
        error: "Daily limit reached.",
        upgrade: true,
      },
      {
        status: 403,
      }
    );
  }

  throw usageError;
}

/* ========================================
   4. AI WORKFLOW
======================================== */

console.log(
  `🚀 Generate Everything started for user ${userId}`
);

try {
  const result =
    await workflow.start(keyword);

  /* ======================================
     5. SUCCESS
  ====================================== */

  console.log(
    `🏆 Generate Everything completed for user ${userId}`
  );

  return NextResponse.json(
    {
      success: true,
      result,
      usage,
    },
    {
      status: 200,
    }
  );
} catch (workflowError) {
  /* ======================================
     REFUND USAGE ON WORKFLOW FAILURE
  ====================================== */

  try {
    await refundUsage(userId);
  } catch (refundError) {
    console.error(
      "❌ Usage refund failed:",
      refundError
    );
  }

  throw workflowError;
}
  } catch (error) {
    console.error(
      "❌ Generate Everything failed:",
      error
    );

    if (
      error instanceof Error &&
      error.message ===
        "USAGE_LIMIT_REACHED"
    ) {
      return NextResponse.json(
        {
          error: "Daily limit reached.",
          upgrade: true,
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Generate Everything failed.",
      },
      {
        status: 500,
      }
    );
  }
}