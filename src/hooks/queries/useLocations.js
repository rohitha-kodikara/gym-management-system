import { useQuery } from "@tanstack/react-query";
import { getLocations } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useLocations({ staleTime } = {}) {
  return useQuery({
    queryKey: queryKeys.locations,
    queryFn: getLocations,
    ...(staleTime !== undefined && { staleTime }),
  });
}
