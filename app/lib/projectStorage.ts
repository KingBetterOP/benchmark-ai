import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
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
  chatMessages?: {
  role: "user" | "assistant";
  content: string;
}[];
};

const COLLECTION_NAME = "projects";

export async function getProjects(ownerId: string): Promise<SavedProject[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("ownerId", "==", ownerId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);



return snapshot.docs.map((d) => ({
  ...(d.data() as SavedProject),
  id: d.id,
}));
}

export async function saveProject(
  ownerId: string,
  project: SavedProject
) {
  try {
    
    const ref = await addDoc(collection(db, COLLECTION_NAME), {
      ownerId,
      ...project,
    });

    
  } catch (error) {
    console.error("SAVE ERROR:", error);
    throw error;
  }
}

export async function deleteProject(id: string) {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}