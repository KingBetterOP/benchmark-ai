import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type UserPlan = {
  plan: "free" | "pro";
  dailyUsage: number;
};

export async function getUserPlan(userId: string): Promise<UserPlan> {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      plan: "free",
      dailyUsage: 0,
      createdAt: serverTimestamp(),
    });

    return {
      plan: "free",
      dailyUsage: 0,
    };
  }

  return snap.data() as UserPlan;
}

export async function increaseUsage(userId: string) {
  const ref = doc(db, "users", userId);

  await updateDoc(ref, {
    dailyUsage: increment(1),
  });
}