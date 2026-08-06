"use client";

import { useState, ReactNode } from "react";

type AccordionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-white/5 backdrop-blur-xl">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-zinc-800"
      >
        <span className="text-lg font-semibold">{title}</span>

        <span className="text-xl">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="border-t border-zinc-800 p-6">
          {children}
        </div>
      )}
    </div>
  );
}