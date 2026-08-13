import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/app/lib/firebase-admin";

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { userId } =
      await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } =
      await params;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Report ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const doc =
      await adminDb
        .collection("reports")
        .doc(id)
        .get();

    if (!doc.exists) {
      return NextResponse.json(
        {
          error:
            "Report not found",
        },
        {
          status: 404,
        }
      );
    }

    const data =
      doc.data();

    /*
    ============================================================
    OWNER CHECK
    ============================================================
    */

    if (
      data?.ownerId !== userId
    ) {
      return NextResponse.json(
        {
          error:
            "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json({
      id: doc.id,
      ...data,
    });
  } catch (error) {
    console.error(
      "Get report error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to load report",
      },
      {
        status: 500,
      }
    );
  }
}