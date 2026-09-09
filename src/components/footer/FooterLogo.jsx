import { scrollToSection } from "../../utils/scroll";
import { Share2, Globe } from "lucide-react";

const socialIconMap = {
  instagram: Share2,
  facebook: Globe,
};

export function FooterLogo({ fields, socialLinks }) {
  return (
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
        {(socialLinks ?? []).map((link) => {
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
  );
}
