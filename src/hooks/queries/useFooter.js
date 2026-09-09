import { useQuery } from "@tanstack/react-query";
import { getFooter } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useFooter() {
  return useQuery({
    queryKey: queryKeys.footer,
    queryFn: getFooter,
    staleTime: 30_000,
  });
}
