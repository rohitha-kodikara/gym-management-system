import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { getLocations, getLocationSection, getStrapiMedia } from "../lib/strapi";
import { useQuery } from "@tanstack/react-query";
import { clean } from "@/lib/text";
import { UI_TEXT } from "@/lib/uiText";

import { SectionReveal } from "./SectionReveal";
import { Badge } from "./ui/Badge";

/* ─── constants ──────────────────────────────────────────────────── */
const errorCopy = UI_TEXT.sectionLoadError;

const FALLBACKS = {
  badge: "Locations",
  headingLine1: "Train Close to",
  headingHighlight: "Home",
  description:
    "Find a KJ Power Fitness Center near you. All branches offer the same premium experience.",
  mapButtonText: "View On Map",
};

/* ─── sub-components ─────────────────────────────────────────────── */
function LocationsSkeleton() {
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

function LocationsError({ onRetry }) {
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

/* ─── carousel helpers ───────────────────────────────────────────── */
function getPerView() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

/* ─── component ──────────────────────────────────────────────────── */
export function Locations() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(getPerView);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => setPerView(getPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data: locationsData,
    isLoading,
    error,
    refetch: refetchLocations,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  const {
    data: locationSectionData,
    isLoading: locationSectionLoading,
    error: locationSectionError,
    refetch: refetchSection,
  } = useQuery({
    queryKey: ["locations-section"],
    queryFn: getLocationSection,
  });

  const safeLocations = locationsData ?? [];
  const maxIndex = Math.max(0, safeLocations.length - perView);
  const activeIndex = Math.min(index, maxIndex);
  const slideWidth = perView === 1 ? 100 : 100 / perView;

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [next, paused, maxIndex]);

  /* ── loading state ────────────────────────────────────────────── */
  if (isLoading || locationSectionLoading) {
    return <LocationsSkeleton />;
  }

  /* ── error state (show only if no stale data is available) ────── */
  const isLocationsError = error && !locationsData;
  const isSectionError = locationSectionError && !locationSectionData;

  if (isLocationsError || isSectionError) {
    return (
      <LocationsError
        onRetry={() => {
          if (isLocationsError) refetchLocations();
          if (isSectionError) refetchSection();
        }}
      />
    );
  }

  /* ── derive section-level fields ──────────────────────────────── */
  const badge = clean(locationSectionData?.badgeText, FALLBACKS.badge);
  const headingLine1 = clean(
    locationSectionData?.headingLine1,
    FALLBACKS.headingLine1
  );
  const headingHighlight = clean(
    locationSectionData?.headingHighlight,
    FALLBACKS.headingHighlight
  );
  const description = clean(
    locationSectionData?.description,
    FALLBACKS.description
  );
  const mapButtonText = clean(
    locationSectionData?.mapLinkButtonText,
    FALLBACKS.mapButtonText
  );

  /* ── render ───────────────────────────────────────────────────── */
  return (
    <section
      id="locations"
      className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center overflow-x-hidden bg-[#0a0a0a] py-10 md:py-24 lg:py-18"
    >
      <div className="px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">{badge}</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-2xl text-center lg:py-17 lg:pb-0">
          <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
            {headingLine1}{" "}
            <span className="text-[#dc2626]">{headingHighlight}</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3]">{description}</p>
        </SectionReveal>

        <div
          className="relative mt-14 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            onClick={prev}
            aria-label="Previous location"
            className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#262626] bg-[#141414] text-white shadow-lg transition-colors hover:border-[#dc2626] hover:bg-[#dc2626]"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={next}
            aria-label="Next location"
            className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#262626] bg-[#141414] text-white shadow-lg transition-colors hover:border-[#dc2626] hover:bg-[#dc2626]"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="overflow-hidden">
            <motion.div
              className="flex w-full"
              animate={{ x: `-${activeIndex * slideWidth}%` }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
            >
              {safeLocations.map((location) => {
                const imageUrl = getStrapiMedia(location.image);
                return (
                  <div
                    key={location.documentId}
                    className="min-w-0 shrink-0 flex justify-center"
                    style={{ width: `${slideWidth}%` }}
                  >
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="group mx-4 flex h-full flex-col overflow-hidden rounded-2xl border border-[#262626] bg-[#141414] sm:mx-2"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-[#262626]">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={
                              location.image?.alternativeText ||
                              `${location.city} branch`
                            }
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling?.classList.remove(
                                "hidden"
                              );
                            }}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : null}
                        <div
                          className={`flex h-full w-full items-center justify-center ${
                            imageUrl ? "hidden" : ""
                          }`}
                        >
                          <MapPin className="h-10 w-10 text-[#404040]" />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <h3 className="text-lg font-bold text-white">
                          {location.city}
                        </h3>

                        <ul className="mt-4 flex-1 space-y-2.5 text-sm">
                          <li className="flex items-start gap-2 text-[#a3a3a3]">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" />
                            {location.address}
                          </li>
                          <li className="flex items-center gap-2 text-[#a3a3a3]">
                            <Phone className="h-4 w-4 shrink-0 text-[#dc2626]" />
                            {location.phone}
                          </li>
                          <li className="flex items-start gap-2 text-[#a3a3a3]">
                            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" />
                            {location.hours}
                          </li>
                        </ul>

                        <a
                          href={location.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#dc2626] transition-colors hover:text-[#fca5a5]"
                        >
                          {mapButtonText}{" "}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-[#dc2626]"
                    : "w-2 bg-[#262626] hover:bg-[#404040]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
