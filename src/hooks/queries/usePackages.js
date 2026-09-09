import { useQuery } from "@tanstack/react-query";
import { getPackages } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function usePackages() {
  return useQuery({
    queryKey: queryKeys.packages,
    queryFn: getPackages,
  });
}
