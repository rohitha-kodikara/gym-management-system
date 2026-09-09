import { useQuery } from "@tanstack/react-query";
import { getTestimonialSection } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useTestimonialSection() {
  return useQuery({
    queryKey: queryKeys.testimonialSection,
    queryFn: getTestimonialSection,
  });
}
