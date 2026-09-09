import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useTestimonials() {
  return useQuery({
    queryKey: queryKeys.testimonials,
    queryFn: getTestimonials,
  });
}
