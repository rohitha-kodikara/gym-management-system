import { useQuery } from "@tanstack/react-query";
import { getFinalCTA } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useFinalCTA() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.finalCTA,
    queryFn: getFinalCTA,
    staleTime: Infinity,
  });

  return {
    data: data ?? {},
    isLoading,
    error,
    onRetry: () => refetch(),
  };
}
