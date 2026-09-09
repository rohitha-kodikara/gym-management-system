import { useQuery } from "@tanstack/react-query";
import { getPackages, getPackageSection } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function usePackagesPage() {
  const packagesQuery = useQuery({
    queryKey: queryKeys.packages,
    queryFn: getPackages,
  });

  const sectionQuery = useQuery({
    queryKey: queryKeys.packageSection,
    queryFn: getPackageSection,
  });

  const isLoading = packagesQuery.isLoading || sectionQuery.isLoading;
  const hasError = packagesQuery.error || sectionQuery.error;

  return {
    packages: packagesQuery.data ?? [],
    section: sectionQuery.data ?? {},
    isLoading,
    error: hasError,
  };
}
