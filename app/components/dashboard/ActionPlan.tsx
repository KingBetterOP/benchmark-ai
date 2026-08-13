type Props = {
  showAdvanced: boolean;
  onToggle: () => void;
};

export default function ActionPlan({
  showAdvanced,
  onToggle,
}: Props) {
  return (
    <div className="mx-8 mt-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-slate-900 p-8">
      <h3 className="text-2xl font-bold text-cyan-300">
        🚀 Benchmark Action Plan
      </h3>

      <button
        onClick={onToggle}
        className="mt-6 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-4 text-left font-semibold text-white transition hover:border-cyan-400"
      >
        {showAdvanced
          ? "▲ Hide Advanced Analysis"
          : "▼ Advanced Analysis"}
      </button>

      <ul className="mt-6 space-y-3 text-zinc-200">
        <li>✅ Create a compelling title</li>
        <li>✅ Design a high-CTR thumbnail</li>
        <li>✅ Upload on Friday at 7 PM</li>
        <li>✅ Target this keyword now</li>
      </ul>
    </div>
  );
}