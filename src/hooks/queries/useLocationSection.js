import { useQuery } from "@tanstack/react-query";
import { getLocationSection } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useLocationSection() {
  return useQuery({
    queryKey: queryKeys.locationSection,
    queryFn: getLocationSection,
  });
}
