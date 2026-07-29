"use client";

import { useEffect, useRef, useState } from "react";
import { languages } from "../lib/language";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function LanguageSelector({
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const selected =
    languages.find((l) => l.code === value) ??
    languages[0];

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        onClick={() => setOpen(!open)}
        className="
flex
items-center
gap-2
rounded-xl
border
border-zinc-500
bg-zinc-800/90
px-4
py-2
text-sm
text-white
transition-all
duration-300
hover:border-cyan-300
hover:bg-zinc-700/70
hover:shadow-lg
hover:shadow-cyan-500/20
"
      >
        <span>{selected.flag}</span>

        <span>{selected.name}</span>

        <span
  className={`
    transition-transform
    duration-300
    ${open ? "rotate-180" : ""}
  `}
>
           
          ▼
        </span>
      </button>

      {open && (
  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-zinc-600 bg-zinc-700/95 backdrop-blur-2xl shadow-2xl shadow-black/40 z-50"
  >
          <div className="border-b border-zinc-700 px-4 py-3 text-xs uppercase tracking-widest text-zinc-400">
            🌐 Select Language
          </div>

          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onChange(lang.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-3 transition hover:bg-zinc-700/70 ${
  value === lang.code
    ? "bg-cyan-400/20 border-l-2 border-cyan-300"
    : ""
}`}
            >
              <div className="flex items-center gap-3">
                <span>{lang.flag}</span>

                <span>{lang.name}</span>
              </div>

              {value === lang.code && (
                <span className="text-cyan-300 font-bold animate-pulse">
  ✓
</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}