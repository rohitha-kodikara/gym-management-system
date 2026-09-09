import { useQuery } from "@tanstack/react-query";
import { getBmiSection } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useBmiSection() {
  return useQuery({
    queryKey: queryKeys.bmiSection,
    queryFn: getBmiSection,
    staleTime: 30_000,
  });
}
