import { SectionReveal, StaggerContainer, StaggerItem } from "./SectionReveal";
import { Badge } from "./ui/Badge";

const stats = [
  { value: "12+", label: "Years of Excellence" },
  { value: "4", label: "Island-Wide Locations" },
  { value: "25+", label: "Expert Coaches" },
  { value: "8K+", label: "Transformed Members" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">Our Story</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <div className="grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:items-center sm:gap-12 lg:gap-16 lg:py-8 lg:pb-0 ">
          {/* Heading + mobile intro - appears first on mobile, top-right on sm */}
          <SectionReveal className="sm:col-start-2 sm:row-start-1 -my-4">
            <h2 className="text-center text-3xl  font-black leading-relaxed text-white sm:text-left md:text-4xl lg:text-5xl">
              We Believe Strength Is Built,{" "}
              <span className="text-[#dc2626]">Not Born.</span>
            </h2>
            <p className="mt-6 text-left leading-relaxed text-[#a3a3a3] sm:hidden">
              Founded in Colombo with a single mission — to bring world-class
              fitness culture to Sri Lanka —
            </p>
          </SectionReveal>

          {/* Image - appears second on mobile, full left column on sm */}
          <SectionReveal
            direction="left"
            className="relative h-full sm:col-start-1 sm:row-start-1 sm:row-span-2"
          >
            <div className="relative w-full overflow-hidden rounded-2xl sm:h-full">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                alt="Modern gym with members training"
                className="h-full w-full rounded-2xl object-contain sm:object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
            </div>
          </SectionReveal>

          {/* Text content + stats - appears third on mobile, bottom-right on sm */}
          <div className="sm:col-start-2 sm:row-start-2 sm:h-full">
            <SectionReveal delay={0.1}>
              <p className="leading-relaxed text-[#a3a3a3]">
                Founded in Colombo with a single mission — to bring world-class
                fitness culture to Sri Lanka — KJ Power Fitness Center has grown
                into one of the island&apos;s most trusted names in health and
                performance.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="mt-4 leading-relaxed text-[#a3a3a3]">
                Our philosophy is simple: combine modern equipment,
                science-backed programming, and passionate coaches in an
                environment where everyone — from first-timers to competitive
                athletes — feels empowered to level up.
              </p>
            </SectionReveal>

            <StaggerContainer
              className="mt-10 grid grid-cols-2 gap-4"
              stagger={0.08}
              delay={0.3}
            >
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className=" h-full items-center justify-center rounded-xl border border-[#262626] bg-[#141414] p-4 md:p-8 text-center transition-colors hover:border-[#dc2626]/40 w-full min-w-0 overflow-hidden">
                    <p className="text-2xl font-black text-white md:text-3xl leading-none whitespace-nowrap">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-[#a3a3a3] w-full break-words">
                      {stat.label}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
