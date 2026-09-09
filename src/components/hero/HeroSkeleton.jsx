export function HeroSkeleton() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full scroll-mt-16 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-32 md:px-6 lg:px-8">
        <div className="grid w-full items-start gap-12 sm:grid-cols-2 sm:gap-x-16 lg:gap-x-24">
          <div className="space-y-6">
            <div className="h-6 w-60 animate-pulse rounded-full bg-[#262626]" />
            <div className="h-14 w-3/4 animate-pulse rounded-lg bg-[#262626]" />
            <div className="h-14 w-1/2 animate-pulse rounded-lg bg-[#262626]" />
            <div className="space-y-2">
              <div className="h-5 w-full animate-pulse rounded bg-[#262626]" />
              <div className="h-5 w-4/5 animate-pulse rounded bg-[#262626]" />
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-36 animate-pulse rounded-md bg-[#dc2626]/30" />
              <div className="h-12 w-36 animate-pulse rounded-md bg-[#262626]" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#262626]/80 bg-[#0a0a0a]/70 p-5 sm:max-w-md">
            <div className="mb-6 h-3 w-40 animate-pulse rounded bg-[#262626]" />
            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="h-3 w-16 animate-pulse rounded bg-[#262626]" />
                <div className="h-11 w-full animate-pulse rounded-md bg-[#262626]" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-20 animate-pulse rounded bg-[#262626]" />
                <div className="h-11 w-full animate-pulse rounded-md bg-[#262626]" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-16 animate-pulse rounded bg-[#262626]" />
                <div className="h-11 w-full animate-pulse rounded-md bg-[#262626]" />
              </div>
              <div className="h-11 w-full animate-pulse rounded-md bg-[#dc2626]/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
