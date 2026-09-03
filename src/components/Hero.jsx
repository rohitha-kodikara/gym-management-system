import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Clock,
  Dumbbell,
  CheckCircle2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getHero } from "@/lib/strapi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "./custom-ui/Button";
import { scrollToSection } from "../utils/scroll";
import { locations } from "../data/locations";

import { Button as ShadcnButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const formSchema = z.object({
  location: z.string().min(1, "Select a branch"),
  datetime: z.string().min(1, "Select a date & time"),
  trainingType: z.string().min(1, "Select a program"),
});

export function Hero() {
  const [success, setSuccess] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      location: "",
      datetime: "",
      trainingType: "",
    },
  });

  const {
    data: heroSData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hero"],
    queryFn: getHero,
  });

  if (isLoading) return null; // or skeleton
  if (error) return null;

  function onSubmit() {
    setSuccess(true);
    form.reset();
    setTimeout(() => setSuccess(false), 4000);
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full scroll-mt-16 overflow-hidden bg-[#0a0a0a]"
    >
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-[#22c55e]/30 bg-[#0a0a0a]/95 px-5 py-3 text-sm font-semibold text-[#86efac] shadow-2xl shadow-black/50 backdrop-blur-md"
          >
            <CheckCircle2 className="h-4 w-4 text-[#22c55e]" />
            Appointment booked — see you soon!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[#0a0a0a]">
        <img
          src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop"
          alt="Athlete training"
          onLoad={() => setHeroLoaded(true)}
          className={`h-full w-full object-cover object-[70%_top] transition-opacity duration-700 md:object-[65%_top] ${
            heroLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-32 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full items-start gap-12 sm:grid-cols-2 sm:gap-x-16 lg:gap-x-24"
        >
          <div>
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dc2626]/30 bg-[#dc2626]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#fca5a5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626]" />
                Sri Lanka&apos;s Premium Fitness Destination
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              Build Your <span className="text-gradient">Strongest Self.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-base leading-relaxed text-[#d4d4d4] md:text-lg"
            >
              Join KJ Power Fitness Center and train with expert coaches,
              world-class equipment, and a community that pushes you to become
              stronger every single day.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center"
            >
              <Button animate size="lg" className="group w-full md:flex-1">
                Join Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                animate
                variant="secondary"
                size="lg"
                className="w-full md:flex-1"
                onClick={() => scrollToSection("packages")}
              >
                Explore Packages
              </Button>
            </motion.div>
          </div>

          <div className="flex justify-center sm:justify-end">
            <motion.div
              variants={itemVariants}
              className=" w-full rounded-2xl border border-[#262626]/80 bg-[#0a0a0a]/70 p-4 backdrop-blur-md sm:max-w-md sm:mt-1 md:p-5"
            >
              <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-[#a3a3a3]">
                Book Your Appointment
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-xs font-medium text-[#a3a3a3]">
                          <MapPin className="h-3.5 w-3.5 text-[#dc2626]" />
                          <span>Location</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11 min-h-11 max-h-11 w-full bg-[#0a0a0a] py-0 text-xs leading-none sm:text-sm">
                              <SelectValue placeholder="Branch" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locations.map((loc) => (
                              <SelectItem
                                key={loc.id}
                                value={loc.id}
                                className="text-xs sm:text-sm"
                              >
                                {loc.city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs font-medium text-[#ef4444]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="datetime"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-xs font-medium text-[#a3a3a3]">
                          <Clock className="h-3.5 w-3.5 text-[#dc2626]" />
                          <span>Date / Time</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="box-border h-11 min-h-11 max-h-11 bg-[#0a0a0a] py-0 text-xs leading-none sm:text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-medium text-[#ef4444]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trainingType"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-xs font-medium text-[#a3a3a3]">
                          <Dumbbell className="h-3.5 w-3.5 text-[#dc2626]" />
                          <span>Training</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11 min-h-11 max-h-11 w-full bg-[#0a0a0a] py-0 text-xs leading-none sm:text-sm">
                              <SelectValue placeholder="Program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem
                              value="strength"
                              className="text-xs sm:text-sm"
                            >
                              Strength
                            </SelectItem>
                            <SelectItem
                              value="weight-loss"
                              className="text-xs sm:text-sm"
                            >
                              Weight Loss
                            </SelectItem>
                            <SelectItem
                              value="personal"
                              className="text-xs sm:text-sm"
                            >
                              Personal
                            </SelectItem>
                            <SelectItem
                              value="cardio"
                              className="text-xs sm:text-sm"
                            >
                              Cardio
                            </SelectItem>
                            <SelectItem
                              value="muscle"
                              className="text-xs sm:text-sm"
                            >
                              Muscle
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs font-medium text-[#ef4444]" />
                      </FormItem>
                    )}
                  />

                  <div>
                    <ShadcnButton
                      type="submit"
                      className="h-11 w-full bg-[#dc2626] text-sm font-semibold text-white hover:bg-[#b91c1c]"
                    >
                      Book Appointment
                    </ShadcnButton>
                  </div>
                </form>
              </Form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 hidden animate-bounce justify-center md:flex">
        <div className="h-10 w-6 rounded-full border-2 border-white/20 p-1">
          <div className="h-2 w-full rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
