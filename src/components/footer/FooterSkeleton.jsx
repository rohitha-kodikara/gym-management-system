export function FooterSkeleton() {
  return (
    <footer
      id="contact"
      className="w-full border-t border-[#262626] bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex h-9 w-32 animate-pulse rounded-lg bg-[#262626]" />
            <div className="h-4 w-full animate-pulse rounded bg-[#262626]" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-[#262626]" />
            <div className="mt-6 flex gap-4">
              <div className="h-5 w-20 animate-pulse rounded bg-[#262626]" />
              <div className="h-5 w-20 animate-pulse rounded bg-[#262626]" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-[#262626]" />
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 w-28 animate-pulse rounded bg-[#262626]"
              />
            ))}
          </div>

          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-[#262626]" />
            <div className="h-4 w-36 animate-pulse rounded bg-[#262626]" />
            <div className="h-4 w-40 animate-pulse rounded bg-[#262626]" />
            <div className="h-4 w-44 animate-pulse rounded bg-[#262626]" />
          </div>

          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-[#262626]" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1">
                <div className="h-4 w-24 animate-pulse rounded bg-[#262626]" />
                <div className="h-4 w-40 animate-pulse rounded bg-[#262626]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
