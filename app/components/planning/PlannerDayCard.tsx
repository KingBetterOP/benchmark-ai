"use client";

import { PlannerItem } from "@/app/types/planner";

type Props = {
  item: PlannerItem;
};

const statusConfig = {
  planned: {
    label: "🟢 Planned",
    color: "bg-gray-500/20 text-gray-300",
  },
  writing: {
    label: "🟡 Writing",
    color: "bg-yellow-500/20 text-yellow-300",
  },
  recording: {
    label: "🔵 Recording",
    color: "bg-blue-500/20 text-blue-300",
  },
  editing: {
    label: "🟣 Editing",
    color: "bg-purple-500/20 text-purple-300",
  },
  uploaded: {
    label: "✅ Uploaded",
    color: "bg-green-500/20 text-green-300",
  },
} as const;

export default function PlannerDayCard({
  item,
}: Props) {
  const status = statusConfig[item.status];

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 transition hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-zinc-400">
            Day {item.day}
          </p>

          <h3 className="mt-2 text-lg font-bold">
            {item.title}
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            {item.keyword}
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
          {item.contentType}
        </span>

      </div>

      <div className="mt-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-6 space-y-3 border-t border-white/10 pt-4">

        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">
            Upload Time
          </span>

          <span className="font-medium">
            {item.uploadTime}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">
            Expected Views
          </span>

          <span className="font-medium">
            {item.expectedViews.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">
            Success Probability
          </span>

          <span className="font-bold text-emerald-400">
            {item.successProbability}%
          </span>
        </div>

      </div>

    </div>
  );
}