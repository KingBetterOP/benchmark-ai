import {
  auth,
} from "@clerk/nextjs/server";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  consumeUsage,
  refundUsage,
} from "@/app/lib/usage";

import {
  benchmarkServerService,
} from "@/app/lib/benchmarkServerService";

export const dynamic = "force-dynamic";

type BenchmarkRequest = {
  keyword?: unknown;
  order?: unknown;
  language?: unknown;
  excludeShorts?: unknown;
  min10Minutes?: unknown;
  last30Days?: unknown;
};

function jsonError(
  error: string,
  status: number,
  extra?: Record<string, unknown>
) {
  return NextResponse.json(
    {
      error,
      ...extra,
    },
    {
      status,
    }
  );
}

function normalizeBoolean(
  value: unknown
): boolean {
  return value === true;
}

function normalizeOrder(
  value: unknown
): string {
  if (
    value === "viewCount" ||
    value === "date"
  ) {
    return value;
  }

  return "relevance";
}

function normalizeLanguage(
  value: unknown
): string {
  return value === "ko"
    ? "ko"
    : "en";
}

export async function POST(
  request: NextRequest
) {
  console.log(
    "🚀 /api/benchmark called"
  );

  try {
    /* ========================================
       1. AUTH
    ======================================== */

    const { userId } =
      await auth();

    if (!userId) {
      return jsonError(
        "Unauthorized",
        401
      );
    }

    /* ========================================
       2. REQUEST
    ======================================== */

    let body: BenchmarkRequest;

    try {
      body =
        (await request.json()) as BenchmarkRequest;
    } catch {
      return jsonError(
        "Invalid request body.",
        400
      );
    }

    const keyword =
      typeof body.keyword === "string"
        ? body.keyword.trim()
        : "";

    if (!keyword) {
      return jsonError(
        "Keyword is required.",
        400
      );
    }

    if (keyword.length > 100) {
      return jsonError(
        "Keyword is too long.",
        400
      );
    }

    const order =
      normalizeOrder(body.order);

    const language =
      normalizeLanguage(
        body.language
      );

    const excludeShorts =
      normalizeBoolean(
        body.excludeShorts
      );

    const min10Minutes =
      normalizeBoolean(
        body.min10Minutes
      );

    const last30Days =
      normalizeBoolean(
        body.last30Days
      );

    /* ========================================
       3. USAGE CHECK
    ======================================== */

    let usage;

try {
  usage =
    await consumeUsage(
      userId
    );
} catch (usageError) {
  if (
    usageError instanceof Error &&
    usageError.message ===
      "USAGE_LIMIT_REACHED"
  ) {
    return jsonError(
      "Daily Benchmark limit reached.",
      403,
      {
        upgrade: true,
      }
    );
  }

  throw usageError;
}

    /* ========================================
   4. BENCHMARK ENGINE
======================================== */

console.log(
  "🧠 Starting Benchmark Engine..."
);

let result;

try {
  result =
    await benchmarkServerService({
      keyword,
      order,
      language,
      excludeShorts,
      min10Minutes,
      last30Days,
    });
} catch (benchmarkError) {
  /*
  ========================================
  REFUND USAGE ON BENCHMARK FAILURE
  ========================================

  Usage was consumed before the benchmark
  started. If the benchmark itself fails,
  restore the consumed slot.
  */

  try {
    await refundUsage(userId);

    console.log(
      `↩️ Usage refunded for ${userId}`
    );
  } catch (refundError) {
    console.error(
      "❌ Failed to refund usage:",
      refundError
    );
  }

  throw benchmarkError;
}

    /* ========================================
       6. SUCCESS
    ======================================== */

    console.log(
      "🏆 Benchmark Engine completed"
    );

    return NextResponse.json(
      {
        success: true,
        usage,
        result,
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error(
      "❌ /api/benchmark failed:",
      error
    );

    return jsonError(
      error instanceof Error
        ? error.message
        : "Benchmark failed.",
      500
    );
  }
}