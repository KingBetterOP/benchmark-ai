import Link from "next/link";

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
          <Link href="/" className="hover:text-blue-400 transition">
            Home
          </Link>

          <Link href="/pricing" className="hover:text-blue-400 transition">
            Pricing
          </Link>

          <Link href="/about" className="hover:text-blue-400 transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}