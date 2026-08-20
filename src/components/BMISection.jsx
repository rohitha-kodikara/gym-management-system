import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Utensils, Info } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { Button } from "./custom-ui/Button";
import { Input } from "./custom-ui/Input";
import { Select } from "./custom-ui/Select";
import { Badge } from "./ui/Badge";
import { supplementRecommendations, bmiCategories } from "../data/supplements";

export function BMISection() {
  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    goal: "general-fitness",
  });
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const calculate = (e) => {
    e.preventDefault();
    const h = parseFloat(form.height) / 100;
    const w = parseFloat(form.weight);
    if (!h || !w) return;

    const bmi = w / (h * h);
    const category = bmiCategories.find((c) => bmi <= c.max);
    const recommendation = supplementRecommendations[form.goal];

    setResult({ bmi: bmi.toFixed(1), category, recommendation });
  };

  return (
    <section className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="rounded-3xl border border-[#84cc16]/20 bg-gradient-to-br from-[#141414] to-[#0f0f0f] p-6 shadow-xl md:p-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge variant="lime" className="mb-3">
                For Registered Members
              </Badge>
              <h2 className="text-2xl font-black text-white md:text-3xl">
                BMI & Supplement Guide
              </h2>
              <p className="mt-2 max-w-lg text-sm text-[#a3a3a3]">
                Enter your details to get a quick BMI reading and personalized
                supplement suggestions based on your fitness goal.
              </p>
            </div>
            <div className="hidden rounded-2xl bg-[#84cc16]/10 p-4 text-[#84cc16] md:block">
              <Activity className="h-10 w-10" />
            </div>
          </div>

          <form
            onSubmit={calculate}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#a3a3a3]">Age</label>
              <Input
                type="number"
                placeholder="25"
                min={10}
                max={100}
                value={form.age}
                onChange={(e) => handleChange("age", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#a3a3a3]">
                Height (cm)
              </label>
              <Input
                type="number"
                placeholder="175"
                value={form.height}
                onChange={(e) => handleChange("height", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#a3a3a3]">
                Weight (kg)
              </label>
              <Input
                type="number"
                placeholder="70"
                value={form.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#a3a3a3]">Gender</label>
              <Select
                value={form.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#a3a3a3]">Goal</label>
              <Select
                value={form.goal}
                onChange={(e) => handleChange("goal", e.target.value)}
              >
                <option value="general-fitness">General Fitness</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="endurance">Endurance</option>
              </Select>
            </div>

            <div className="sm:col-span-2 lg:col-span-5">
              <Button variant="lime" className="w-full sm:w-auto" type="submit">
                <Utensils className="h-4 w-4" />
                Get Recommendations
              </Button>
            </div>
          </form>

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
                      Your BMI Result
                    </p>
                    <p className="mt-2 text-5xl font-black text-white">
                      {result.bmi}
                    </p>
                    <p className={`mt-1 text-lg font-bold ${result.category.color}`}>
                      {result.category.label}
                    </p>
                    <p className="mt-4 flex items-start gap-2 text-xs text-[#737373]">
                      <Info className="mt-0.5 h-4 w-4 shrink-0" />
                      BMI is a general screening tool. For a complete health
                      assessment, book a free consultation with our coaches.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#84cc16]">
                      {result.recommendation.title}
                    </p>
                    <p className="mt-2 text-sm text-[#a3a3a3]">
                      {result.recommendation.description}
                    </p>
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
                    <ul className="mt-4 space-y-1 border-t border-[#262626] pt-4 text-xs text-[#737373]">
                      {result.recommendation.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2">
                          <span className="text-[#84cc16]">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SectionReveal>
      </div>
    </section>
  );
}
