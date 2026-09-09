import { SectionReveal, StaggerContainer, StaggerItem } from "../SectionReveal";
import { useQuery } from "@tanstack/react-query";
import { getPackages, getPackageSection } from "../../lib/strapi";
import { Badge } from "../ui/Badge";
import { PackageCard } from "./PackageCard";

export function Packages() {
  const {
    data: packagesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
  });

  const {
    data: packageSection,
    isLoading: packageSectionLoading,
    error: packageSectionError,
  } = useQuery({
    queryKey: ["package-sections"],
    queryFn: getPackageSection,
  });

  if (isLoading || packageSectionLoading) return null;
  if (error || packageSectionError) return null;

  const { Currency, badgeText, description, headingHighlight, headingLine1 } = packageSection;

  return (
    <section
      id="packages"
      className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">{badgeText}</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-2xl text-center lg:py-17 lg:pb-0">
          <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
            {headingLine1} <span className="text-[#dc2626]">{headingHighlight}</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3]">{description}</p>
        </SectionReveal>

        <StaggerContainer
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
          delay={0.1}
        >
          {packagesData?.map((pkg) => (
            <StaggerItem key={pkg.type}>
              <PackageCard {...pkg} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
