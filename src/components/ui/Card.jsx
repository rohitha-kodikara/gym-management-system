import { forwardRef } from "react";

const Card = forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`rounded-xl border border-[#262626] bg-[#141414] text-[#f5f5f5] shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

const CardHeader = forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={`text-xl font-bold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <p ref={ref} className={`text-sm text-[#a3a3a3] ${className}`} {...props}>
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
});

CardContent.displayName = "CardContent";

const CardFooter = forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
