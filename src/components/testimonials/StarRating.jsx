import { Star } from "lucide-react";

export function StarRating({ rating = 0 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-[#f97316] text-[#f97316]"
              : "text-[#404040]"
          }`}
        />
      ))}
    </div>
  );
}
