import { Phone, Mail, Clock } from "lucide-react";

export function FooterContact({ heading, phoneText, emailText, hoursLines }) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
        {heading}
      </h4>
      <ul className="mt-4 space-y-3 text-sm text-[#a3a3a3]">
        <li className="flex items-start gap-2">
          <Phone className="mt-0.5 h-4 w-4 text-[#dc2626]" />
          {phoneText}
        </li>
        <li className="flex items-start gap-2">
          <Mail className="mt-0.5 h-4 w-4 text-[#dc2626]" />
          {emailText}
        </li>
        {hoursLines.map((line, i) => (
          <li key={i} className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 text-[#dc2626]" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
