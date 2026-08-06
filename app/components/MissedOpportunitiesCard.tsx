type Opportunity = {
  title: string;
  reason: string;
};

type Props = {
  opportunities: Opportunity[];
};

export default function MissedOpportunitiesCard({
  opportunities,
}: Props) {
  if (opportunities.length === 0) return null;

  return (
    <section className="mt-10 rounded-3xl border border-orange-500/30 bg-orange-500/10 p-8">

      <h2 className="text-3xl font-extrabold">
        💡 AI Missed Opportunities
      </h2>

      <p className="mt-2 text-zinc-400">
        Content opportunities your competitors are missing.
      </p>

      <div className="mt-8 space-y-5">

        {opportunities.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white/5 backdrop-blur-xl p-5"
          >
            <h3 className="text-xl font-bold text-orange-400">
              {index + 1}. {item.title}
            </h3>

            <p className="mt-3 text-zinc-300">
              {item.reason}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}