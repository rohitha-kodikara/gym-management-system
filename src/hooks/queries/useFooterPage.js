import { useQuery } from "@tanstack/react-query";
import { getFooter, getLocations } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useFooterPage() {
  const footerQuery = useQuery({
    queryKey: queryKeys.footer,
    queryFn: getFooter,
    staleTime: 30_000,
  });

  const locationsQuery = useQuery({
    queryKey: queryKeys.locations,
    queryFn: getLocations,
    staleTime: 30_000,
  });

  const isLoading = footerQuery.isLoading || locationsQuery.isLoading;
  const hasError =
    (footerQuery.error && !footerQuery.data) ||
    (locationsQuery.error && !locationsQuery.data);

  const onRetry = () => {
    if (footerQuery.error && !footerQuery.data) footerQuery.refetch();
    if (locationsQuery.error && !locationsQuery.data) locationsQuery.refetch();
  };

  return {
    footer: footerQuery.data ?? {},
    locations: locationsQuery.data ?? [],
    isLoading,
    error: hasError,
    onRetry,
  };
}
