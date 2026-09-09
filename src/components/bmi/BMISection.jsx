import { useState } from "react";
import { Activity } from "lucide-react";
import { SectionReveal } from "../SectionReveal";
import { Badge } from "../ui/Badge";
import { useBmiPage } from "@/hooks/queries";
import { clean } from "@/lib/text";
import { BMILoadingSkeleton } from "./BMILoadingSkeleton";
import { BMIError } from "./BMIError";
import { BMIForm } from "./BMIForm";
import { BMIResult } from "./BMIResult";

export function BMISection() {
  const {
    section,
    categories,
    supplements,
    isLoading,
    error,
    onRetry,
  } = useBmiPage();

  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    goal: "",
  });
  const [result, setResult] = useState(null);

  if (isLoading) return <BMILoadingSkeleton />;
  if (error) return <BMIError onRetry={onRetry} />;

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
  } = section;

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

  const defaultGoal = goalOptions[0]?.value ?? "";

  const calculate = (e) => {
    e.preventDefault();
    const h = parseFloat(form.height) / 100;
    const w = parseFloat(form.weight);
    if (!h || !w) return;

    const bmi = w / (h * h);
    const sortedCategories = [...categories].sort(
      (a, b) => a.number - b.number
    );
    const category =
      sortedCategories.find((c) => bmi <= c.number) ??
      sortedCategories[sortedCategories.length - 1];
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

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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

          <BMIForm
            form={form}
            onChange={handleChange}
            onSubmit={calculate}
            onReset={reset}
            ageField={ageField}
            heightField={heightField}
            weightField={weightField}
            genderOptions={genderOptions}
            goalOptions={goalOptions}
            defaultGoal={defaultGoal}
            memberBadgeText={memberBadge}
            getRecommendationsButtonText={getRecommendationsButtonText}
            resetButtonText={resetButtonText}
          />

          <BMIResult
            result={result}
            resultLabel={resultLabel}
            bmiInfoNote={bmiInfoNote}
          />
        </SectionReveal>
      </div>
    </section>
  );
}
