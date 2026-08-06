import { ContentPlanner } from "../lib/types";

type Props = {
  plans: ContentPlanner[];
  language: string;
};

export default function ContentPlannerCard({
  plans,
  language,
}: Props) {
  if (!plans.length) return null;

  const text =
  language === "ko"
    ? {
        title: "30일 콘텐츠 플래너",
        day: "Day",
        goal: "목표",
        targetViews: "목표 조회수",
        difficulty: "난이도",
      }
    : {
        title: "30-Day Content Planner",
        day: "Day",
        goal: "Goal",
        targetViews: "Target Views",
        difficulty: "Difficulty",
      };
  return (
    <div className="mt-10 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-8">

      <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
        AI Content Planner
      </p>

      <h2 className="mt-2 text-4xl font-extrabold">
  {text.title}
</h2>

      <div className="mt-8 space-y-5">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white/5 backdrop-blur-xl p-6"
          >
            <h3 className="text-2xl font-bold">
              {text.day} {plan.day}
            </h3>

            <p className="mt-3 text-lg font-semibold">
              {plan.title}
            </p>

            <p className="mt-2 text-zinc-400">
              {text.goal}: {plan.goal}
            </p>

            <p className="mt-2 text-zinc-400">
              {text.targetViews}: {plan.targetViews}
            </p>

            <p className="mt-2 text-zinc-400">
              {text.difficulty}: {plan.difficulty}
            </p>

            <p className="mt-3">
              {plan.reason}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}