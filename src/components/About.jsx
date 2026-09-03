import { useQuery } from "@tanstack/react-query";
import { SectionReveal, StaggerContainer, StaggerItem } from "./SectionReveal";
import { Badge } from "./ui/Badge";
import { getAbout } from "@/lib/strapi";
import { clean } from "@/lib/text";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

const resolveImageUrl = (url) => {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  return `${STRAPI_URL}${url}`;
};

export function About() {
  const {
    data: aboutData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["about-section"],
    queryFn: getAbout,
    staleTime: 30_000,
  });

  if (isLoading) return null; // or skeleton
  if (error) return null;

  const {
    badgeText = "Our Story",
    heading = "We Believe Strength Is Built,",
    headingHighlight = "Not Born.",
    introText = "",
    paragraph1 = "",
    paragraph2 = "",
    imageAltText = "Modern gym with members training",
    image,
    stats,
  } = aboutData ?? {};

  const badge = clean(badgeText, "Our Story");
  const title = clean(heading, "We Believe Strength Is Built,");
  const highlight = clean(headingHighlight, "Not Born.");
  const intro = clean(introText, "");
  const para1 = clean(paragraph1, "");
  const para2 = clean(paragraph2, "");
  const alt = clean(imageAltText, "Modern gym with members training");
  const imgSrc =
    resolveImageUrl(image?.url) ??
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop";

  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">{badge}</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <div className="grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:items-center sm:gap-12 lg:gap-16 lg:py-8 lg:pb-0 ">
          {/* Heading + mobile intro - appears first on mobile, top-right on sm */}
          <SectionReveal className="sm:col-start-2 sm:row-start-1 -my-4">
            <h2 className="text-center text-3xl  font-black leading-relaxed text-white sm:text-left md:text-4xl lg:text-5xl">
              {title} <span className="text-[#dc2626]">{highlight}</span>
            </h2>
            <p className="mt-6 text-left leading-relaxed text-[#a3a3a3] sm:hidden">
              {intro}
            </p>
          </SectionReveal>

          {/* Image - appears second on mobile, full left column on sm */}
          <SectionReveal
            direction="left"
            className="relative h-full sm:col-start-1 sm:row-start-1 sm:row-span-2"
          >
            <div className="relative w-full overflow-hidden rounded-2xl sm:h-full">
              <img
                src={imgSrc}
                alt={alt}
                className="h-full w-full rounded-2xl object-contain sm:object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
            </div>
          </SectionReveal>

          {/* Text content + stats - appears third on mobile, bottom-right on sm */}
          <div className="sm:col-start-2 sm:row-start-2 sm:h-full">
            <SectionReveal delay={0.1}>
              <p className="leading-relaxed text-[#a3a3a3]">{para1}</p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="mt-4 leading-relaxed text-[#a3a3a3]">{para2}</p>
            </SectionReveal>

            <StaggerContainer
              className="mt-10 grid grid-cols-2 gap-4"
              stagger={0.08}
              delay={0.3}
            >
              {stats?.map((stat) => (
                <StaggerItem key={stat.id}>
                  <div className=" h-full items-center justify-center rounded-xl border border-[#262626] bg-[#141414] p-4 md:p-8 text-center transition-colors hover:border-[#dc2626]/40 w-full min-w-0 overflow-hidden">
                    <p className="text-2xl font-black text-white md:text-3xl leading-none whitespace-nowrap">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-[#a3a3a3] w-full break-words">
                      {stat.label}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
