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

export async function getProjects(): Promise<SavedProject[]> {
  const res = await fetch("/api/projects", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load projects");
  }

  return res.json();
}

export async function saveProject(
  project: Omit<SavedProject, "id">
) {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    throw new Error("Failed to save project");
  }

  return res.json();
}

export async function deleteProject(id: string) {
  const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete project");
  }
}