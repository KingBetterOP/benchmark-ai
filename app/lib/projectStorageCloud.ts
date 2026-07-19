import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";

export type SavedProject = {
  id: string;
  createdAt: number;
  keyword: string;
  report: string;
  idea: string;
  strategy: string;
  competition: string;
  titles: string;
  recommendedChannels: string;
};

const COLLECTION_NAME = "projects";

export async function getProjects(): Promise<SavedProject[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<SavedProject, "id">),
  }));
}