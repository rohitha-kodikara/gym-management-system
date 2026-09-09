import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";

export function LocationCard({ location, mapButtonText }) {
  const imageUrl = getStrapiMedia(location.image);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group mx-4 flex h-full flex-col overflow-hidden rounded-2xl border border-[#262626] bg-[#141414] sm:mx-2"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[#262626]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={location.image?.alternativeText || `${location.city} branch`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
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
        <h3 className="text-lg font-bold text-white">{location.city}</h3>

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
          {mapButtonText} <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}
