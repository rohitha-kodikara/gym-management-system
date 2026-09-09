import { useCallback, useEffect, useState } from "react";
import { getLocations, getLocationSection } from "@/lib/strapi";
import { useQuery } from "@tanstack/react-query";
import { clean } from "@/lib/text";
import { SectionReveal } from "../SectionReveal";
import { Badge } from "../ui/Badge";
import { LocationsSkeleton } from "./LocationsSkeleton";
import { LocationsError } from "./LocationsError";
import { LocationCarousel } from "./LocationCarousel";

const FALLBACKS = {
  badge: "Locations",
  headingLine1: "Train Close to",
  headingHighlight: "Home",
  description:
    "Find a KJ Power Fitness Center near you. All branches offer the same premium experience.",
  mapButtonText: "View On Map",
};

function getPerView() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

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

  if (isLoading || locationSectionLoading) {
    return <LocationsSkeleton />;
  }

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

        <LocationCarousel
          locations={safeLocations}
          activeIndex={activeIndex}
          slideWidth={slideWidth}
          onPrev={prev}
          onNext={next}
          onDotClick={setIndex}
          maxIndex={maxIndex}
          mapButtonText={mapButtonText}
          onPause={() => setPaused(true)}
          onResume={() => setPaused(false)}
        />
      </div>
    </section>
  );
}
