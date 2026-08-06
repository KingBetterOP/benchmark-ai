"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import LanguageSelector from "./LanguageSelector";
import { translations } from "../lib/translations";

type Props = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({
  language,
  setLanguage,
}: Props) {

  const t =
    translations[language as keyof typeof translations];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
            🚀
          </div>

          <div>
            <div className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-2xl font-extrabold text-transparent">
              Benchmark AI
            </div>

            <div className="text-xs text-zinc-400">
  {t.navbarPlatform}
</div>
          </div>
        </Link>

        {/* Menu */}
        <div className="hidden items-center gap-10 md:flex">

          <Link
            href="/"
            className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            {t.home}
          </Link>

          <Link
            href="/pricing"
            className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            {t.pricing}
          </Link>

          <Link
            href="/about"
            className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            {t.about}
          </Link>

          <Link
            href="/contact"
            className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            {t.contact}
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          <div className="hidden items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl lg:flex">
            {t.trusted}
          </div>
          <LanguageSelector
  value={language}
  onChange={setLanguage}
/>

          <Show when="signed-out">
            <SignInButton mode="modal">

              <button className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/30">
                {t.signIn}
              </button>

            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>

        </div>
      </div>
    </nav>
  );
}