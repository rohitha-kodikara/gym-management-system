import { useQuery } from "@tanstack/react-query";
import { getTestimonials, getTestimonialSection } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useTestimonialsPage() {
  const testimonialsQuery = useQuery({
    queryKey: queryKeys.testimonials,
    queryFn: getTestimonials,
  });

  const sectionQuery = useQuery({
    queryKey: queryKeys.testimonialSection,
    queryFn: getTestimonialSection,
  });

  const isLoading = testimonialsQuery.isLoading || sectionQuery.isLoading;
  const hasError = testimonialsQuery.error || sectionQuery.error;

  return {
    testimonials: testimonialsQuery.data ?? [],
    section: sectionQuery.data ?? {},
    isLoading,
    error: hasError,
  };
}
