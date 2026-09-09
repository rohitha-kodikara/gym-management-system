export function BMILoadingSkeleton() {
  return (
    <section className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#262626]" />
          <div className="h-7 w-40 animate-pulse rounded-full bg-[#262626]" />
          <div className="h-px flex-1 bg-[#262626]" />
        </div>

        <div className="mb-8 md:mb-12">
          <div className="mx-auto h-10 w-3/4 animate-pulse rounded-lg bg-[#262626] md:h-12" />
          <div className="mx-auto mt-4 h-10 w-2/3 animate-pulse rounded-lg bg-[#262626] md:h-12" />
        </div>

        <div className="rounded-3xl border border-[#84cc16]/20 bg-gradient-to-br from-[#141414] to-[#0f0f0f] p-6 shadow-xl md:p-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="h-7 w-56 animate-pulse rounded-full bg-[#262626]" />
            </div>
            <div className="hidden rounded-2xl bg-[#84cc16]/10 p-4 md:block">
              <div className="h-10 w-10 animate-pulse rounded-md bg-[#84cc16]/20" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-3 w-12 animate-pulse rounded bg-[#262626]" />
                <div className="h-10 w-full animate-pulse rounded-md bg-[#262626]" />
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <div className="h-10 w-48 animate-pulse rounded-md bg-[#84cc16]/20" />
            <div className="h-10 w-24 animate-pulse rounded-md bg-[#262626]" />
          </div>
        </div>
      </div>
    </section>
  );
}
