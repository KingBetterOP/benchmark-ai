import { Strategy } from "../lib/types";

type Props = {
  strategy: Strategy[];
};

export default function GrowthStrategyCard({
  strategy,
}: Props) {
  if (strategy.length === 0) return null;

  return (
    <div className="rounded-2xl border border-purple-500 bg-zinc-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        🚀 Growth Strategy
      </h2>

      <div className="space-y-5">
        {strategy.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-700 bg-zinc-800 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <span className="rounded-full bg-purple-600 px-3 py-1 text-sm font-bold">
                Impact {item.impact}/10
              </span>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Difficulty
              </p>

              <p className="font-semibold">
                {item.difficulty}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Description
              </p>

              <p className="mt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}