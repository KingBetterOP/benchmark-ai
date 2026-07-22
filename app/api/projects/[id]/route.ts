import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/app/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
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
    const ref = adminDb.collection("projects").doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    if (doc.data()?.ownerId !== userId) {
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
    console.error(error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}