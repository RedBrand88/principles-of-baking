export const UNITS = ["g", "oz", "ml", "cups", "Tbls", "tsp"];
export type Unit = typeof UNITS[number];

export type IngredientDraft = {
  ingredientName: string;
  quantity: number;
  unit: Unit;
};
export type RecipeRequest = {
  title: string;
  description: string;
  doughIngredients: IngredientDraft[];
  otherIngredients?: IngredientDraft[];
  instructions: string[];
  yeastType: "dry" | "sourdough";
};
