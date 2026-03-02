import { Recipe } from "../../types/models";
import "./recipeCard.css";

type RecipeCardProps = {
  recipe: Recipe;
  isActive: boolean;
  onClick: () => void;
};

const RecipeCard = ({recipe, onClick}: RecipeCardProps) => {
  return (
    <div className="recipeCard" onClick={onClick}>
      <span>{recipe.title}</span>
    </div>
  );
};

export default RecipeCard;
