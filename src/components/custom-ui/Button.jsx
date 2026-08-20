import { forwardRef } from "react";
import { motion } from "framer-motion";

const baseStyles =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-[#dc2626] text-white hover:bg-[#b91c1c] focus-visible:ring-[#dc2626] shadow-lg shadow-red-900/20",
  secondary:
    "bg-[#1a1a1a] text-white border border-[#262626] hover:border-[#dc2626] hover:text-[#fca5a5] focus-visible:ring-[#dc2626]",
  outline:
    "bg-transparent text-white border border-[#404040] hover:border-white hover:bg-white/5 focus-visible:ring-white",
  ghost:
    "bg-transparent text-[#a3a3a3] hover:text-white hover:bg-white/5 focus-visible:ring-white",
  lime: "bg-[#84cc16] text-[#0a0a0a] hover:bg-[#65a30d] focus-visible:ring-[#84cc16] shadow-lg shadow-lime-900/20",
};

const sizes = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-5",
  lg: "h-12 px-7 text-base",
};

const Button = forwardRef(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      as = "button",
      animate = false,
      children,
      ...props
    },
    ref
  ) => {
    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
    const Component = as;

    if (animate) {
      return (
        <motion.button
          ref={ref}
          className={classes}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          {...props}
        >
          {children}
        </motion.button>
      );
    }

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { Button };
