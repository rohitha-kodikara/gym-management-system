import { RotateCcw } from "lucide-react";
import { UI_TEXT } from "@/lib/uiText";

const errorCopy = UI_TEXT.sectionLoadError;

export function LocationsError({ onRetry }) {
  return (
    <section
      id="locations"
      className="relative flex min-h-screen w-full scroll-mt-16 items-center justify-center bg-[#0a0a0a]"
    >
      <div className="rounded-3xl border border-[#262626] bg-[#141414] p-12 text-center">
        <p className="text-lg font-semibold text-white">{errorCopy.title}</p>
        <p className="mt-2 text-sm text-[#a3a3a3]">{errorCopy.subtitle}</p>
        <button
          onClick={onRetry}
          className="mt-4 flex items-center gap-2 text-sm text-[#dc2626] transition-colors hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
          {errorCopy.retryButton}
        </button>
      </div>
    </section>
  );
}
