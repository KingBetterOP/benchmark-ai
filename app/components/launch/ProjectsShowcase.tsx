"use client";

type Project = {
  name: string;
  keyword: string;
  score: number;
  updated: string;
};

type ProjectsShowcaseProps = {
  projects: Project[];
};

export default function ProjectsShowcase({
  projects,
}: ProjectsShowcaseProps) {
  return (
    <section className="relative flex h-[760px] w-[1270px] overflow-hidden bg-[#07090f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(59,130,246,0.14),transparent_35%)]" />

      <div className="relative z-10 w-full px-[72px] py-[58px]">
        <div className="text-[14px] font-bold tracking-[0.25em] text-cyan-300">
          PROJECTS
        </div>

        <h1 className="mt-7 text-[52px] font-black tracking-[-0.04em]">
          Build a repeatable
          <br />
          YouTube research workflow.
        </h1>

        <p className="mt-5 text-[20px] text-zinc-400">
          Save your research, decisions, and strategies in one place.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-5">
          {projects.slice(0, 4).map((project) => (
            <div
              key={`${project.name}-${project.keyword}`}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="text-[20px] font-bold text-white">
                    {project.name}
                  </div>

                  <div className="mt-2 text-sm text-zinc-500">
                    {project.keyword}
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-3 text-center">
                  <div className="text-[9px] tracking-[0.15em] text-cyan-300/70">
                    SCORE
                  </div>

                  <div className="mt-1 text-xl font-black text-cyan-300">
                    {project.score}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/[0.06] pt-4 text-xs text-zinc-600">
                Updated {project.updated}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 text-[12px] text-zinc-600">
          Research once. Learn continuously. Create with confidence.
        </div>
      </div>
    </section>
  );
}