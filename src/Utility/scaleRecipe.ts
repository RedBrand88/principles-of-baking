import type { Ingredient } from "../types/models";

/**
 * ScaledIngredient is the output type: each ingredient's name and its computed gram amount.
 */
export interface ScaledIngredient {
  ingredientName: string;
  grams: number;
}

/**
 * scaleRecipe takes your ingredients (with bakerPercentage and phase), a target total dough weight,
 * and returns an array of ScaledIngredient with rounded gram values. If there's a scalded flour phase,
 * it also computes the boiling liquid needed for scald at the specified scaldRatio (default 1.4).
 */
export function scaleRecipe(
  ingredients: Ingredient[],
  totalDough: number,
  scaldRatio = 1.4
): ScaledIngredient[] {
  // Sum all non-scald, non-liquid-of-scald percentages for dough base
  const totalBasePct = ingredients
    .filter((i) => i.phase !== "scald")
    .reduce((sum, i) => sum + i.bakerPercentage, 0);

  // One percent of dough mass
  const onePctMass = totalDough / totalBasePct;


  // 4) Scale non‑scald ingredients (including dough‑phase flour & liquid)
  const scaled: ScaledIngredient[] = ingredients
    .filter(i => i.phase !== "scald")
    .map(i => ({
      ingredientName: i.ingredientName,
      grams: Math.round(i.bakerPercentage * onePctMass),
    }));

  // 5) Find and scale the scald‑flour
  const scaldFlourPct = ingredients
    .find(i => i.phase === "scald" && /flour/i.test(i.ingredientName))
    ?.bakerPercentage || 0;

  let scaldFlourGrams = 0;
  if (scaldFlourPct > 0) {
    scaldFlourGrams = Math.round(scaldFlourPct * onePctMass);
    scaled.push({ ingredientName: "Scalded Flour", grams: scaldFlourGrams });
  }

  // 6) Compute and append scald liquid
  if (scaldFlourGrams > 0) {
    const scaldLiquidGrams = Math.round(scaldFlourGrams * scaldRatio);
    scaled.push({ ingredientName: "Scald Liquid", grams: scaldLiquidGrams });

    // 7) Subtract scalded flour from the dough‑flour line
    const flourLine = scaled.find(si =>
      /flour/i.test(si.ingredientName) &&
      !/scald/i.test(si.ingredientName)
    );
    if (flourLine) {
      flourLine.grams = Math.max(0, flourLine.grams - scaldFlourGrams);
    }

    // 8) Subtract scald liquid from the dough‑liquid (water/milk) line
    const liquidLine = scaled.find(si =>
      /water|milk/i.test(si.ingredientName)
    );
    if (liquidLine) {
      liquidLine.grams = Math.max(0, liquidLine.grams - scaldLiquidGrams);
    }
  }

  return scaled;
}
