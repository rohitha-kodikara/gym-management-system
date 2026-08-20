import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "./SectionReveal";
import { locations } from "../data/locations";
import { Badge } from "./ui/Badge";

export function Locations() {
  return (
    <section
      id="locations"
      className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-18"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-6">
          <div className="flex items-center gap-4">
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

        <StaggerContainer
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
          delay={0.1}
        >
          {locations.map((location) => (
            <StaggerItem key={location.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#262626] bg-[#141414]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={location.image}
                    alt={`${location.city} branch`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
