import { useState, useEffect } from "react";
import { Recipe } from "../../types/models";
import UnitToggle from "../UnitToggle/UnitToggle";
import YeastToggle from "../YeastToggle/YeastToggle";
import useConvertYeast, { YeastType } from "../../Hooks/useConvertYeast";
import { isStarter } from "../../Utility/ingredientMatchers";
import "./recipeDetailView.css";
import { CONVERSION_THRESHOLD, CUP_VOLUME, TBLS_VOLUME, TSP_VOLUME } from "../../Utility/constants";
import { tbspToFraction, toFraction } from "../../Utility/helperFunctions";

type RecipeDetailViewProps = {
  recipe: Recipe | null;
};

const RecipeDetailView = ({ recipe }: RecipeDetailViewProps) => {
  const [unit, setUnit] = useState("g")
  const [yeastType, setYeastType] = useState<YeastType>("dry");
  const { convertYeast } = useConvertYeast();

  useEffect(() => {
    if (!recipe) return;
    setYeastType(
      recipe.yeastType ?? (recipe.ingredients.some(i => isStarter(i.ingredientName)) ? "sourdough" : "dry")
    );
  }, [recipe?.id]);

  if (!recipe) return null;

  const toggleUnit = () => {
    setUnit(previous => previous === "g" ? "cups" : "g")
  }

  const toggleYeast = () => {
    setYeastType(previous => previous === "dry" ? "sourdough" : "dry");
  };

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

  const baseYeastType: YeastType = recipe.yeastType ?? (recipe.ingredients.some(i => isStarter(i.ingredientName)) ? "sourdough" : "dry");
  const displayIngredients = yeastType !== baseYeastType
    ? convertYeast(recipe.ingredients, baseYeastType)
    : recipe.ingredients;

  return (
    <div className="recipeDetailView">
      <div className="toggleRow">
        <UnitToggle unit={unit} onChange={toggleUnit} />
        <span className="toggleDivider" />
        <YeastToggle yeastType={yeastType} onChange={toggleYeast} />
      </div>
      <h2>{recipe.title}</h2>
      <h5>{recipe.description}</h5>
      <div className="body">
        <ul className="ingredients">
          {displayIngredients.map(ing => (
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
