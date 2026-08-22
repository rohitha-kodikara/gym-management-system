import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { locations } from "../data/locations";
import { Badge } from "./ui/Badge";

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

  const maxIndex = Math.max(0, locations.length - perView);
  const activeIndex = Math.min(index, maxIndex);
  const slideWidth = perView === 1 ? 100 : 100 / perView;

  useEffect(() => {
    const handleResize = () => setPerView(getPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <section
      id="locations"
      className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center overflow-x-hidden bg-[#0a0a0a] py-10 md:py-24 lg:py-18"
    >
      <div className="px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">Locations</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-2xl text-center lg:py-17 lg:pb-0">
          <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
            Train Close to <span className="text-[#dc2626]">Home</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3]">
            Find a KJ Power Fitness Center near you. All branches offer the same
            premium experience.
          </p>
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
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="min-w-0 shrink-0 flex justify-center"
                  style={{ width: `${slideWidth}%` }}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="group mx-4 flex h-full flex-col overflow-hidden rounded-2xl border border-[#262626] bg-[#141414] sm:mx-2"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={location.image}
                        alt={`${location.city} branch`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
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
                        View on Map <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              ))}
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

