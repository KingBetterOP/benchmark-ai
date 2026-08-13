import { adminDb } from "@/app/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export type Plan =
  | "free"
  | "pro"
  | "business";

export type UsageStatus = {
  plan: Plan;
  used: number;
  limit: number;
  remaining: number;
};

const PLAN_LIMITS: Record<
  Plan,
  number
> = {
  free: 3,
  pro: 100,
  business: 500,
};

function getToday(): string {
  return new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Asia/Seoul",
    }
  ).format(new Date());
}

function normalizePlan(
  value: unknown
): Plan {
  if (
    value === "pro" ||
    value === "business"
  ) {
    return value;
  }

  return "free";
}

/*
============================================================
GET USAGE STATUS
============================================================
*/

export async function getUsageStatus(
  userId: string
): Promise<UsageStatus> {
  const userRef = adminDb
    .collection("users")
    .doc(userId);

  const snapshot =
    await userRef.get();

  const today = getToday();

  /*
  ============================================================
  USER DOES NOT EXIST
  ============================================================
  */

  if (!snapshot.exists) {
    await userRef.set({
      plan: "free",
      dailyUsage: 0,
      lastReset: today,

      createdAt:
        FieldValue.serverTimestamp(),

      updatedAt:
        FieldValue.serverTimestamp(),
    });

    return {
      plan: "free",
      used: 0,
      limit: PLAN_LIMITS.free,
      remaining: PLAN_LIMITS.free,
    };
  }

  const data =
    snapshot.data() ?? {};

  const plan =
    normalizePlan(data.plan);

  /*
  ============================================================
  DAILY RESET
  ============================================================
  */

  let used =
    typeof data.dailyUsage === "number"
      ? data.dailyUsage
      : 0;

  if (data.lastReset !== today) {
    used = 0;

    await userRef.update({
      dailyUsage: 0,
      lastReset: today,

      updatedAt:
        FieldValue.serverTimestamp(),
    });
  }

  const limit =
    PLAN_LIMITS[plan];

  return {
    plan,
    used,
    limit,
    remaining: Math.max(
      limit - used,
      0
    ),
  };
}

/*
============================================================
CONSUME USAGE
============================================================

IMPORTANT:

This operation uses a Firestore transaction.

Therefore:

request A
request B
request C

cannot all independently observe the same remaining
slot and exceed the daily limit.

The check and increment happen atomically.
============================================================
*/

export async function consumeUsage(
  userId: string
): Promise<UsageStatus> {
  const userRef = adminDb
    .collection("users")
    .doc(userId);

  const today = getToday();

  const result =
    await adminDb.runTransaction(
      async (transaction) => {
        const snapshot =
          await transaction.get(
            userRef
          );

        /*
        ========================================================
        CREATE USER
        ========================================================
        */

        if (!snapshot.exists) {
          const plan: Plan =
            "free";

          const limit =
            PLAN_LIMITS[plan];

          transaction.set(
            userRef,
            {
              plan,
              dailyUsage: 1,
              lastReset: today,

              createdAt:
                FieldValue.serverTimestamp(),

              updatedAt:
                FieldValue.serverTimestamp(),
            },
            {
              merge: true,
            }
          );

          return {
            plan,
            used: 1,
            limit,
            remaining:
              Math.max(
                limit - 1,
                0
              ),
          };
        }

        const data =
          snapshot.data() ?? {};

        const plan =
          normalizePlan(
            data.plan
          );

        const limit =
          PLAN_LIMITS[plan];

        /*
        ========================================================
        RESET IF NEW DAY
        ========================================================
        */

        const lastReset =
          data.lastReset;

        const currentUsed =
          lastReset === today
            ? typeof data.dailyUsage ===
              "number"
              ? data.dailyUsage
              : 0
            : 0;

        /*
        ========================================================
        LIMIT CHECK
        ========================================================
        */

        if (
          currentUsed >= limit
        ) {
          throw new Error(
            "USAGE_LIMIT_REACHED"
          );
        }

        const nextUsed =
          currentUsed + 1;

        /*
        ========================================================
        ATOMIC UPDATE
        ========================================================
        */

        transaction.update(
          userRef,
          {
            dailyUsage:
              nextUsed,

            lastReset:
              today,

            updatedAt:
              FieldValue.serverTimestamp(),
          }
        );

        return {
          plan,
          used: nextUsed,
          limit,
          remaining:
            Math.max(
              limit - nextUsed,
              0
            ),
        };
      }
    );

  return result;
}
export async function refundUsage(
  userId: string
): Promise<UsageStatus> {
  const userRef = adminDb
    .collection("users")
    .doc(userId);

  await adminDb.runTransaction(
    async (transaction) => {
      const snapshot =
        await transaction.get(userRef);

      if (!snapshot.exists) {
        return;
      }

      const data =
        snapshot.data() ?? {};

      const today = getToday();

      const lastReset =
        data.lastReset;

      const currentUsed =
        lastReset === today &&
        typeof data.dailyUsage === "number"
          ? data.dailyUsage
          : 0;

      const nextUsed =
        Math.max(currentUsed - 1, 0);

      transaction.update(
        userRef,
        {
          dailyUsage: nextUsed,
          lastReset: today,
          updatedAt:
            FieldValue.serverTimestamp(),
        }
      );
    }
  );

  return getUsageStatus(userId);
}