export function FinalCTALoadingSkeleton() {
  return (
    <section className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center overflow-hidden bg-[#0a0a0a] py-10 md:py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#262626]" />
          <div className="h-7 w-32 animate-pulse rounded-full bg-[#262626]" />
          <div className="h-px flex-1 bg-[#262626]" />
        </div>

        <div className="mx-auto max-w-4xl text-center lg:py-17 lg:pb-0">
          <div className="mx-auto h-12 w-3/4 animate-pulse rounded-lg bg-[#262626] md:h-14" />
          <div className="mx-auto mt-4 h-12 w-1/2 animate-pulse rounded-lg bg-[#262626] md:h-14" />
          <div className="mx-auto mt-6 h-5 w-2/3 animate-pulse rounded bg-[#262626]" />
          <div className="mx-auto mt-3 h-5 w-1/2 animate-pulse rounded bg-[#262626]" />

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="h-12 w-40 animate-pulse rounded-md bg-[#dc2626]/30" />
            <div className="h-12 w-56 animate-pulse rounded-md bg-[#262626]" />
          </div>
        </div>
      </div>
    </section>
  );
}
