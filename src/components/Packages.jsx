import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "./SectionReveal";
import { packages } from "../data/packages";
import { Button } from "./custom-ui/Button";
import { Badge } from "./ui/Badge";

export function Packages() {
  return (
    <section
      id="packages"
      className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">Memberships</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-2xl text-center lg:py-17 lg:pb-0">
          <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
            Pick Your <span className="text-[#dc2626]">Power Plan</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3]">
            Flexible packages built for every goal and budget. No hidden fees,
            no long-term contracts.
          </p>
        </SectionReveal>

        <StaggerContainer
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
          delay={0.1}
        >
          {packages.map((pkg) => (
            <StaggerItem key={pkg.type}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className={`relative flex h-full flex-col rounded-2xl border p-6 transition-colors ${
                  pkg.popular
                    ? "border-[#dc2626] bg-gradient-to-b from-[#1a1a1a] to-[#141414]"
                    : "border-[#262626] bg-[#141414] hover:border-[#404040]"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#dc2626] px-3 py-1 text-xs font-bold text-white">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-[#a3a3a3]">
                    {pkg.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-black text-white">
                    Rs. {pkg.price}
                  </span>
                  <span className="text-sm text-[#a3a3a3]">
                    {" "}
                    / {pkg.duration}
                  </span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dc2626]/15 text-[#dc2626]">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-[#d4d4d4]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  animate
                  variant={pkg.popular ? "primary" : "secondary"}
                  className="w-full"
                >
                  Choose {pkg.name}
                </Button>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
