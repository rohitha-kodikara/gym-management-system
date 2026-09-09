import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "../custom-ui/Button";

export function PackageCard({ type, name, price, duration, description, features, popular }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className={`relative flex h-full flex-col rounded-2xl border p-6 transition-colors ${
        popular
          ? "border-[#dc2626] bg-gradient-to-b from-[#1a1a1a] to-[#141414]"
          : "border-[#262626] bg-[#141414] hover:border-[#404040]"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#dc2626] px-3 py-1 text-xs font-bold text-white">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="mt-1 text-sm text-[#a3a3a3]">{description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-black text-white">Rs. {price}</span>
        <span className="text-sm text-[#a3a3a3]"> / {duration}</span>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dc2626]/15 text-[#dc2626]">
              <Check className="h-3 w-3" />
            </span>
            <span className="text-[#d4d4d4]">{feature}</span>
          </li>
        ))}
      </ul>

      <Button animate variant={popular ? "primary" : "secondary"} className="w-full">
        Choose {name}
      </Button>
    </motion.div>
  );
}
