import { useQuery } from "@tanstack/react-query";
import { getAbout } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useAbout() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.about,
    queryFn: getAbout,
    staleTime: 30_000,
  });

  return {
    data: data ?? {},
    isLoading,
    error,
  };
}
