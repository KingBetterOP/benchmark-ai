"use client";

import PlannerDayCard from "./PlannerDayCard";

import { PlannerResponse } from "@/app/types/planner";

type Props = {
  planner: PlannerResponse | null;
};

export default function PlannerCalendar({
  planner,
}: Props) {
  if (!planner) return null;

  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-3xl font-bold">
        📅 30 Day Content Planner
      </h2>

      <p className="mt-2 text-zinc-400">
        AI generated publishing schedule
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {planner.items.map((item) => (
  <PlannerDayCard
    key={item.id}
    item={item}
  />
))}
      </div>
    </section>
  );
}