"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500 text-xl font-bold text-black transition-all duration-300 group-hover:scale-110">
            🚀
          </div>

          <div>
            <div className="text-xl font-extrabold tracking-tight text-white">
              Benchmark AI
            </div>

            <div className="text-xs text-zinc-400">
              YouTube Intelligence Platform
            </div>
          </div>
        </Link>

        {/* Menu */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="text-zinc-300 transition hover:text-cyan-400"
          >
            Home
          </Link>

          <Link
            href="/pricing"
            className="text-zinc-300 transition hover:text-cyan-400"
          >
            Pricing
          </Link>

          <Link
            href="/about"
            className="text-zinc-300 transition hover:text-cyan-400"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-zinc-300 transition hover:text-cyan-400"
          >
            Contact
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          <div className="hidden rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 lg:flex">
            ⭐ Trusted by Creators
          </div>

          <Show when="signed-out">
            <SignInButton mode="modal">

              <button className="rounded-full border border-zinc-700 px-5 py-2 font-medium text-white transition hover:border-cyan-500 hover:bg-zinc-800">
                Sign In
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