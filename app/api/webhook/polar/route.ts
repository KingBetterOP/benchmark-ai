import { Webhooks } from "@polar-sh/nextjs";
import { adminDb } from "@/app/lib/firebase-admin";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  onPayload: async (payload) => {
    console.log("📦 Webhook:", payload.type);
  },

  onSubscriptionActive: async (payload) => {
    const externalId = payload.data.customer.externalId;

    if (!externalId) {
      console.error("Customer externalId not found");
      return;
    }

    await adminDb.collection("users").doc(externalId).set(
      {
        plan: "pro",
      },
      { merge: true }
    );

    console.log(`✅ ${externalId} upgraded to Pro`);
  },
});