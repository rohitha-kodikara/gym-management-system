import { forwardRef } from "react";

const variants = {
  default: "bg-[#1a1a1a] text-[#f5f5f5] border-[#262626]",
  primary: "bg-[#dc2626]/15 text-[#fca5a5] border-[#dc2626]/30",
  lime: "bg-[#84cc16]/15 text-[#d9f99d] border-[#84cc16]/30",
  outline: "bg-transparent text-[#a3a3a3] border-[#404040]",
};

const Badge = forwardRef(({ className = "", variant = "default", children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={`inline-flex items-center rounded-full border px-3.5 py-1 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export { Badge };
