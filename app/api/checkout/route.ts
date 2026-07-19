import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { polar } from "@/app/lib/polar";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const checkout = await polar.checkouts.create({
    products: [process.env.POLAR_PRODUCT_ID!],
    externalCustomerId: userId,
    metadata: {
      clerkUserId: userId,
    },
    successUrl: "https://benchmark-ai-indol.vercel.app/success",
  });

  console.log("CHECKOUT =", checkout);

  return NextResponse.json({
    url: checkout.url,
  });
}