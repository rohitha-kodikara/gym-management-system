import { useQuery } from "@tanstack/react-query";
import { getHero } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useHero() {
  return useQuery({
    queryKey: queryKeys.hero,
    queryFn: getHero,
    staleTime: 1000 * 1,
  });
}
