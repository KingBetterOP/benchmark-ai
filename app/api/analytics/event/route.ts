import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/app/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const ALLOWED_EVENTS = new Set([
  "signup",
  "login",
  "search_start",
  "analysis_complete",
  "opportunity_view",
  "decision_view",
  "creator_generate",
  "creator_regenerate",
  "project_save",
  "pricing_view",
  "checkout_start",
  "checkout_success",
  "subscription_cancel",
]);

export async function POST(
  request: NextRequest
) {
  try {
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

    const body =
      await request.json();

    const event =
      typeof body.event === "string"
        ? body.event
        : "";

    if (!ALLOWED_EVENTS.has(event)) {
      return NextResponse.json(
        {
          error:
            "Invalid analytics event.",
        },
        {
          status: 400,
        }
      );
    }

    const keyword =
      typeof body.keyword === "string"
        ? body.keyword
            .trim()
            .slice(0, 100)
        : null;

    const metadata =
  body.metadata &&
  typeof body.metadata === "object" &&
  !Array.isArray(body.metadata)
    ? body.metadata
    : {};

let metadataSize = 0;

try {
  metadataSize =
    JSON.stringify(metadata).length;
} catch {
  return NextResponse.json(
    {
      error:
        "Invalid analytics metadata.",
    },
    {
      status: 400,
    }
  );
}

if (metadataSize > 5000) {
  return NextResponse.json(
    {
      error:
        "Analytics metadata is too large.",
    },
    {
      status: 400,
    }
  );
}

    await adminDb
      .collection("analyticsEvents")
      .add({
        userId,

        event,

        keyword,

        metadata,

        createdAt:
          FieldValue.serverTimestamp(),
      });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Analytics event failed:",
      error
    );

    /*
     * Analytics should not break
     * the user's product experience.
     */

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 200,
      }
    );
  }
}