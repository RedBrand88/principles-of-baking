export interface Ingredient {
  id: string;
  ingredientName: string;
  bakerPercentage: number;
  quantity: number;
  unit: string;
  phase: "dough" | "scald" | "soak" | "autolyse";
  densityGPerMl: number;
}

export interface Meta {
  yeildGrams: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  Meta: Meta;
  userID: string;
}
