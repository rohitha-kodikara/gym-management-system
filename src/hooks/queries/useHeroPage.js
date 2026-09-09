import { useQuery } from "@tanstack/react-query";
import { getHero, getLocations } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useHeroPage() {
  const heroQuery = useQuery({
    queryKey: queryKeys.hero,
    queryFn: getHero,
    staleTime: 1000 * 1,
  });

  const locationsQuery = useQuery({
    queryKey: queryKeys.locations,
    queryFn: getLocations,
    staleTime: Infinity,
  });

  const isLoading = heroQuery.isLoading || locationsQuery.isLoading;
  const hasError =
    (heroQuery.error && !heroQuery.data) ||
    (locationsQuery.error && !locationsQuery.data);

  const onRetry = () => {
    if (heroQuery.error && !heroQuery.data) heroQuery.refetch();
    if (locationsQuery.error && !locationsQuery.data) locationsQuery.refetch();
  };

  return {
    hero: heroQuery.data ?? {},
    locations: locationsQuery.data ?? [],
    isLoading,
    error: hasError,
    onRetry,
  };
}
