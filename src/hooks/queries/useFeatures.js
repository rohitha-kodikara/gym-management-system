import { useQuery } from "@tanstack/react-query";
import { getFeature } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useFeatures() {
  return useQuery({
    queryKey: queryKeys.features,
    queryFn: getFeature,
  });
}
