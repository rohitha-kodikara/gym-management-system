import { Utensils, RotateCcw } from "lucide-react";
import { Button } from "../custom-ui/Button";
import { Input } from "../custom-ui/Input";
import { Select } from "../custom-ui/Select";
import { clean } from "@/lib/text";

export function BMIForm({
  form,
  onChange,
  onSubmit,
  onReset,
  ageField,
  heightField,
  weightField,
  genderOptions,
  goalOptions,
  defaultGoal,
  memberBadgeText,
  getRecommendationsButtonText,
  resetButtonText,
}) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <form
      onSubmit={onSubmit}
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
        <label className="text-xs font-medium text-[#a3a3a3]">Gender</label>
        <Select
          value={form.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          required
        >
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
        <label className="text-xs font-medium text-[#a3a3a3]">Goal</label>
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
          {clean(getRecommendationsButtonText, "Get Recommendations")}
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          type="button"
          onClick={onReset}
        >
          <RotateCcw className="h-4 w-4" />
          {clean(resetButtonText, "Reset")}
        </Button>
      </div>
    </form>
  );
}
