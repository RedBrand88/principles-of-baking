import { useState } from "react";
import { Recipe } from "../../types/models";
import UnitToggle from "../UnitToggle/UnitToggle";
import "./recipeDetailView.css";
import { CONVERSION_THRESHOLD, CUP_VOLUME, TBLS_VOLUME, TSP_VOLUME } from "../../Utility/constants";
import { tbspToFraction, toFraction } from "../../Utility/helperFunctions";

type RecipeDetailViewProps = {
  recipe: Recipe | null;
};

const RecipeDetailView = ({ recipe }: RecipeDetailViewProps) => {
  if (!recipe) return null;
  const [unit, setUnit] = useState("g")

  const toggleUnit = () => {
    setUnit(previous => previous === "g" ? "cups" : "g")
  }

  const abbreviateUnit = (unit: string) => {
    switch (unit.toLowerCase()) {
      case "grams":
        return "g";
      case "count":
        return "";
      default:
        return unit;
    }
  }

  const displayIngredient = (ing: Recipe["ingredients"][number]) => {
    const isGrams = ing.unit.toLowerCase() === "grams" || ing.unit.toLowerCase() === "g";
    if (unit === "cups" && isGrams && ing.densityGPerMl && ing.densityGPerMl > 0) {
      const ml = ing.quantity / ing.densityGPerMl;

      if (ml >= CONVERSION_THRESHOLD) {
        const cups = ml / CUP_VOLUME;
        return `${toFraction(cups)} cups: ${ing.ingredientName}`;
      } else if (ml >= TBLS_VOLUME) {
        const tbsp = ml / TBLS_VOLUME;
        return `${tbspToFraction(tbsp)} tbsp: ${ing.ingredientName}`;
      } else {
        const tsp = ml / TSP_VOLUME;
        return `${tbspToFraction(tsp)} tsp: ${ing.ingredientName}`;
      }
    }
    return `${ing.quantity} ${abbreviateUnit(ing.unit)}: ${ing.ingredientName}`;
  };

  return (
    <div className="recipeDetailView">
      <UnitToggle unit={unit} onChange={toggleUnit} />
      <h2>{recipe.title}</h2>
      <h5>{recipe.description}</h5>
      <div className="body">
        <ul className="ingredients">
          {recipe.ingredients.map(ing => (
            <li key={ing.ingredientName}>
              {displayIngredient(ing)}
            </li>
          ))}
        </ul>
        <ol className="instructions">
          {recipe.instructions.map(inst => (
            <li key={inst}>{inst}</li>
          ))}
        </ol>
      </div>
    </div>
  )
};

export default RecipeDetailView;
