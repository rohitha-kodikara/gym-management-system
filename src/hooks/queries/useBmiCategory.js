import { useQuery } from "@tanstack/react-query";
import { getBmiCategory } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useBmiCategory() {
  return useQuery({
    queryKey: queryKeys.bmiCategories,
    queryFn: getBmiCategory,
    staleTime: 30_000,
  });
}
