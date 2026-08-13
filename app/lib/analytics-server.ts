import { createHash } from "crypto";

import { adminDb } from "@/app/lib/firebase-admin";

import type {
  AnalyticsEvent,
} from "./analytics";

type TrackServerEventOptions = {
  keyword?: string;
  metadata?: Record<string, unknown>;
};

/*
============================================================
CREATE IDEMPOTENCY KEY
============================================================

The same Polar order must never create the same
purchase_success analytics event twice.
*/

function createIdempotencyId(
  event: AnalyticsEvent,
  userId: string,
  idempotencyKey: string
) {
  return createHash("sha256")
    .update(
      `${event}:${userId}:${idempotencyKey}`
    )
    .digest("hex");
}

/*
============================================================
TRACK SERVER EVENT ONCE
============================================================
*/

export async function trackServerEventOnce(
  userId: string,
  event: AnalyticsEvent,
  idempotencyKey: string,
  options: TrackServerEventOptions = {}
): Promise<boolean> {
  if (!userId) {
    console.error(
      "Server analytics requires userId"
    );

    return false;
  }

  if (!idempotencyKey) {
    console.error(
      "Server analytics requires idempotencyKey"
    );

    return false;
  }

  const eventId =
    createIdempotencyId(
      event,
      userId,
      idempotencyKey
    );

  const eventRef = adminDb
    .collection("analyticsEvents")
    .doc(eventId);

  try {
    const created =
      await adminDb.runTransaction(
        async (transaction) => {
          const existing =
            await transaction.get(
              eventRef
            );

          /*
          ======================================================
          ALREADY PROCESSED
          ======================================================
          */

          if (existing.exists) {
            return false;
          }

          /*
          ======================================================
          CREATE EVENT
          ======================================================
          */

          transaction.create(
            eventRef,
            {
              event,

              userId,

              keyword:
                options.keyword ??
                null,

              metadata:
                options.metadata ??
                {},

              idempotencyKey,

              createdAt:
                Date.now(),
            }
          );

          return true;
        }
      );

    if (created) {
      console.log(
        `Analytics event recorded: ${event}`
      );
    } else {
      console.log(
        `Analytics event already processed: ${event}`
      );
    }

    return created;
  } catch (error) {
    console.error(
      "Server analytics tracking failed:",
      error
    );

    return false;
  }
}