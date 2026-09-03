import { ArrowRight, Calendar, RotateCcw } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { Button } from "./custom-ui/Button";
import { Badge } from "./ui/Badge";
import { useQuery } from "@tanstack/react-query";
import { getFinalCTA, getStrapiMedia } from "@/lib/strapi";
import { clean, decodeEntities } from "@/lib/text";
import { UI_TEXT } from "@/lib/uiText";

const errorCopy = UI_TEXT.sectionLoadError;

export function FinalCTA() {
  const {
    data: finalCTAData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["final-cta"],
    queryFn: getFinalCTA,
    staleTime: Infinity,
  });

  if (isLoading) {
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

  if (error) {
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
              onClick={() => refetch()}
            >
              <RotateCcw className="h-4 w-4" />
              {errorCopy.retryButton}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const {
    badgeText,
    heading,
    headingHighlight,
    description,
    primaryButtonText,
    secondaryButtonText,
    backgroundImage,
  } = finalCTAData ?? {};

  const badge = clean(badgeText, "Start Today");
  const title = clean(heading, "Your Stronger Journey");
  const highlight = clean(headingHighlight, "Starts Today.");
  const desc = decodeEntities(
    clean(
      description,
      "Don't wait for Monday. Walk into any KJ Power branch, book a free consultation, and take the first step toward the strongest version of yourself."
    )
  );
  const primaryBtn = clean(primaryButtonText, "Join Now");
  const secondaryBtn = clean(secondaryButtonText, "Book a Free Consultation");

  const bgUrl = getStrapiMedia(backgroundImage);
  const bgStyle = bgUrl
    ? { backgroundImage: `url('${bgUrl}')` }
    : {
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')",
      };
  const ariaLabel = backgroundImage?.alternativeText || "Fitness background";

  return (
    <section
      className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center overflow-hidden bg-[#0a0a0a] py-10 md:py-24 lg:py-32"
      role="img"
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_60%)]" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={bgStyle}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">{badge}</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-4xl text-center lg:py-17 lg:pb-0">
          <h2 className="text-4xl font-black text-white md:text-5xl lg:text-6xl">
            {title}{" "}
            <span className="text-[#dc2626]">{highlight}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#a3a3a3]">
            {desc}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button animate size="lg" className="group w-full sm:w-auto">
              {primaryBtn}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              animate
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Calendar className="h-4 w-4" />
              {secondaryBtn}
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
