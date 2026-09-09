import { useQuery } from "@tanstack/react-query";
import { getTrainingProgramSection, getProgram } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useTrainingProgramsPage() {
  const sectionQuery = useQuery({
    queryKey: queryKeys.trainingProgramSection,
    queryFn: getTrainingProgramSection,
  });

  const programsQuery = useQuery({
    queryKey: queryKeys.programs,
    queryFn: getProgram,
  });

  const isLoading = sectionQuery.isLoading || programsQuery.isLoading;
  const hasError = sectionQuery.error || programsQuery.error;

  return {
    section: sectionQuery.data ?? {},
    programs: programsQuery.data ?? [],
    isLoading,
    error: hasError,
  };
}
