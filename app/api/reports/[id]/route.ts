import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/app/lib/firebase-admin";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

/*
============================================================
GET REPORT
============================================================
*/

export async function GET(
  _req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Report ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const doc = await adminDb
      .collection("reports")
      .doc(id)
      .get();

    if (!doc.exists) {
      return NextResponse.json(
        {
          error: "Report not found",
        },
        {
          status: 404,
        }
      );
    }

    const data = doc.data();

    /*
    ============================================================
    VISIBILITY
    ============================================================
    */

    const visibility =
      data?.visibility === "public"
        ? "public"
        : "private";

    /*
    ============================================================
    AUTH
    ============================================================
    */

    const { userId } = await auth();

    /*
    ============================================================
    PUBLIC REPORT
    ============================================================
    */

    if (visibility === "public") {
      return NextResponse.json({
        id: doc.id,
        ...data,
        visibility,
        isOwner:
          !!userId &&
          data?.ownerId === userId,
      });
    }

    /*
    ============================================================
    PRIVATE REPORT
    ============================================================
    */

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

    /*
    ============================================================
    OWNER CHECK
    ============================================================
    */

    if (data?.ownerId !== userId) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json({
      id: doc.id,
      ...data,
      visibility,
      isOwner: true,
    });
  } catch (error) {
    console.error(
      "Get report error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to load report",
      },
      {
        status: 500,
      }
    );
  }
}

/*
============================================================
UPDATE REPORT VISIBILITY
============================================================
*/

export async function PATCH(
  req: Request,
  { params }: Params
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

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Report ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const ref = adminDb
      .collection("reports")
      .doc(id);

    const doc = await ref.get();

    if (!doc.exists) {
      return NextResponse.json(
        {
          error: "Report not found",
        },
        {
          status: 404,
        }
      );
    }

    const data = doc.data();

    /*
    ============================================================
    OWNER CHECK
    ============================================================
    */

    if (data?.ownerId !== userId) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const body = await req.json();

    const visibility =
      body?.visibility;

    if (
      visibility !== "public" &&
      visibility !== "private"
    ) {
      return NextResponse.json(
        {
          error:
            "Visibility must be public or private",
        },
        {
          status: 400,
        }
      );
    }

    await ref.update({
      visibility,
      updatedAt: Date.now(),
    });

    const updatedDoc = await ref.get();

    return NextResponse.json({
      success: true,
      id: updatedDoc.id,
      ...updatedDoc.data(),
    });
  } catch (error) {
    console.error(
      "Update report visibility error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to update report visibility",
      },
      {
        status: 500,
      }
    );
  }
}