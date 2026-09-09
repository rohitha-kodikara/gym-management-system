import { useQuery } from "@tanstack/react-query";
import { getNavbar } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useNavbar() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.navbar,
    queryFn: getNavbar,
    staleTime: Infinity,
  });

  return {
    data: data ?? {},
    isLoading,
    error,
  };
}
