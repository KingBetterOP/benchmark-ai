"use client";

import { languages } from "../lib/language";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function LanguageSelector({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
}