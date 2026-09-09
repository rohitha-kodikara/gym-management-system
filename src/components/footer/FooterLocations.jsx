import { MapPin } from "lucide-react";

export function FooterLocations({ heading, locations }) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
        {heading}
      </h4>
      <ul className="mt-4 space-y-3">
        {locations.map((loc, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" />
            <span className="text-[#a3a3a3]">
              <strong className="text-white">{loc.city}:</strong> {loc.address}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
