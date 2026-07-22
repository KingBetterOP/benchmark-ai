import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/app/lib/firebase-admin";
import { NextResponse } from "next/server";

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
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}

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

    const ref = await adminDb.collection("projects").add({
      ownerId: userId,
      ...project,
    });

    return NextResponse.json({
      success: true,
      id: ref.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save project" },
      { status: 500 }
    );
  }
}