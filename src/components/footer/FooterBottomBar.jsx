export function FooterBottomBar({ copyright, privacyLabel, termsLabelText }) {
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#262626] pt-8 md:flex-row">
      <p className="text-xs text-[#737373]">{copyright}</p>
      <div className="flex gap-6 text-xs text-[#737373]">
        <a href="#" className="hover:text-white">
          {privacyLabel}
        </a>
        <a href="#" className="hover:text-white">
          {termsLabelText}
        </a>
      </div>
    </div>
  );
}
