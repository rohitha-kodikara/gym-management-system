import { useQuery } from "@tanstack/react-query";
import { getProgram } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function usePrograms() {
  return useQuery({
    queryKey: queryKeys.programs,
    queryFn: getProgram,
  });
}
