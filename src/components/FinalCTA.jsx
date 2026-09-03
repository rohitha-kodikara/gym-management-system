import { ArrowRight, Calendar } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { Button } from "./custom-ui/Button";
import { Badge } from "./ui/Badge";
import { useQuery } from "@tanstack/react-query";
import { getFinalCTA } from "@/lib/strapi";

export function FinalCTA() {
  const {
    data: finalCTAData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["final-cta"],
    queryFn: getFinalCTA,
  });

  if (isLoading) return null; // or skeleton
  if (error) return null;

  return (
    <section className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center overflow-hidden bg-[#0a0a0a] py-10 md:py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">Start Today</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-4xl text-center lg:py-17 lg:pb-0">
          <h2 className="text-4xl font-black text-white md:text-5xl lg:text-6xl">
            Your Stronger Journey{" "}
            <span className="text-[#dc2626]">Starts Today.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#a3a3a3]">
            Don&apos;t wait for Monday. Walk into any KJ Power branch, book a
            free consultation, and take the first step toward the strongest
            version of yourself.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button animate size="lg" className="group w-full sm:w-auto">
              Join Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              animate
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Calendar className="h-4 w-4" />
              Book a Free Consultation
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
