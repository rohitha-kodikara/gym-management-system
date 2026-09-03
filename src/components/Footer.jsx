import { MapPin, Phone, Mail, Clock, Share2, Globe, RotateCcw } from "lucide-react";
import { scrollToSection } from "../utils/scroll";
import { useQuery } from "@tanstack/react-query";
import { getFooter, getLocations } from "@/lib/strapi";
import { clean, decodeEntities } from "@/lib/text";
import { UI_TEXT } from "@/lib/uiText";

/* ─── constants ──────────────────────────────────────────────────── */
const errorCopy = UI_TEXT.sectionLoadError;

const socialIconMap = {
  instagram: Share2,
  facebook: Globe,
};

const FALLBACKS = {
  badge: "SK",
  logoPrimary: "Power",
  logoHighlight: "Fitness",
  tagLine:
    "Sri Lanka's premium fitness destination. Building stronger bodies and stronger minds since 2013.",
  quickHeading: "Quick Links",
  contactHeading: "Contact Us",
  locationHeading: "Our Locations",
  phoneText: "+94 11 234 5678",
  emailText: "hello@kjpowerfitness.lk",
  copyright: "© 2026 KJ Power Fitness Center. All rights reserved.",
  privacyLabel: "Privacy Policy",
  termsLabelText: "Terms of Service",
};

/* ─── sub-components ─────────────────────────────────────────────── */
function FooterSkeleton() {
  return (
    <footer
      id="contact"
      className="w-full border-t border-[#262626] bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo + tagline column */}
          <div className="space-y-4">
            <div className="flex h-9 w-32 animate-pulse rounded-lg bg-[#262626]" />
            <div className="h-4 w-full animate-pulse rounded bg-[#262626]" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-[#262626]" />
            <div className="mt-6 flex gap-4">
              <div className="h-5 w-20 animate-pulse rounded bg-[#262626]" />
              <div className="h-5 w-20 animate-pulse rounded bg-[#262626]" />
            </div>
          </div>

          {/* Quick links column */}
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-[#262626]" />
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 w-28 animate-pulse rounded bg-[#262626]"
              />
            ))}
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-[#262626]" />
            <div className="h-4 w-36 animate-pulse rounded bg-[#262626]" />
            <div className="h-4 w-40 animate-pulse rounded bg-[#262626]" />
            <div className="h-4 w-44 animate-pulse rounded bg-[#262626]" />
          </div>

          {/* Locations column */}
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-[#262626]" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1">
                <div className="h-4 w-24 animate-pulse rounded bg-[#262626]" />
                <div className="h-4 w-40 animate-pulse rounded bg-[#262626]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterError({ isFooterError, isLocationsError, onRetry }) {
  const message =
    (isFooterError && isLocationsError)
      ? "We couldn't load the footer content right now."
      : isFooterError
        ? "We couldn't load the footer right now."
        : "We couldn't load the locations right now.";

  return (
    <footer
      id="contact"
      className="w-full border-t border-[#262626] bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-[#262626] bg-[#141414] p-12 text-center">
          <p className="text-sm text-[#a3a3a3]">{message}</p>
          <button
            onClick={onRetry}
            className="flex items-center gap-2 text-sm text-[#dc2626] transition-colors hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            {errorCopy.retryButton}
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ─── data hook ─────────────────────────────────────────────────── */
function useFooterData(footerData, locationData) {
  const cleanField = (text, fallback) =>
    decodeEntities(clean(text, fallback));

  const fields = {
    badge: cleanField(footerData?.logoBadgeText, FALLBACKS.badge),
    logoPrimary: cleanField(footerData?.logoTextPrimary, FALLBACKS.logoPrimary),
    logoHighlight: cleanField(
      footerData?.logoTextHighlight,
      FALLBACKS.logoHighlight
    ),
    tagLine: cleanField(footerData?.tagline, FALLBACKS.tagLine),
    quickHeading: cleanField(
      footerData?.QuickLinksHeading,
      FALLBACKS.quickHeading
    ),
    contactHeading: cleanField(
      footerData?.ContactUsHeading,
      FALLBACKS.contactHeading
    ),
    locationHeading: cleanField(
      footerData?.LocationHeading,
      FALLBACKS.locationHeading
    ),
    phoneText: cleanField(footerData?.phone, FALLBACKS.phoneText),
    emailText: cleanField(footerData?.email, FALLBACKS.emailText),
    copyright: cleanField(footerData?.copyrightText, FALLBACKS.copyright),
    privacyLabel: cleanField(
      footerData?.privacyPolicyLabel,
      FALLBACKS.privacyLabel
    ),
    termsLabelText: cleanField(footerData?.termsLabel, FALLBACKS.termsLabelText),
  };

  const hoursLines = footerData?.WeakDaysAndTime
    ? footerData.WeakDaysAndTime.split("\n").filter(Boolean)
    : [];

  const locations = (locationData ?? []).map((loc) => ({
    city: loc.city,
    address: loc.address,
  }));

  return { fields, hoursLines, locations };
}

/* ─── main component ─────────────────────────────────────────────── */
export function Footer() {
  const {
    data: footerData,
    isLoading,
    error,
    refetch: refetchFooter,
  } = useQuery({
    queryKey: ["footer"],
    queryFn: getFooter,
    staleTime: 30_000,
  });

  const {
    data: locationData,
    isLoading: locationLoading,
    error: locationError,
    refetch: refetchLocations,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
    staleTime: 30_000,
  });

  const { fields, hoursLines, locations } = useFooterData(
    footerData,
    locationData
  );

  if (isLoading || locationLoading) {
    return <FooterSkeleton />;
  }

  const isFooterError = error && !footerData;
  const isLocationsError = locationError && !locationData;

  if (isFooterError || isLocationsError) {
    return (
      <FooterError
        isFooterError={isFooterError}
        isLocationsError={isLocationsError}
        onRetry={() => {
          if (isFooterError) refetchFooter();
          if (isLocationsError) refetchLocations();
        }}
      />
    );
  }

  return (
    <footer
      id="contact"
      className="w-full border-t border-[#262626] bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo + tagline + social */}
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="flex items-center gap-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dc2626] font-black text-white">
                {fields.badge}
              </span>
              <span className="text-lg font-bold text-white">
                {fields.logoPrimary}{" "}
                <span className="text-[#dc2626]">{fields.logoHighlight}</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-[#a3a3a3]">
              {fields.tagLine}
            </p>
            <div className="mt-6 flex items-center gap-4">
              {(footerData?.SocialLinks ?? []).map((link) => {
                const Icon = socialIconMap[link.icon?.toLowerCase()];
                if (!Icon) return null;
                return (
                  <a
                    key={link.id}
                    href={link.url?.trim() ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#a3a3a3] transition-colors hover:text-[#dc2626]"
                    aria-label={link.platform}
                  >
                    <Icon className="h-5 w-5" />
                    {link.platform}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {fields.quickHeading}
            </h4>
            <ul className="mt-4 space-y-3">
              {(footerData?.QuickLinks ?? []).map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-[#a3a3a3] transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {fields.contactHeading}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-[#a3a3a3]">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-[#dc2626]" />
                {fields.phoneText}
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-[#dc2626]" />
                {fields.emailText}
              </li>
              {hoursLines.map((line, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-[#dc2626]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {fields.locationHeading}
            </h4>
            <ul className="mt-4 space-y-3">
              {locations.map((loc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" />
                  <span className="text-[#a3a3a3]">
                    <strong className="text-white">{loc.city}:</strong>{" "}
                    {loc.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#262626] pt-8 md:flex-row">
          <p className="text-xs text-[#737373]">{fields.copyright}</p>
          <div className="flex gap-6 text-xs text-[#737373]">
            {/* href="#" is a placeholder — backend should provide URL fields for these */}
            <a href="#" className="hover:text-white">
              {fields.privacyLabel}
            </a>
            <a href="#" className="hover:text-white">
              {fields.termsLabelText}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
