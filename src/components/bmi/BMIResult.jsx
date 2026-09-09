import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { clean } from "@/lib/text";

export function BMIResult({ result, resultLabel, bmiInfoNote }) {
  const resultLbl = clean(resultLabel, "Your BMI Result");
  const infoNote = clean(
    bmiInfoNote,
    "BMI is a general screening tool. For a complete health assessment, book a free consultation with our coaches."
  );

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-8 grid gap-6 rounded-2xl border border-[#262626] bg-[#0a0a0a] p-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-[#a3a3a3]">
                {resultLbl}
              </p>
              <p className="mt-2 text-5xl font-black text-white">
                {result.bmi}
              </p>
              <p
                className={`mt-1 text-lg font-bold ${result.category?.color ?? "text-white"}`}
              >
                {result.category?.label ?? ""}
              </p>
              <p className="mt-4 flex items-start gap-2 text-xs text-[#737373]">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                {infoNote}
              </p>
            </div>

            {result.recommendation && (
              <div>
                <p className="text-sm font-semibold text-[#84cc16]">
                  {result.recommendation.title}
                </p>
                <p className="mt-2 text-sm text-[#a3a3a3]">
                  {result.recommendation.description}
                </p>
                {result.recommendation.products?.length > 0 && (
                  <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {result.recommendation.products.map((product) => (
                      <li
                        key={product}
                        className="flex items-center gap-2 text-sm text-[#d4d4d4]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#84cc16]" />
                        {product}
                      </li>
                    ))}
                  </ul>
                )}
                {result.recommendation.tips?.length > 0 && (
                  <ul className="mt-4 space-y-1 border-t border-[#262626] pt-4 text-xs text-[#737373]">
                    {result.recommendation.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2">
                        <span className="text-[#84cc16]">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
