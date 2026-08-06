import { SavedProject } from "../lib/projectStorage";

type Props = {
  projects: SavedProject[];
  onLoad: (project: SavedProject) => void;
  onDelete: (id: string) => void;
  language: string;
};

export default function ProjectList({
  projects,
  onLoad,
  onDelete,
  language,
}: Props) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 rounded-xl border border-gray-700 p-6">
      <h2 className="mb-4 text-2xl font-bold">
        {language === "ko"
  ? "📂 저장된 프로젝트"
  : "📂 Saved Projects"}
      </h2>

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between rounded-lg border border-zinc-700 p-4"
          >
            <div>
              <p className="font-bold">{project.keyword}</p>
              <div className="mt-2 flex flex-wrap gap-2">

  <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">
    {language === "ko"
  ? "저장된 프로젝트"
  : "Saved Project"}
  </span>

  <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-300">
    {language === "ko"
  ? "AI 준비 완료"
  : "AI Ready"}
  </span>

</div>

             <p className="text-sm text-gray-400">
  {project.createdAt
    ? new Date(project.createdAt).toLocaleString()
    : language === "ko"
  ? "날짜 없음"
  : "No Date"}
</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onLoad(project)}
                className="rounded bg-green-600 px-3 py-2"
              >
                {language === "ko"
  ? "불러오기"
  : "Load"}
              </button>

              <button
                onClick={() => onDelete(project.id)}
                className="rounded bg-red-600 px-3 py-2"
              >
                {language === "ko"
  ? "삭제"
  : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}