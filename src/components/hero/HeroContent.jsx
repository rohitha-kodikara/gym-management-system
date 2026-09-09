import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../custom-ui/Button";
import { scrollToSection } from "../../utils/scroll";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroContent({
  badge,
  heading1,
  highlight,
  description,
  primaryBtn,
  secondaryBtn,
}) {
  return (
    <div>
      <motion.div variants={itemVariants}>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#dc2626]/30 bg-[#dc2626]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#fca5a5]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626]" />
          {badge}
        </span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
      >
        {heading1} <span className="text-gradient">{highlight}</span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-6 max-w-lg text-base leading-relaxed text-[#d4d4d4] md:text-lg"
      >
        {description}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="mt-8 flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center"
      >
        <Button animate size="lg" className="group w-full md:flex-1">
          {primaryBtn}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button
          animate
          variant="secondary"
          size="lg"
          className="w-full md:flex-1"
          onClick={() => scrollToSection("packages")}
        >
          {secondaryBtn}
        </Button>
      </motion.div>
    </div>
  );
}
