import { Recipe } from "../../types/models";
import "./recipeCard.css";

type RecipeCardProps = {
  keyStr: string;
  recipe: Recipe;
  isActive: boolean;
  onClick: () => void;
};

const RecipeCard = ({keyStr, recipe, onClick}: RecipeCardProps) => {
  return (
    <div key={keyStr} className="recipeCard" onClick={onClick}>
      <span>{recipe.title}</span>
    </div>
  );
};

export default RecipeCard;
