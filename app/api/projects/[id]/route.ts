import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/app/lib/firebase-admin";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

/*
============================================================
GET PROJECT
============================================================
*/

export async function GET(
  _req: Request,
  { params }: Params
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const ref = adminDb
      .collection("projects")
      .doc(id);

    const doc = await ref.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const data = doc.data();

    if (data?.ownerId !== userId) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      id: doc.id,
      ...data,
    });
  } catch (error) {
    console.error(
      "Failed to load project:",
      error
    );

    return NextResponse.json(
      { error: "Failed to load project" },
      { status: 500 }
    );
  }
}

/*
============================================================
UPDATE PROJECT
============================================================
*/

export async function PATCH(
  req: Request,
  { params }: Params
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const ref = adminDb
      .collection("projects")
      .doc(id);

    const doc = await ref.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const data = doc.data();

    if (data?.ownerId !== userId) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const updates = await req.json();

    /*
    ============================================================
    ALLOWED PROJECT FIELDS
    ============================================================
    */

    const allowedFields = [
  "keyword",

  "benchmarkScore",
  "opportunityScore",
  "lastBenchmarkAt",

  "results",
  "topVideos",
  "channels",
  "averageViews",
  "opportunityScoreV2",

  "report",
  "idea",
  "strategy",
  "competition",
  "titles",
  "recommendedChannels",

  "keywordIntelligence",
  "viralPrediction",

  "thumbnailAnalysis",
  "titleAnalysis",

  "seoAnalysis",
  "seoOptimizer",

  "contentGap",
  "channelAudit",
  "contentPlanner",

  "aiThumbnail",

  "opportunities",
  "missedOpportunities",

  "contentStrategy",
  "planner",

  "creatorKit",
  "creatorWorkspace",

  "chatMessages",
] as const;

    const safeUpdates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (
        Object.prototype.hasOwnProperty.call(
          updates,
          field
        )
      ) {
        safeUpdates[field] =
          updates[field];
      }
    }

    await ref.update({
      ...safeUpdates,
      ownerId: userId,
      updatedAt: Date.now(),
    });

    const updatedDoc = await ref.get();

    return NextResponse.json({
      success: true,
      project: {
        id: updatedDoc.id,
        ...updatedDoc.data(),
      },
    });
  } catch (error) {
    console.error(
      "Failed to update project:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

/*
============================================================
DELETE PROJECT
============================================================
*/

export async function DELETE(
  _req: Request,
  { params }: Params
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const ref = adminDb
      .collection("projects")
      .doc(id);

    const doc = await ref.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const data = doc.data();

    if (data?.ownerId !== userId) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    await ref.delete();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Failed to delete project:",
      error
    );

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}