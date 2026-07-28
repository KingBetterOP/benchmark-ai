"use client";

const items = [
  { label: "🔍 Search", href: "#search" },
  { label: "📊 Dashboard", href: "#dashboard" },
  { label: "🎥 Videos", href: "#videos" },
  { label: "🤖 AI", href: "#ai" },
  { label: "📁 Projects", href: "#projects" },
];

export default function QuickNavigation() {
  return (
    <div className="sticky top-16 z-40 mb-6 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/90 backdrop-blur">
      <div className="flex min-w-max gap-2 p-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-red-600 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}