import { Recipe } from "../../types/models";
import { isStarter } from "../../Utility/ingredientMatchers";
import "./recipeCard.css";

type RecipeCardProps = {
  recipe: Recipe;
  isActive: boolean;
  onClick: () => void;
};

const RecipeCard = ({ recipe, isActive, onClick }: RecipeCardProps) => {
  const yeastLabel = recipe.ingredients.some(i => isStarter(i.ingredientName))
    ? "sourdough"
    : "dry yeast";

  const yieldDisplay = recipe.meta.yieldGrams
    ? `${Math.round(recipe.meta.yieldGrams)}g`
    : null;

  return (
    <button
      type="button"
      className={`recipeCard${isActive ? " active" : ""}`}
      onClick={onClick}
    >
      <div className="cardTitle">{recipe.title}</div>
      {recipe.description && (
        <div className="cardDesc">{recipe.description}</div>
      )}
      <div className="cardMeta">
        {yieldDisplay && <span className="yieldLabel">{yieldDisplay}</span>}
        <span className="yeastBadge">{yeastLabel}</span>
      </div>
    </button>
  );
};

export default RecipeCard;
