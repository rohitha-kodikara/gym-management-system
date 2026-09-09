export function StatCard({ value, label }) {
  return (
    <div className="h-full items-center justify-center rounded-xl border border-[#262626] bg-[#141414] p-4 text-center transition-colors hover:border-[#dc2626]/40 w-full min-w-0 overflow-hidden md:p-8">
      <p className="text-2xl font-black text-white leading-none whitespace-nowrap md:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-[#a3a3a3] w-full break-words">
        {label}
      </p>
    </div>
  );
}
