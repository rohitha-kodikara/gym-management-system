import { useQuery } from "@tanstack/react-query";
import { getTrainingProgramSection } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useTrainingProgramSection() {
  return useQuery({
    queryKey: queryKeys.trainingProgramSection,
    queryFn: getTrainingProgramSection,
  });
}
