import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "./SectionReveal";
import { programs } from "../data/programs";
import { Badge } from "./ui/Badge";

export function TrainingPrograms() {
  return (
    <section className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-25">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">Training Programs</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-2xl text-center lg:py-17 lg:pb-0">
          <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
            Programs Built for{" "}
            <span className="text-[#dc2626]">Real Results</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3]">
            Whether you want to build muscle, lose weight, or improve endurance
            — we have a program for you.
          </p>
        </SectionReveal>

        <StaggerContainer
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
          delay={0.1}
        >
          {programs.map((program) => (
            <StaggerItem key={program.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-[#262626] bg-[#141414]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                </div>

                <div className="relative p-6">
                  <Badge variant="lime" className="mb-3">
                    {program.level}
                  </Badge>
                  <h3 className="text-xl font-bold text-white">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">
                    {program.description}
                  </p>
                  <button className="mt-4 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#dc2626] transition-colors group-hover:text-[#fca5a5]">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
