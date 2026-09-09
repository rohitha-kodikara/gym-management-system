import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";
import { StarRating } from "./StarRating";

export function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="relative h-full rounded-2xl border border-[#262626] bg-[#141414] p-6 md:p-8"
    >
      <Quote className="absolute right-6 top-6 h-10 w-10 text-[#262626]" />

      <StarRating rating={testimonial.rating} />

      <p className="relative z-10 mt-4 text-base leading-relaxed text-[#d4d4d4] md:text-lg">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-4">
        <img
          src={getStrapiMedia(testimonial.avatar)}
          alt={testimonial.name ?? "Member"}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-[#262626]"
        />
        <div>
          <p className="font-bold text-white">{testimonial.name}</p>
          <p className="text-sm text-[#a3a3a3]">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}
