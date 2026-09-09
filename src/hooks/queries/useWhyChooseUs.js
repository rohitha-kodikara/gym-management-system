import { useQuery } from "@tanstack/react-query";
import { getWhyChooseUs } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useWhyChooseUs() {
  return useQuery({
    queryKey: queryKeys.whyChooseUs,
    queryFn: getWhyChooseUs,
  });
}
