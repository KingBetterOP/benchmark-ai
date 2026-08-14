"use client";

import Link from "next/link";

export default function WorkspaceHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090B]/95 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-between px-4 py-4">

        <Link href="/">
          <div className="text-base font-black text-white">
            Benchmark AI
          </div>

          <div className="text-[10px] text-zinc-500">
            YouTube Intelligence
          </div>
        </Link>

        <Link
          href="/"
          className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-black"
        >
          New Research
        </Link>

      </div>
    </header>
  );
}