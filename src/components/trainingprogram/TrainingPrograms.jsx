import { SectionReveal, StaggerContainer, StaggerItem } from "../SectionReveal";
import { useTrainingProgramsPage } from "@/hooks/queries";
import { Badge } from "../ui/Badge";
import { ProgramCard } from "./ProgramCard";

export function TrainingPrograms() {
  const { section, programs, isLoading, error } = useTrainingProgramsPage();

  if (isLoading || error) return null;

  const { badgeText, headingLine1, headingHighlight, description, learnMoreButtonText } = section;

  return (
    <section className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-25">
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
            {headingLine1}{" "}
            <span className="text-[#dc2626]">{headingHighlight}</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3]">{description}</p>
        </SectionReveal>

        <StaggerContainer
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
          delay={0.1}
        >
          {programs.map((program) => (
            <StaggerItem key={program.documentId ?? program.id}>
              <ProgramCard program={program} learnMoreText={learnMoreButtonText} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
