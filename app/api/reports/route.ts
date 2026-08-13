import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/app/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      projectId,
      keyword,
      benchmarkResult,

      // Legacy / summary fields
      report,
      benchmarkScore,
      opportunity,
      opportunityScoreV2,
      competition,
      expectedViews,
      uploadTime,
      titles,
    } = body;

    if (
      !keyword ||
      typeof keyword !== "string"
    ) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }

    /*
    ============================================================
    PROJECT OWNERSHIP
    ============================================================
    */

    if (projectId) {
      const projectRef = adminDb
        .collection("projects")
        .doc(projectId);

      const projectDoc =
        await projectRef.get();

      if (!projectDoc.exists) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }

      const projectData =
        projectDoc.data();

      if (
        projectData?.ownerId !== userId
      ) {
        return NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }
    }

    /*
    ============================================================
    NORMALIZE OPPORTUNITY SCORE
    ============================================================
    */

    const normalizedOpportunityScore =
      opportunityScoreV2 &&
      typeof opportunityScoreV2 === "object"
        ? opportunityScoreV2
        : {
            total:
              typeof opportunityScoreV2 ===
              "number"
                ? opportunityScoreV2
                : 0,
          };

    const normalizedBenchmarkScore =
      typeof benchmarkScore === "number"
        ? benchmarkScore
        : typeof report?.score === "number"
        ? report.score
        : 0;

    /*
    ============================================================
    CREATE / UPDATE REPORT
    ============================================================
    */

    const now = Date.now();

    let reportId: string | null = null;
    let updated = false;

    /*
    ============================================================
    1. CHECK EXISTING PROJECT REPORT
    ============================================================
    */

    if (projectId) {
      const projectRef = adminDb
        .collection("projects")
        .doc(projectId);

      const projectDoc =
        await projectRef.get();

      if (!projectDoc.exists) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }

      const projectData =
        projectDoc.data();

      /*
       * Existing latestReportId
       * → UPDATE existing report
       */

      const latestReportId =
        projectData?.latestReportId;

      if (
        typeof latestReportId === "string" &&
        latestReportId.length > 0
      ) {
        const existingReportRef =
          adminDb
            .collection("reports")
            .doc(latestReportId);

        const existingReport =
          await existingReportRef.get();

        if (existingReport.exists) {
          const existingReportData =
            existingReport.data();

          /*
          ======================================================
          REPORT OWNER CHECK
          ======================================================
          */

          if (
            existingReportData?.ownerId !==
            userId
          ) {
            return NextResponse.json(
              {
                error: "Forbidden",
              },
              {
                status: 403,
              }
            );
          }

          /*
          ======================================================
          REPORT → PROJECT OWNERSHIP CHECK
          ======================================================
          */

          if (
            existingReportData?.projectId !==
            projectId
          ) {
            return NextResponse.json(
              {
                error:
                  "Report does not belong to this project",
              },
              {
                status: 403,
              }
            );
          }

          /*
          ======================================================
          UPDATE EXISTING REPORT
          ======================================================
          */

          await existingReportRef.update({
            ownerId: userId,

            projectId,

            keyword,

            benchmarkResult:
              benchmarkResult ?? null,

            report:
              report ?? null,

            benchmarkScore:
              normalizedBenchmarkScore,

            opportunity:
              opportunity ?? 0,

            opportunityScoreV2:
              normalizedOpportunityScore,

            competition:
              competition ?? "Unknown",

            expectedViews:
              expectedViews ?? "Unknown",

            uploadTime:
              uploadTime ?? "Unknown",

            titles:
              titles ?? [],

            updatedAt: now,
          });

          reportId =
            existingReportRef.id;

          updated = true;
        }
      }
    }

    /*
    ============================================================
    2. CREATE NEW REPORT IF NONE EXISTS
    ============================================================
    */

    if (!reportId) {
      const newReportRef =
        await adminDb
          .collection("reports")
          .add({
            ownerId: userId,

            projectId:
              projectId ?? null,

            keyword,

            benchmarkResult:
              benchmarkResult ?? null,

            report:
              report ?? null,

            benchmarkScore:
              normalizedBenchmarkScore,

            opportunity:
              opportunity ?? 0,

            opportunityScoreV2:
              normalizedOpportunityScore,

            competition:
              competition ?? "Unknown",

            expectedViews:
              expectedViews ?? "Unknown",

            uploadTime:
              uploadTime ?? "Unknown",

            titles:
              titles ?? [],

            createdAt: now,

            updatedAt: now,
          });

      reportId =
        newReportRef.id;
    }

    /*
    ============================================================
    3. UPDATE PROJECT → LATEST REPORT
    ============================================================
    */

    if (projectId && reportId) {
      await adminDb
        .collection("projects")
        .doc(projectId)
        .update({
          latestReportId:
            reportId,

          benchmarkScore:
            normalizedBenchmarkScore,

          opportunityScore:
            normalizedOpportunityScore
              ?.total ?? 0,

          lastBenchmarkAt:
            now,

          updatedAt: now,
        });
    }

    /*
    ============================================================
    4. RESPONSE
    ============================================================
    */

    return NextResponse.json({
      success: true,

      id: reportId,

      projectId:
        projectId ?? null,

      updated,

      url:
        `/report/${reportId}`,
    });
  } catch (error) {
    console.error(
      "Create report error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create report",
      },
      { status: 500 }
    );
  }
}