import { useState } from "react";
import useCreateRecipe from "../../Hooks/UseCreateRecipe";
import { Recipe } from "../../types/models";
import "./recipePreviewModal.css";
import Button from "../Button/button";

type RecipePreviewModalProps = {
  recipe: Recipe | null;
  onClose: () => void;
};
const RecipePreviewModal = ({ recipe, onClose }: RecipePreviewModalProps) => {
  if (!recipe) return null;

  const { createRecipe, loading, error } = useCreateRecipe();
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    const result = await createRecipe(recipe);

    if (result.ok) {
      setSaved(true);
      onClose();
    }
  };

  return (
    <div className="modalOverlay">
      <div className="parseModalContent">
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map(ing => (
            <li key={ing.ingredientName}>
              {`${ing.quantity}${ing.unit} ${ing.ingredientName}`}
            </li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map(inst => (
            <li key={inst}>
              {inst}
            </li>
          ))}
        </ol>
        <div className="modalActions">
          {error && <p className="errorText">{error}</p>}
          {saved && <p className="successText">Recipe saved!</p>}

          <Button
            onClick={handleSave}
            disabled={loading || saved}
          >
            {loading ? "Saving..." : saved ? "Saved" : "Save Recipe"}
          </Button>
          <Button
            onClick={onClose}
            type="secondary"
            disabled={loading}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipePreviewModal;
