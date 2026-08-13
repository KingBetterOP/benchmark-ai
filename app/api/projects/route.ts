import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/app/lib/firebase-admin";
import { NextResponse } from "next/server";

// ─────────────────────────────────────────────
// Get Projects
// ─────────────────────────────────────────────

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const snapshot = await adminDb
      .collection("projects")
      .where("ownerId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/projects error:", error);

    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────
// Create / Update Project
// ─────────────────────────────────────────────

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const project = await req.json();

    if (!project.keyword) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }
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

const safeProjectData: Record<string, unknown> = {};

for (const field of allowedFields) {
  if (
    Object.prototype.hasOwnProperty.call(
      project,
      field
    )
  ) {
    safeProjectData[field] =
      project[field];
  }
}
    const projectsRef = adminDb.collection("projects");

    const existing = await projectsRef
      .where("ownerId", "==", userId)
      .where("keyword", "==", project.keyword)
      .limit(1)
      .get();

    const now = Date.now();

    // ─────────────────────────────────────────
    // Existing Project → Update
    // ─────────────────────────────────────────

    if (!existing.empty) {
      const doc = existing.docs[0];

      const {
        id,
        createdAt,
        ownerId,
        ...projectData
      } = project;

      await doc.ref.update({
  ...safeProjectData,
  ownerId: userId,
  updatedAt: now,
});

      const updatedSnapshot = await doc.ref.get();

      return NextResponse.json({
        id: doc.id,
        ...updatedSnapshot.data(),
      });
    }

    // ─────────────────────────────────────────
    // New Project → Create
    // ─────────────────────────────────────────

    const ref = await projectsRef.add({
  ...safeProjectData,
  ownerId: userId,
  createdAt: now,
  updatedAt: now,
});

    const createdSnapshot = await ref.get();

    return NextResponse.json({
      id: ref.id,
      ...createdSnapshot.data(),
    });
  } catch (error) {
    console.error("POST /api/projects error:", error);

    return NextResponse.json(
      { error: "Failed to save project" },
      { status: 500 }
    );
  }
}