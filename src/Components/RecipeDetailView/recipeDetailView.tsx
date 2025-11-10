import { Recipe } from "../../types/models";
import "./recipeDetailView.css";

type RecipeDetailViewProps = {
  recipe: Recipe | null;
};
const RecipeDetailView = ({ recipe }: RecipeDetailViewProps) => {
  if (!recipe) return null;

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

  return (
    <div className="recipeDetailView">
      <h2>{recipe.title}</h2>
      <h5>{recipe.description}</h5>
      <div className="body">
        <ul className="ingredients">
          {recipe.ingredients.map(ing => (
            <li key={ing.ingredientName}>
              {`${ing.quantity} ${abbreviateUnit(ing.unit)}: ${ing.ingredientName}`}
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
