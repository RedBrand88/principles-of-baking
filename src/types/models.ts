export interface Ingredient {
  id: string;
  ingredientName: string;
  bakerPercentage: number;
  quantity: number;
  unit: string;
  grams: number;
  phase: string;
  densityGPerMl: number;
}

export interface Meta {
  yieldGrams: number;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  servings?: string;
  prepTime?: string;
  cookTime?: string;
  additionalTime?: string;
}

export type YeastType = "dry" | "sourdough";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  doughIngredients: Ingredient[];
  otherIngredients: Ingredient[];
  instructions: string[];
  meta: Meta;
  userId: string;
  yeastType?: YeastType;
}
