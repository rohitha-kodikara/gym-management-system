import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useHeroPage } from "@/hooks/queries";
import { getStrapiMedia } from "@/lib/strapi";
import { useState } from "react";
import { clean } from "@/lib/text";
import { HeroSkeleton } from "./HeroSkeleton";
import { HeroError } from "./HeroError";
import { HeroContent } from "./HeroContent";
import { HeroBookingForm } from "./HeroBookingForm";

const FALLBACKS = {
  badge: "Sri Lanka's Premium Fitness Destination",
  mainHeadingLine1: "Build Your",
  mainHeadingHighlight: "Strongest Self.",
  description:
    "Join KJ Power Fitness Center and train with expert coaches, world-class equipment, and a community that pushes you to become stronger every single day.",
  primaryButtonText: "Join Now",
  secondaryButtonText: "Explore Packages",
  bookingFormTitle: "Book Your Appointment",
  locationLabel: "Location",
  locationPlaceholder: "Branch",
  datetimeLabel: "Date / Time",
  trainingLabel: "Training",
  trainingPlaceholder: "Program",
  submitButtonText: "Book Appointment",
  successMessage: "Appointment booked — see you soon!",
  backgroundImageAlt: "Athlete training",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const [success, setSuccess] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const { hero: heroSData, locations: locationsData, isLoading, error, onRetry } =
    useHeroPage();

  if (isLoading) return <HeroSkeleton />;
  if (error) return <HeroError onRetry={onRetry} />;

  const badge = clean(heroSData?.badgeText, FALLBACKS.badge);
  const heading1 = clean(heroSData?.mainHeadingLine1, FALLBACKS.mainHeadingLine1);
  const highlight = clean(heroSData?.mainHeadingHighlight, FALLBACKS.mainHeadingHighlight);
  const desc = clean(heroSData?.description, FALLBACKS.description);
  const primaryBtn = clean(heroSData?.primaryButtonText, FALLBACKS.primaryButtonText);
  const secondaryBtn = clean(heroSData?.secondaryButtonText, FALLBACKS.secondaryButtonText);
  const formTitle = clean(heroSData?.bookingFormTitle, FALLBACKS.bookingFormTitle);
  const locLabel = clean(heroSData?.locationLabel, FALLBACKS.locationLabel);
  const locPlaceholder = clean(heroSData?.locationPlaceholder, FALLBACKS.locationPlaceholder);
  const dtLabel = clean(heroSData?.datetimeLabel, FALLBACKS.datetimeLabel);
  const trainLabel = clean(heroSData?.trainingLabel, FALLBACKS.trainingLabel);
  const trainPlaceholder = clean(heroSData?.trainingPlaceholder, FALLBACKS.trainingPlaceholder);
  const submitBtn = clean(heroSData?.submitButtonText, FALLBACKS.submitButtonText);
  const successMsg = clean(heroSData?.successMessage, FALLBACKS.successMessage);

  const heroImageUrl = getStrapiMedia(heroSData?.backgroundImage);
  const heroImageAlt = heroSData?.backgroundImage?.alternativeText || FALLBACKS.backgroundImageAlt;
  const trainingOptions = heroSData?.trainingOptions ?? [];

  function handleSuccess() {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full scroll-mt-16 overflow-hidden bg-[#0a0a0a]"
    >
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-[#22c55e]/30 bg-[#0a0a0a]/95 px-5 py-3 text-sm font-semibold text-[#86efac] shadow-2xl shadow-black/50 backdrop-blur-md"
          >
            <CheckCircle2 className="h-4 w-4 text-[#22c55e]" />
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[#0a0a0a]">
        {heroImageUrl && (
          <img
            src={heroImageUrl}
            alt={heroImageAlt}
            onLoad={() => setHeroLoaded(true)}
            onError={() => setHeroLoaded(true)}
            className={`h-full w-full object-cover object-[70%_top] transition-opacity duration-700 md:object-[65%_top] ${
              heroLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-32 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full items-start gap-12 sm:grid-cols-2 sm:gap-x-16 lg:gap-x-24"
        >
          <HeroContent
            badge={badge}
            heading1={heading1}
            highlight={highlight}
            description={desc}
            primaryBtn={primaryBtn}
            secondaryBtn={secondaryBtn}
          />

          <HeroBookingForm
            formTitle={formTitle}
            locationsData={locationsData}
            trainingOptions={trainingOptions}
            locLabel={locLabel}
            locPlaceholder={locPlaceholder}
            dtLabel={dtLabel}
            trainLabel={trainLabel}
            trainPlaceholder={trainPlaceholder}
            submitBtn={submitBtn}
            onSuccess={handleSuccess}
          />
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 hidden animate-bounce justify-center md:flex">
        <div className="h-10 w-6 rounded-full border-2 border-white/20 p-1">
          <div className="h-2 w-full rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
