import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Utensils, Info, RotateCcw } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { Button } from "./custom-ui/Button";
import { Input } from "./custom-ui/Input";
import { Select } from "./custom-ui/Select";
import { Badge } from "./ui/Badge";
import { useQuery } from "@tanstack/react-query";
import { getBmiCategory, getBmiSection, getSupplements } from "@/lib/strapi";
import { clean } from "@/lib/text";
import { UI_TEXT } from "@/lib/uiText";

const bmiErrorCopy = UI_TEXT.bmiSection.loadError;

export function BMISection() {
  const {
    data: bmiSectionData,
    isLoading: isBmiSectionLoading,
    error: bmiSectionError,
    refetch: refetchBmiSection,
  } = useQuery({
    queryKey: ["bmi"],
    queryFn: getBmiSection,
    staleTime: 30_000,
  });

  const {
    data: bmiCategoryData,
    isLoading: isBmiCategoryLoading,
    error: bmiCategoryError,
    refetch: refetchBmiCategory,
  } = useQuery({
    queryKey: ["bmi-categories"],
    queryFn: getBmiCategory,
    staleTime: 30_000,
  });

  const {
    data: supplementData,
    isLoading: isSupplementLoading,
    error: supplementError,
    refetch: refetchSupplements,
  } = useQuery({
    queryKey: ["supplements"],
    queryFn: getSupplements,
    staleTime: 30_000,
  });

  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    goal: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (
    isBmiSectionLoading ||
    isBmiCategoryLoading ||
    isSupplementLoading
  ) {
    return (
      <section className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <div className="h-7 w-40 animate-pulse rounded-full bg-[#262626]" />
            <div className="h-px flex-1 bg-[#262626]" />
          </div>

          <div className="mb-8 md:mb-12">
            <div className="mx-auto h-10 w-3/4 animate-pulse rounded-lg bg-[#262626] md:h-12" />
            <div className="mx-auto mt-4 h-10 w-2/3 animate-pulse rounded-lg bg-[#262626] md:h-12" />
          </div>

          <div className="rounded-3xl border border-[#84cc16]/20 bg-gradient-to-br from-[#141414] to-[#0f0f0f] p-6 shadow-xl md:p-10">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="h-7 w-56 animate-pulse rounded-full bg-[#262626]" />
              </div>
              <div className="hidden rounded-2xl bg-[#84cc16]/10 p-4 md:block">
                <div className="h-10 w-10 animate-pulse rounded-md bg-[#84cc16]/20" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-12 animate-pulse rounded bg-[#262626]" />
                  <div className="h-10 w-full animate-pulse rounded-md bg-[#262626]" />
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="h-10 w-48 animate-pulse rounded-md bg-[#84cc16]/20" />
              <div className="h-10 w-24 animate-pulse rounded-md bg-[#262626]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (bmiSectionError || bmiCategoryError || supplementError) {
    return (
      <section className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#262626] bg-[#141414] p-10 text-center md:p-16">
            <p className="text-lg font-semibold text-white">
              {bmiErrorCopy.title}
            </p>
            <p className="mt-2 text-sm text-[#a3a3a3]">
              {bmiErrorCopy.subtitle}
            </p>
            <Button
              variant="lime"
              className="mt-6"
              type="button"
              onClick={() => {
                if (bmiSectionError) refetchBmiSection();
                if (bmiCategoryError) refetchBmiCategory();
                if (supplementError) refetchSupplements();
              }}
            >
              <RotateCcw className="h-4 w-4" />
              {bmiErrorCopy.retryButton}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const {
    Form = [],
    badgeText,
    heading,
    subheading,
    memberBadgeText,
    getRecommendationsButtonText,
    resetButtonText,
    resultLabel,
    bmiInfoNote,
  } = bmiSectionData ?? {};

  const formFields = Form.filter(
    (f) => f.__component === "shared.bmi-form-fields"
  );
  const genderOptions = Form.filter(
    (f) => f.__component === "shared.gender"
  );
  const goalOptions = Form.filter((f) => f.__component === "shared.goal");

  const fieldByName = (name) => formFields.find((f) => f.label === name);

  const ageField = fieldByName("Age");
  const heightField = fieldByName("Height");
  const weightField = fieldByName("Weight");

  const badge = clean(badgeText, "BMI & Supplement Guide");
  const title = clean(heading, "BMI & Supplement Guide");
  const sub = clean(
    subheading,
    "Enter your details to get a quick BMI reading and personalized supplement suggestions based on your fitness goal."
  );
  const memberBadge = clean(memberBadgeText, "For Registered Members");
  const getRecBtn = clean(getRecommendationsButtonText, "Get Recommendations");
  const resetBtn = clean(resetButtonText, "Reset");
  const resultLbl = clean(resultLabel, "Your BMI Result");
  const infoNote = clean(
    bmiInfoNote,
    "BMI is a general screening tool. For a complete health assessment, book a free consultation with our coaches."
  );

  const categories = bmiCategoryData ?? [];
  const supplements = supplementData ?? [];

  const defaultGoal = goalOptions[0]?.value ?? "";

  const calculate = (e) => {
    e.preventDefault();
    const h = parseFloat(form.height) / 100;
    const w = parseFloat(form.weight);
    if (!h || !w) return;

    const bmi = w / (h * h);
    const sortedCategories = [...categories].sort((a, b) => a.number - b.number);
    const category = sortedCategories.find((c) => bmi <= c.number) ?? sortedCategories[sortedCategories.length - 1];
    const recommendation =
      supplements.find((s) => s.goal === form.goal) ?? null;

    setResult({ bmi: bmi.toFixed(1), category, recommendation });
  };

  const reset = () => {
    setForm({
      age: "",
      height: "",
      weight: "",
      gender: "",
      goal: defaultGoal,
    });
    setResult(null);
  };

  return (
    <section className="relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center bg-[#0a0a0a] py-10 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionReveal className="mb-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#262626]" />
            <Badge variant="primary">{badge}</Badge>
            <div className="h-px flex-1 bg-[#262626]" />
          </div>
        </SectionReveal>

        <SectionReveal className="mb-8 md:mb-12">
          <h2 className="text-center text-3xl font-black leading-relaxed text-white md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="shine-text text-xl mx-auto mt-6 max-w-2xl text-center leading-relaxed">
            {sub}
          </p>
        </SectionReveal>

        <SectionReveal className="rounded-3xl border border-[#84cc16]/20 bg-gradient-to-br from-[#141414] to-[#0f0f0f] p-6 shadow-xl md:p-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge variant="lime" className="mb-3">
                {memberBadge}
              </Badge>
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
              <label className="text-xs font-medium text-[#a3a3a3]">
                {clean(ageField?.label, "Age")}
              </label>
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
                {clean(heightField?.label, "Height (cm)")}
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
                {clean(weightField?.label, "Weight (kg)")}
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
              <label className="text-xs font-medium text-[#a3a3a3]">
                Gender
              </label>
              <Select
                value={form.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                required
              >
                {/* Static UI placeholder — not sourced from the API */}
                <option value="" disabled>
                  Select
                </option>
                {genderOptions.map((g) => (
                  <option key={g.id} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#a3a3a3]">
                Goal
              </label>
              <Select
                value={form.goal || defaultGoal}
                onChange={(e) => handleChange("goal", e.target.value)}
              >
                {goalOptions.map((g) => (
                  <option key={g.id} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:col-span-2 lg:col-span-5">
              <Button variant="lime" className="w-full sm:w-auto" type="submit">
                <Utensils className="h-4 w-4" />
                {getRecBtn}
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                type="button"
                onClick={reset}
              >
                <RotateCcw className="h-4 w-4" />
                {resetBtn}
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
        </SectionReveal>
      </div>
    </section>
  );
}
