import { MapPin, Phone, Mail, Clock, Share2, Globe } from "lucide-react";
import { scrollToSection } from "../utils/scroll";
import { locations } from "../data/locations";

const quickLinks = [
  { label: "Home", href: "home" },
  { label: "Our Story", href: "about" },
  { label: "Packages", href: "packages" },
  { label: "Locations", href: "locations" },
  { label: "Testimonials", href: "testimonials" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="w-full border-t border-[#262626] bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
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
                SK
              </span>
              <span className="text-lg font-bold text-white">
                Power <span className="text-[#dc2626]">Fitness</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-[#a3a3a3]">
              Sri Lanka&apos;s premium fitness destination. Building stronger
              bodies and stronger minds since 2013.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#a3a3a3] transition-colors hover:text-[#dc2626]"
                aria-label="Instagram"
              >
                <Share2 className="h-5 w-5" /> Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#a3a3a3] transition-colors hover:text-[#dc2626]"
                aria-label="Facebook"
              >
                <Globe className="h-5 w-5" /> Facebook
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
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

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-[#a3a3a3]">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-[#dc2626]" />
                +94 11 234 5678
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-[#dc2626]" />
                hello@kjpowerfitness.lk
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-[#dc2626]" />
                Mon - Sat: 5AM - 10PM
                <br />
                Sunday: 6AM - 8PM
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Our Locations
            </h4>
            <ul className="mt-4 space-y-3">
              {locations.map((location) => (
                <li
                  key={location.id}
                  className="flex items-start gap-2 text-sm"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" />
                  <span className="text-[#a3a3a3]">
                    <strong className="text-white">{location.city}:</strong>{" "}
                    {location.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#262626] pt-8 md:flex-row">
          <p className="text-xs text-[#737373]">
            © {new Date().getFullYear()} KJ Power Fitness Center. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-[#737373]">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
