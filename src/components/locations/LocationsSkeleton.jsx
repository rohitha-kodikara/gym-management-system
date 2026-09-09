export function LocationsSkeleton() {
  return (
    <section
      id="locations"
      className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center overflow-x-hidden bg-[#0a0a0a] py-10 md:py-24 lg:py-18"
    >
      <div className="px-4 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 md:gap-4">
          <div className="h-px flex-1 bg-[#262626]" />
          <div className="h-7 w-28 animate-pulse rounded-full bg-[#262626]" />
          <div className="h-px flex-1 bg-[#262626]" />
        </div>

        <div className="mx-auto max-w-2xl text-center lg:py-17 lg:pb-0">
          <div className="mx-auto h-12 w-3/4 animate-pulse rounded-lg bg-[#262626] md:h-14" />
          <div className="mx-auto mt-6 h-5 w-2/3 animate-pulse rounded bg-[#262626]" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[#262626] bg-[#141414]"
            >
              <div className="aspect-[4/3] animate-pulse bg-[#262626]" />
              <div className="space-y-3 p-4 sm:p-5">
                <div className="h-5 w-24 animate-pulse rounded bg-[#262626]" />
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-[#262626]" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-[#262626]" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#262626]" />
                </div>
                <div className="h-4 w-28 animate-pulse rounded bg-[#262626]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
