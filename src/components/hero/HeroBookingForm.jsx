import { motion } from "framer-motion";
import { MapPin, Clock, Dumbbell } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { clean } from "@/lib/text";

const formSchema = z.object({
  location: z.string().min(1, "Select a branch"),
  datetime: z.string().min(1, "Select a date & time"),
  trainingType: z.string().min(1, "Select a program"),
});

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroBookingForm({
  formTitle,
  locationsData,
  trainingOptions,
  locLabel,
  locPlaceholder,
  dtLabel,
  trainLabel,
  trainPlaceholder,
  submitBtn,
  onSuccess,
}) {
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

  function onSubmit() {
    form.reset();
    onSuccess();
  }

  return (
    <div className="flex justify-center sm:justify-end">
      <motion.div
        variants={itemVariants}
        className="w-full rounded-2xl border border-[#262626]/80 bg-[#0a0a0a]/70 p-4 backdrop-blur-md sm:max-w-md sm:mt-1 md:p-5"
      >
        <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-[#a3a3a3]">
          {formTitle}
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
                    <span>{locLabel}</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 min-h-11 max-h-11 w-full bg-[#0a0a0a] py-0 text-xs leading-none sm:text-sm">
                        <SelectValue placeholder={locPlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(locationsData ?? []).map((loc) => (
                        <SelectItem
                          key={loc.documentId}
                          value={loc.locationId}
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
                    <span>{dtLabel}</span>
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
                    <span>{trainLabel}</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 min-h-11 max-h-11 w-full bg-[#0a0a0a] py-0 text-xs leading-none sm:text-sm">
                        <SelectValue placeholder={trainPlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {trainingOptions.map((opt) => (
                        <SelectItem
                          key={opt.id}
                          value={opt.value}
                          className="text-xs sm:text-sm"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
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
                {submitBtn}
              </ShadcnButton>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
