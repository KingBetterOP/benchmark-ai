export default function TrustBar() {
  const stats = [
    {
      value: "1.2M+",
      label: "Videos Analyzed",
    },
    {
      value: "98%",
      label: "AI Accuracy",
    },
    {
      value: "500K+",
      label: "Keywords",
    },
    {
      value: "24/7",
      label: "AI Research",
    },
  ];

  return (
    <section className="border-y border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
                {stats.map((item) => (
          <div
            key={item.label}
            className="text-center transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-3xl font-extrabold text-transparent">
              {item.value}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}