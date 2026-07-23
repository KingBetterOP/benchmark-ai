type Props = {
  plan: string;
  dailyUsage: number;
};

export default function PlanCard({
  plan,
  dailyUsage,
}: Props) {
  return (
    <div className="mx-auto mt-6 max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-5 text-center">
      {plan === "pro" ? (
        <>
          <div className="text-2xl font-bold text-yellow-400">
            💎 PRO
          </div>

          <p className="mt-2 text-gray-300">
            Unlimited AI Analysis
          </p>
        </>
      ) : (
        <>
          <div className="text-2xl font-bold">
            ⭐ FREE PLAN
          </div>

          <p className="mt-2 text-gray-300">
            {dailyUsage} / 3 analyses used today
          </p>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-700">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{
                width: `${Math.min(
                  (dailyUsage / 3) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {Math.max(3 - dailyUsage, 0)} analyses remaining
          </p>
        </>
      )}
    </div>
  );
}