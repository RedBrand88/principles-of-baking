import { Ingredient, YeastType } from "../types/models";

export type { YeastType };

const isFlour = (name: string): boolean => name.toLowerCase().includes("flour");
const isWater = (name: string): boolean => name.toLowerCase().includes("water");
const isYeast = (name: string): boolean => name.toLowerCase().includes("yeast");
const isStarter = (name: string): boolean => {
  const lower = name.toLowerCase();
  return lower.includes("starter") || lower.includes("levain") || lower.includes("sourdough");
};

const useConvertYeast = () => {
  const convertYeast = (ingredients: Ingredient[], from: YeastType): Ingredient[] => {
    if (from === "dry") {
      const hasYeast = ingredients.some(i => isYeast(i.ingredientName));
      if (!hasYeast) return ingredients;

      const totalFlourGrams = ingredients
        .filter(i => isFlour(i.ingredientName))
        .reduce((sum, i) => sum + i.Grams, 0);

      if (totalFlourGrams === 0) return ingredients;

      const starterGrams = Math.round(totalFlourGrams * 0.2);
      const half = starterGrams / 2;

      return [
        ...ingredients
          .filter(i => !isYeast(i.ingredientName))
          .map(i => {
            if (isFlour(i.ingredientName)) {
              const ratio = i.Grams / totalFlourGrams;
              const subtract = half * ratio;
              return { ...i, Grams: Math.round(i.Grams - subtract), quantity: Math.round(i.quantity - subtract) };
            }
            if (isWater(i.ingredientName)) {
              // water density ≈ 1 g/ml in bread recipes; Grams and quantity track the same value
              return { ...i, Grams: Math.max(0, Math.round(i.Grams - half)), quantity: Math.max(0, Math.round(i.quantity - half)) };
            }
            return i;
          }),
        {
          id: crypto.randomUUID(),
          ingredientName: "sourdough starter",
          quantity: starterGrams,
          unit: "g",
          Grams: starterGrams,
          phase: "dough" as const,
          bakerPercentage: 0,
          densityGPerMl: 0,
        },
      ];
    } else {
      const starterIngredient = ingredients.find(i => isStarter(i.ingredientName));
      if (!starterIngredient) return ingredients;

      const starterGrams = starterIngredient.Grams;
      const half = starterGrams / 2;

      const restoredIngredients = ingredients
        .filter(i => !isStarter(i.ingredientName))
        .map(i => {
          if (isFlour(i.ingredientName)) {
            return { ...i, Grams: Math.round(i.Grams + half), quantity: Math.round(i.quantity + half) };
          }
          if (isWater(i.ingredientName)) {
            // water density ≈ 1 g/ml in bread recipes; Grams and quantity track the same value
            return { ...i, Grams: Math.round(i.Grams + half), quantity: Math.round(i.quantity + half) };
          }
          return i;
        });

      const restoredFlourGrams = restoredIngredients
        .filter(i => isFlour(i.ingredientName))
        .reduce((sum, i) => sum + i.Grams, 0);

      const yeastGrams = Math.round(restoredFlourGrams * 0.01);

      return [
        ...restoredIngredients,
        {
          id: crypto.randomUUID(),
          ingredientName: "active dry yeast",
          quantity: yeastGrams,
          unit: "g",
          Grams: yeastGrams,
          phase: "dough" as const,
          bakerPercentage: 0,
          densityGPerMl: 0,
        },
      ];
    }
  };

  return { convertYeast };
};

export default useConvertYeast;
