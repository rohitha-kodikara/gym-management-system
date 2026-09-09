import { useQuery } from "@tanstack/react-query";
import { getWhyChooseUs, getFeature } from "@/lib/strapi";
import { queryKeys } from "./queryKeys";

export function useWhyChooseUsPage() {
  const whyQuery = useQuery({
    queryKey: queryKeys.whyChooseUs,
    queryFn: getWhyChooseUs,
  });

  const featuresQuery = useQuery({
    queryKey: queryKeys.features,
    queryFn: getFeature,
  });

  const isLoading = whyQuery.isLoading || featuresQuery.isLoading;
  const hasError = whyQuery.error || featuresQuery.error;

  return {
    section: whyQuery.data ?? {},
    features: featuresQuery.data ?? [],
    isLoading,
    error: hasError,
  };
}
