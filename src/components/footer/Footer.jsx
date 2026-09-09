import { useQuery } from "@tanstack/react-query";
import { getFooter, getLocations } from "@/lib/strapi";
import { clean, decodeEntities } from "@/lib/text";
import { FooterSkeleton } from "./FooterSkeleton";
import { FooterError } from "./FooterError";
import { FooterLogo } from "./FooterLogo";
import { FooterQuickLinks } from "./FooterQuickLinks";
import { FooterContact } from "./FooterContact";
import { FooterLocations } from "./FooterLocations";
import { FooterBottomBar } from "./FooterBottomBar";

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
          <FooterLogo fields={fields} socialLinks={footerData?.SocialLinks} />
          <FooterQuickLinks
            heading={fields.quickHeading}
            links={footerData?.QuickLinks}
          />
          <FooterContact
            heading={fields.contactHeading}
            phoneText={fields.phoneText}
            emailText={fields.emailText}
            hoursLines={hoursLines}
          />
          <FooterLocations
            heading={fields.locationHeading}
            locations={locations}
          />
        </div>

        <FooterBottomBar
          copyright={fields.copyright}
          privacyLabel={fields.privacyLabel}
          termsLabelText={fields.termsLabelText}
        />
      </div>
    </footer>
  );
}
