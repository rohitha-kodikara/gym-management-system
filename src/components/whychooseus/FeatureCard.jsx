import { motion } from "framer-motion";
import { Dumbbell, Users, ClipboardList, CalendarCheck, Sparkles, Target } from "lucide-react";

const iconMap = {
  Dumbbell,
  Users,
  ClipboardList,
  CalendarCheck,
  Sparkles,
  Target,
};

export function FeatureCard({ feature }) {
  const Icon = iconMap[feature.icon];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group h-full rounded-2xl border border-[#262626] bg-[#141414] p-6 transition-colors hover:border-[#dc2626]/40"
    >
      <div className="mb-4 inline-flex rounded-xl bg-[#dc2626]/10 p-3 text-[#dc2626]">
        {Icon && <Icon className="h-6 w-6" />}
      </div>
      <h3 className="text-lg font-bold text-white">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">
        {feature.description}
      </p>
    </motion.div>
  );
}
