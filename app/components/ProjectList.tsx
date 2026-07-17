import { SavedProject } from "../lib/projectStorage";

type Props = {
  projects: SavedProject[];
  onLoad: (project: SavedProject) => void;
  onDelete: (id: string) => void;
};

export default function ProjectList({
  projects,
  onLoad,
  onDelete,
}: Props) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 rounded-xl border border-gray-700 p-6">
      <h2 className="mb-4 text-2xl font-bold">
        📂 저장된 프로젝트
      </h2>

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between rounded-lg border border-zinc-700 p-4"
          >
            <div>
              <p className="font-bold">{project.keyword}</p>

              <p className="text-sm text-gray-400">
                {new Date(project.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onLoad(project)}
                className="rounded bg-green-600 px-3 py-2"
              >
                불러오기
              </button>

              <button
                onClick={() => onDelete(project.id)}
                className="rounded bg-red-600 px-3 py-2"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}