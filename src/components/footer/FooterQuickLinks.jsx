import { scrollToSection } from "../../utils/scroll";

export function FooterQuickLinks({ heading, links }) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
        {heading}
      </h4>
      <ul className="mt-4 space-y-3">
        {(links ?? []).map((link) => (
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
  );
}
