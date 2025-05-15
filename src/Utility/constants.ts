export type IngredientDensityKey =
  | "wheatFlour"
  | "whiteFlour"
  | "activeDryYeast"
  | "water"
  | "wholeMilk"
  | "butter"
  | "sugar"
  | "salt";

export const densityMap: Record<IngredientDensityKey, number> = {
  wheatFlour: 0.593,
  whiteFlour: 0.53,
  activeDryYeast: 0.43,
  water: 1,
  wholeMilk: 1.03,
  butter: 0.911,
  sugar: 0.845,
  salt: 1.217,
};

export const ingredientKeyMap: Record<string, IngredientDensityKey | "scald"> = {
  "flour": "whiteFlour",
  "wheat flour": "wheatFlour",
  "water": "water",
  "milk": "wholeMilk",
  "butter": "butter",
  "scald": "scald",
};


export const CUP_VOLUME = 240;
export const TBLS_VOLUME = 15;
export const TSP_VOLUME = 5;
