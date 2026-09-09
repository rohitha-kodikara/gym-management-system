import { RotateCcw } from "lucide-react";
import { UI_TEXT } from "@/lib/uiText";

const errorCopy = UI_TEXT.sectionLoadError;

export function FooterError({ isFooterError, isLocationsError, onRetry }) {
  const message =
    isFooterError && isLocationsError
      ? "We couldn't load the footer content right now."
      : isFooterError
        ? "We couldn't load the footer right now."
        : "We couldn't load the locations right now.";

  return (
    <footer
      id="contact"
      className="w-full border-t border-[#262626] bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-[#262626] bg-[#141414] p-12 text-center">
          <p className="text-sm text-[#a3a3a3]">{message}</p>
          <button
            onClick={onRetry}
            className="flex items-center gap-2 text-sm text-[#dc2626] transition-colors hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            {errorCopy.retryButton}
          </button>
        </div>
      </div>
    </footer>
  );
}
