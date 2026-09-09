import { useQuery } from "@tanstack/react-query";
import { getBmiSection, getBmiCategory, getSupplements } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useBmiPage() {
  const sectionQuery = useQuery({
    queryKey: queryKeys.bmiSection,
    queryFn: getBmiSection,
    staleTime: 30_000,
  });

  const categoryQuery = useQuery({
    queryKey: queryKeys.bmiCategories,
    queryFn: getBmiCategory,
    staleTime: 30_000,
  });

  const supplementQuery = useQuery({
    queryKey: queryKeys.supplements,
    queryFn: getSupplements,
    staleTime: 30_000,
  });

  const isLoading =
    sectionQuery.isLoading || categoryQuery.isLoading || supplementQuery.isLoading;

  const hasError =
    (sectionQuery.error && !sectionQuery.data) ||
    (categoryQuery.error && !categoryQuery.data) ||
    (supplementQuery.error && !supplementQuery.data);

  const onRetry = () => {
    if (sectionQuery.error && !sectionQuery.data) sectionQuery.refetch();
    if (categoryQuery.error && !categoryQuery.data) categoryQuery.refetch();
    if (supplementQuery.error && !supplementQuery.data) supplementQuery.refetch();
  };

  return {
    section: sectionQuery.data ?? {},
    categories: categoryQuery.data ?? [],
    supplements: supplementQuery.data ?? [],
    isLoading,
    error: hasError,
    onRetry,
  };
}
