import { describe, it, expect } from "vitest";
import useConvertYeast from "./useConvertYeast";
import { Ingredient } from "../types/models";

const makeIngredient = (
  partial: Pick<Ingredient, "ingredientName" | "Grams" | "quantity" | "unit"> & Partial<Ingredient>
): Ingredient => ({
  id: "test-id",
  bakerPercentage: 0,
  phase: "dough",
  densityGPerMl: 0,
  ...partial,
});

const dryYeastRecipe: Ingredient[] = [
  makeIngredient({ ingredientName: "bread flour", Grams: 500, quantity: 500, unit: "g" }),
  makeIngredient({ ingredientName: "water", Grams: 325, quantity: 325, unit: "ml" }),
  makeIngredient({ ingredientName: "salt", Grams: 10, quantity: 10, unit: "g" }),
  makeIngredient({ ingredientName: "active dry yeast", Grams: 5, quantity: 5, unit: "g" }),
];

const sourdoughRecipe: Ingredient[] = [
  makeIngredient({ ingredientName: "bread flour", Grams: 450, quantity: 450, unit: "g" }),
  makeIngredient({ ingredientName: "water", Grams: 275, quantity: 275, unit: "ml" }),
  makeIngredient({ ingredientName: "salt", Grams: 10, quantity: 10, unit: "g" }),
  makeIngredient({ ingredientName: "sourdough starter", Grams: 100, quantity: 100, unit: "g" }),
];

describe("useConvertYeast", () => {
  const { convertYeast } = useConvertYeast();

  describe("dry → sourdough", () => {
    it("removes the yeast ingredient", () => {
      const result = convertYeast(dryYeastRecipe, "dry");
      expect(result.find(i => i.ingredientName.toLowerCase().includes("yeast"))).toBeUndefined();
    });

    it("adds sourdough starter at 20% of flour weight", () => {
      const result = convertYeast(dryYeastRecipe, "dry");
      const starter = result.find(i => i.ingredientName === "sourdough starter");
      expect(starter).toBeDefined();
      expect(starter!.Grams).toBe(100);
      expect(starter!.quantity).toBe(100);
    });

    it("reduces flour by half the starter weight", () => {
      const result = convertYeast(dryYeastRecipe, "dry");
      const flour = result.find(i => i.ingredientName === "bread flour");
      expect(flour!.Grams).toBe(450);
      expect(flour!.quantity).toBe(450);
    });

    it("reduces water by half the starter weight", () => {
      const result = convertYeast(dryYeastRecipe, "dry");
      const water = result.find(i => i.ingredientName === "water");
      expect(water!.Grams).toBe(275);
      expect(water!.quantity).toBe(275);
    });

    it("leaves unrelated ingredients unchanged", () => {
      const result = convertYeast(dryYeastRecipe, "dry");
      const salt = result.find(i => i.ingredientName === "salt");
      expect(salt!.Grams).toBe(10);
    });

    it("returns ingredients unchanged when no flour found", () => {
      const noFlour = dryYeastRecipe.filter(i => !i.ingredientName.includes("flour"));
      const result = convertYeast(noFlour, "dry");
      expect(result).toEqual(noFlour);
    });
  });

  describe("sourdough → dry", () => {
    it("removes the starter ingredient", () => {
      const result = convertYeast(sourdoughRecipe, "sourdough");
      expect(result.find(i => i.ingredientName === "sourdough starter")).toBeUndefined();
    });

    it("adds dry yeast at 1% of restored flour weight", () => {
      const result = convertYeast(sourdoughRecipe, "sourdough");
      const yeast = result.find(i => i.ingredientName === "active dry yeast");
      expect(yeast).toBeDefined();
      expect(yeast!.Grams).toBe(5);
      expect(yeast!.quantity).toBe(5);
    });

    it("restores flour by half the starter weight", () => {
      const result = convertYeast(sourdoughRecipe, "sourdough");
      const flour = result.find(i => i.ingredientName === "bread flour");
      expect(flour!.Grams).toBe(500);
      expect(flour!.quantity).toBe(500);
    });

    it("restores water by half the starter weight", () => {
      const result = convertYeast(sourdoughRecipe, "sourdough");
      const water = result.find(i => i.ingredientName === "water");
      expect(water!.Grams).toBe(325);
      expect(water!.quantity).toBe(325);
    });

    it("returns ingredients unchanged when no starter found", () => {
      const noStarter = sourdoughRecipe.filter(i => i.ingredientName !== "sourdough starter");
      const result = convertYeast(noStarter, "sourdough");
      expect(result).toEqual(noStarter);
    });

    it("identifies levain as starter", () => {
      const levainRecipe = sourdoughRecipe.map(i =>
        i.ingredientName === "sourdough starter" ? { ...i, ingredientName: "levain" } : i
      );
      const result = convertYeast(levainRecipe, "sourdough");
      expect(result.find(i => i.ingredientName === "levain")).toBeUndefined();
    });

    it("identifies ingredient named 'sourdough' as starter", () => {
      const altNameRecipe = sourdoughRecipe.map(i =>
        i.ingredientName === "sourdough starter" ? { ...i, ingredientName: "sourdough" } : i
      );
      const result = convertYeast(altNameRecipe, "sourdough");
      expect(result.find(i => i.ingredientName === "sourdough")).toBeUndefined();
    });
  });
});
