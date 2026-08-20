import { motion } from "framer-motion";
import { SectionReveal, StaggerContainer, StaggerItem } from "./SectionReveal";
import { features } from "../data/features";
import { Badge } from "./ui/Badge";

export function WhyChooseUs() {
  return (
    <section className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-25">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">Why Choose Us</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-2xl text-center lg:py-17 lg:pb-0 ">
          <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
            Everything You Need to{" "}
            <span className="text-[#dc2626]">Level Up</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3]">
            We don&apos;t just offer equipment — we deliver a complete fitness
            experience designed around real results.
          </p>
        </SectionReveal>

        <StaggerContainer
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
          delay={0.1}
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group h-full rounded-2xl border border-[#262626] bg-[#141414] p-6 transition-colors hover:border-[#dc2626]/40"
              >
                <div className="mb-4 inline-flex rounded-xl bg-[#dc2626]/10 p-3 text-[#dc2626]">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
