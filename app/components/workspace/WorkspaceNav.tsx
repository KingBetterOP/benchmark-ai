"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Overview",
  },
  {
    href: "/research",
    label: "Research",
    description: "YouTube Research",
  },
  {
    href: "/intelligence",
    label: "Intelligence",
    description: "AI Insights",
  },
  {
    href: "/strategy",
    label: "Strategy",
    description: "Content Strategy",
  },
  {
    href: "/create",
    label: "Create",
    description: "Creator Workspace",
  },
  {
    href: "/performance",
    label: "Performance",
    description: "Video Performance",
  },
  {
    href: "/projects",
    label: "Projects",
    description: "Saved Projects",
  },
];

export default function WorkspaceNav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-40 hidden h-screen w-64 shrink-0 border-r border-white/10 bg-[#09090B] lg:block">
      <div className="flex h-full flex-col">

        {/* BRAND */}

        <div className="border-b border-white/10 p-6">
          <Link
            href="/"
            className="block"
          >
            <div className="text-lg font-black tracking-tight text-white">
              Benchmark AI
            </div>

            <div className="mt-1 text-xs text-zinc-500">
              YouTube Intelligence Platform
            </div>
          </Link>
        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">

            {navigation.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "block rounded-xl px-4 py-3 transition",
                    active
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
                  ].join(" ")}
                >
                  <div className="text-sm font-semibold">
                    {item.label}
                  </div>

                  <div
                    className={[
                      "mt-0.5 text-xs",
                      active
                        ? "text-zinc-400"
                        : "text-zinc-600",
                    ].join(" ")}
                  >
                    {item.description}
                  </div>
                </Link>
              );
            })}

          </div>
        </nav>

        {/* BOTTOM */}

        <div className="border-t border-white/10 p-4">

          <Link
            href="/"
            className="block rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
          >
            New Research
          </Link>

        </div>

      </div>
    </aside>
  );
}