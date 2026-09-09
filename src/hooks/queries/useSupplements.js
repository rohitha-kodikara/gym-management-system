import { useQuery } from "@tanstack/react-query";
import { getSupplements } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useSupplements() {
  return useQuery({
    queryKey: queryKeys.supplements,
    queryFn: getSupplements,
    staleTime: 30_000,
  });
}
