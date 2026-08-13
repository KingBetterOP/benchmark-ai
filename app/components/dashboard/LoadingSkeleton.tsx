export default function LoadingSkeleton() {
  return (
    <div className="mx-auto mt-12 max-w-7xl animate-pulse">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="h-8 w-64 rounded bg-zinc-800" />

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-36 rounded-2xl bg-zinc-800"
            />
          ))}
        </div>

        <div className="mt-8 h-72 rounded-3xl bg-zinc-800" />
      </div>
    </div>
  );
}