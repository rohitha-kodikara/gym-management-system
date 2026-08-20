import { forwardRef } from "react";

const Input = forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={`flex h-11 w-full rounded-md border border-[#262626] bg-[#0a0a0a] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#737373] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
