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

const STORAGE_KEY = "benchmark_projects";

export function getProjects(): SavedProject[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return [];

  return JSON.parse(saved);
}

export function saveProject(project: SavedProject) {
  const projects = getProjects();

  const updated = [project, ...projects].slice(0, 30);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );
}

export function deleteProject(id: string) {
  const projects = getProjects();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      projects.filter((project) => project.id !== id)
    )
  );
}