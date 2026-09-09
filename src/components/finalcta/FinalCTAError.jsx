import { RotateCcw } from "lucide-react";
import { Button } from "../custom-ui/Button";
import { UI_TEXT } from "@/lib/uiText";

const errorCopy = UI_TEXT.sectionLoadError;

export function FinalCTAError({ onRetry }) {
  return (
    <section className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center overflow-hidden bg-[#0a0a0a] py-10 md:py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#262626] bg-[#141414] p-10 text-center md:p-16">
          <p className="text-lg font-semibold text-white">
            {errorCopy.title}
          </p>
          <p className="mt-2 text-sm text-[#a3a3a3]">
            {errorCopy.subtitle}
          </p>
          <Button
            variant="primary"
            className="mt-6"
            type="button"
            onClick={onRetry}
          >
            <RotateCcw className="h-4 w-4" />
            {errorCopy.retryButton}
          </Button>
        </div>
      </div>
    </section>
  );
}
