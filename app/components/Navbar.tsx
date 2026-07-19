"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight hover:text-blue-400 transition"
        >
          🚀 Benchmark AI
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          <Show when="signed-out">
  <SignInButton mode="modal">
    <button className="rounded-lg bg-blue-600 px-3 py-2 hover:bg-blue-700 transition">
      Login
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