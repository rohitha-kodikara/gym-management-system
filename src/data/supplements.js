export const supplementRecommendations = {
  "muscle-gain": {
    title: "Muscle Building Stack",
    description:
      "Higher protein and creatine support help fuel hypertrophy and recovery after heavy sessions.",
    products: [
      "Whey Protein Isolate",
      "Creatine Monohydrate",
      "Mass Gainer",
      "BCAA / EAA Blend",
      "Beta-Alanine",
    ],
    tips: [
      "Aim for 1.6–2.2g protein per kg bodyweight",
      "Take creatine daily, even on rest days",
      "Prioritize sleep for recovery",
    ],
  },
  "weight-loss": {
    title: "Fat Loss Support Stack",
    description:
      "These options support calorie control, energy, and lean tissue retention while you cut.",
    products: [
      "Whey Protein Isolate (low carb)",
      "L-Carnitine",
      "Green Tea Extract",
      "Caffeine / Pre-Workout",
      "Fiber Supplement",
    ],
    tips: [
      "Maintain a moderate calorie deficit",
      "Keep protein high to preserve muscle",
      "Drink plenty of water throughout the day",
    ],
  },
  endurance: {
    title: "Cardio & Endurance Stack",
    description:
      "Support stamina, hydration, and recovery for high-volume cardio and conditioning.",
    products: [
      "Electrolytes",
      "Beta-Alanine",
      "Citrulline Malate",
      "Carbohydrate Drink",
      "Whey Protein",
    ],
    tips: [
      "Fuel longer sessions with carbs",
      "Replace electrolytes lost in sweat",
      "Recover with protein within 2 hours",
    ],
  },
  "general-fitness": {
    title: "General Wellness Stack",
    description:
      "A balanced foundation for overall health, energy, and consistent training.",
    products: [
      "Multivitamin",
      "Omega-3 Fish Oil",
      "Whey or Plant Protein",
      "Vitamin D3",
      "Magnesium",
    ],
    tips: [
      "Focus on whole foods first",
      "Supplement only what your diet lacks",
      "Consistency beats perfection",
    ],
  },
};

export const bmiCategories = [
  { max: 18.5, label: "Underweight", color: "text-blue-400" },
  { max: 24.9, label: "Healthy Weight", color: "text-[#84cc16]" },
  { max: 29.9, label: "Overweight", color: "text-[#f97316]" },
  { max: 999, label: "Obese", color: "text-[#dc2626]" },
];
