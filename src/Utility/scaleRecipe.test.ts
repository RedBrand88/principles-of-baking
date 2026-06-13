import { describe, it, expect } from "vitest";
import { buildScaledRecipe } from "./scaleRecipe";
import type { Recipe, Ingredient } from "../types/models";

const makeIngredient = (
  partial: Pick<Ingredient, "ingredientName" | "grams" | "quantity" | "unit"> & Partial<Ingredient>
): Ingredient => ({
  id: "test-id",
  bakerPercentage: 100,
  phase: "dough",
  densityGPerMl: 0,
  ...partial,
});

const baseRecipe: Recipe = {
  id: "r1",
  title: "Simple White Loaf",
  description: "A classic white bread.",
  instructions: ["Mix", "Proof", "Bake"],
  meta: { yieldGrams: 800, createdAt: "", updatedAt: "" },
  userId: "u1",
  yeastType: "dry",
  doughIngredients: [
    makeIngredient({ ingredientName: "bread flour", grams: 500, quantity: 500, unit: "grams", bakerPercentage: 100, densityGPerMl: 0.53 }),
    makeIngredient({ ingredientName: "water", grams: 350, quantity: 350, unit: "ml", bakerPercentage: 70 }),
    makeIngredient({ ingredientName: "salt", grams: 10, quantity: 10, unit: "grams", bakerPercentage: 2 }),
  ],
  otherIngredients: [],
};

const scaledIngredients = [
  { ingredientName: "bread flour", grams: 250 },
  { ingredientName: "water", grams: 175 },
  { ingredientName: "salt", grams: 5 },
];

describe("buildScaledRecipe", () => {
  it("preserves recipe title, description, instructions, and meta", () => {
    const result = buildScaledRecipe(baseRecipe, scaledIngredients);
    expect(result.title).toBe(baseRecipe.title);
    expect(result.description).toBe(baseRecipe.description);
    expect(result.instructions).toBe(baseRecipe.instructions);
    expect(result.meta).toBe(baseRecipe.meta);
  });

  it("overrides grams and quantity with scaled values", () => {
    const result = buildScaledRecipe(baseRecipe, scaledIngredients);
    const flour = result.doughIngredients.find(i => i.ingredientName === "bread flour")!;
    expect(flour.grams).toBe(250);
    expect(flour.quantity).toBe(250);
  });

  it("preserves original densityGPerMl so unit toggle works", () => {
    const result = buildScaledRecipe(baseRecipe, scaledIngredients);
    const flour = result.doughIngredients.find(i => i.ingredientName === "bread flour")!;
    expect(flour.densityGPerMl).toBe(0.53);
  });

  it("preserves original unit", () => {
    const result = buildScaledRecipe(baseRecipe, scaledIngredients);
    const water = result.doughIngredients.find(i => i.ingredientName === "water")!;
    expect(water.unit).toBe("ml");
  });

  it("does not mutate the original recipe", () => {
    buildScaledRecipe(baseRecipe, scaledIngredients);
    expect(baseRecipe.doughIngredients[0].grams).toBe(500);
  });

  it("synthesizes a minimal ingredient for scald additions not in original", () => {
    const scaldedScaled = [
      ...scaledIngredients,
      { ingredientName: "Scalded Flour", grams: 50 },
      { ingredientName: "Scald Liquid", grams: 70 },
    ];
    const result = buildScaledRecipe(baseRecipe, scaldedScaled);
    const scaldFlour = result.doughIngredients.find(i => i.ingredientName === "Scalded Flour")!;
    expect(scaldFlour).toBeDefined();
    expect(scaldFlour.grams).toBe(50);
    expect(scaldFlour.unit).toBe("grams");
    expect(scaldFlour.densityGPerMl).toBe(0);
  });

  it("preserves otherIngredients unchanged", () => {
    const recipeWithOther: Recipe = {
      ...baseRecipe,
      otherIngredients: [
        makeIngredient({ ingredientName: "sesame seeds", grams: 20, quantity: 20, unit: "grams" }),
      ],
    };
    const result = buildScaledRecipe(recipeWithOther, scaledIngredients);
    expect(result.otherIngredients).toBe(recipeWithOther.otherIngredients);
  });
});
