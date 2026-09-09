import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LocationCard } from "./LocationCard";

export function LocationCarousel({
  locations,
  activeIndex,
  slideWidth,
  onPrev,
  onNext,
  onDotClick,
  maxIndex,
  mapButtonText,
  onPause,
  onResume,
}) {
  return (
    <div
      className="relative mt-14 overflow-hidden"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      <button
        onClick={onPrev}
        aria-label="Previous location"
        className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#262626] bg-[#141414] text-white shadow-lg transition-colors hover:border-[#dc2626] hover:bg-[#dc2626]"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={onNext}
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
          {locations.map((location) => (
            <div
              key={location.documentId}
              className="min-w-0 shrink-0 flex justify-center"
              style={{ width: `${slideWidth}%` }}
            >
              <LocationCard location={location} mapButtonText={mapButtonText} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
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
  );
}
