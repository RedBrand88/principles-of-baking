import { describe, it, expect } from "vitest";
import { buildSearchableStr, parseSearchTerms, matchesSearch } from "./useRecipeFilter";
import { Recipe, Ingredient } from "../types/models";

const makeIngredient = (name: string): Ingredient => ({
  id: "i1",
  ingredientName: name,
  bakerPercentage: 0,
  quantity: 100,
  unit: "g",
  grams: 100,
  phase: "dough",
  densityGPerMl: 0,
});

const makeRecipe = (partial: Partial<Recipe> = {}): Recipe => ({
  id: "r1",
  title: "Basic White Bread",
  description: "A simple white loaf",
  doughIngredients: [makeIngredient("bread flour"), makeIngredient("water")],
  otherIngredients: [],
  instructions: ["Mix ingredients", "Bake at 450F"],
  meta: { yieldGrams: 800, createdAt: "", updatedAt: "" },
  userId: "u1",
  ...partial,
});

describe("buildSearchableStr", () => {
  it("includes title in lowercase", () => {
    const str = buildSearchableStr(makeRecipe({ title: "Sourdough Rye" }));
    expect(str).toContain("sourdough rye");
  });

  it("includes description in lowercase", () => {
    const str = buildSearchableStr(makeRecipe({ description: "Tangy Country Loaf" }));
    expect(str).toContain("tangy country loaf");
  });

  it("includes dough ingredient names in lowercase", () => {
    const str = buildSearchableStr(
      makeRecipe({ doughIngredients: [makeIngredient("Whole Wheat Flour")] })
    );
    expect(str).toContain("whole wheat flour");
  });

  it("includes other ingredient names in lowercase", () => {
    const str = buildSearchableStr(
      makeRecipe({ otherIngredients: [makeIngredient("Sesame Seeds")] })
    );
    expect(str).toContain("sesame seeds");
  });

  it("includes instructions in lowercase", () => {
    const str = buildSearchableStr(
      makeRecipe({ instructions: ["Fold the dough gently"] })
    );
    expect(str).toContain("fold the dough gently");
  });

  it("includes tags in lowercase", () => {
    const str = buildSearchableStr(
      makeRecipe({ meta: { yieldGrams: 800, createdAt: "", updatedAt: "", tags: ["Beginner", "Rustic"] } })
    );
    expect(str).toContain("beginner");
    expect(str).toContain("rustic");
  });

  it("handles recipe with no tags", () => {
    const str = buildSearchableStr(makeRecipe({ meta: { yieldGrams: 800, createdAt: "", updatedAt: "" } }));
    expect(typeof str).toBe("string");
  });

  it("does not include yieldGrams", () => {
    const str = buildSearchableStr(makeRecipe({ meta: { yieldGrams: 99999, createdAt: "", updatedAt: "" } }));
    expect(str).not.toContain("99999");
  });
});

describe("parseSearchTerms", () => {
  it("returns null for empty string", () => {
    expect(parseSearchTerms("")).toBeNull();
  });

  it("returns null for whitespace only", () => {
    expect(parseSearchTerms("   ")).toBeNull();
  });

  it("returns null for single character", () => {
    expect(parseSearchTerms("r")).toBeNull();
  });

  it("returns single-element array for 2-character term", () => {
    expect(parseSearchTerms("ry")).toEqual(["ry"]);
  });

  it("returns single-element array for a full word", () => {
    expect(parseSearchTerms("rye")).toEqual(["rye"]);
  });

  it("splits multi-word input into separate terms", () => {
    expect(parseSearchTerms("sourdough rye")).toEqual(["sourdough", "rye"]);
  });

  it("normalizes extra whitespace between words", () => {
    expect(parseSearchTerms("  sourdough   rye  ")).toEqual(["sourdough", "rye"]);
  });

  it("lowercases terms", () => {
    expect(parseSearchTerms("Sourdough")).toEqual(["sourdough"]);
  });
});

describe("matchesSearch", () => {
  it("returns true when the single term is present", () => {
    expect(matchesSearch("sourdough rye bread", ["rye"])).toBe(true);
  });

  it("returns false when the single term is absent", () => {
    expect(matchesSearch("white sandwich bread", ["rye"])).toBe(false);
  });

  it("returns true when all terms are present (AND logic)", () => {
    expect(matchesSearch("sourdough rye bread with caraway", ["sourdough", "rye"])).toBe(true);
  });

  it("returns false when one term is missing (AND logic)", () => {
    expect(matchesSearch("sourdough white bread", ["sourdough", "rye"])).toBe(false);
  });

  it("matches terms regardless of their order in the string", () => {
    expect(matchesSearch("rye sourdough bread", ["sourdough", "rye"])).toBe(true);
  });
});
