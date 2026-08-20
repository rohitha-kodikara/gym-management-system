import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "./SectionReveal";
import { testimonials } from "../data/testimonials";
import { Badge } from "./ui/Badge";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.08),transparent_40%)]" />
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">Testimonials</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-2xl text-center lg:py-17 lg:pb-0">
          <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
            Real Members. <span className="text-[#dc2626]">Real Results.</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3]">
            Hear from Sri Lankans who have transformed their lives at KJ Power.
          </p>
        </SectionReveal>

        <StaggerContainer
          className="mt-14 grid gap-6 md:grid-cols-2"
          stagger={0.1}
          delay={0.1}
        >
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="relative h-full rounded-2xl border border-[#262626] bg-[#141414] p-6 md:p-8"
              >
                <Quote className="absolute right-6 top-6 h-10 w-10 text-[#262626]" />

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-[#f97316] text-[#f97316]"
                          : "text-[#404040]"
                      }`}
                    />
                  ))}
                </div>

                <p className="relative z-10 mt-4 text-base leading-relaxed text-[#d4d4d4] md:text-lg">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-[#262626]"
                  />
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-[#a3a3a3]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
