import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";
import { Badge } from "../ui/Badge";

export function ProgramCard({ program, learnMoreText }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-[#262626] bg-[#141414]"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={getStrapiMedia(program.image)}
          alt={program.title ?? "Program"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      </div>

      <div className="relative p-6">
        <Badge variant="lime" className="mb-3">
          {program.level}
        </Badge>
        <h3 className="text-xl font-bold text-white">{program.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">
          {program.description}
        </p>
        <button className="mt-4 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#dc2626] transition-colors group-hover:text-[#fca5a5]">
          {learnMoreText} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
