export interface Ingredient {
  id: string;
  ingredientName: string;
  bakerPercentage: number;
  quantity: number;
  unit: string;
  Grams: number;
  phase: "dough" | "scald" | "soak" | "autolyse";
  densityGPerMl: number;
}

export interface Meta {
  yieldGrams: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export type YeastType = "dry" | "sourdough";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  meta: Meta;
  userId: string;
  yeastType?: YeastType;
}
