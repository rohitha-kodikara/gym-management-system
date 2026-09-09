import { useQuery } from "@tanstack/react-query";
import { getLocations, getLocationSection } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useLocationsPage() {
  const locationsQuery = useQuery({
    queryKey: queryKeys.locations,
    queryFn: getLocations,
  });

  const sectionQuery = useQuery({
    queryKey: queryKeys.locationSection,
    queryFn: getLocationSection,
  });

  const isLoading = locationsQuery.isLoading || sectionQuery.isLoading;
  const hasError =
    (locationsQuery.error && !locationsQuery.data) ||
    (sectionQuery.error && !sectionQuery.data);

  const onRetry = () => {
    if (locationsQuery.error && !locationsQuery.data) locationsQuery.refetch();
    if (sectionQuery.error && !sectionQuery.data) sectionQuery.refetch();
  };

  return {
    locations: locationsQuery.data ?? [],
    section: sectionQuery.data ?? {},
    isLoading,
    error: hasError,
    onRetry,
  };
}
