import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={`flex h-11 w-full appearance-none rounded-md border border-[#262626] bg-[#0a0a0a] px-3 py-2 pr-9 text-sm text-[#f5f5f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
    </div>
  );
});

Select.displayName = "Select";

export { Select };
