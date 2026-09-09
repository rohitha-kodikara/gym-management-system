import { useQuery } from "@tanstack/react-query";
import { getPackageSection } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function usePackageSection() {
  return useQuery({
    queryKey: queryKeys.packageSection,
    queryFn: getPackageSection,
  });
}
