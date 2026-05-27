import { useState } from "react";
import useCreateRecipe from "../../Hooks/UseCreateRecipe";
import { type RecipeDTO, type IngredientDTO, type Unit } from "../../types/dto";
import "./recipePreviewModal.css";
import Button from "../Button/button";

type RecipePreviewModalProps = {
  recipe: RecipeDTO | null;
  onClose: () => void;
};

const confidenceLabel = (score: number): { label: string; color: string } => {
  if (score >= 0.8) return { label: "High", color: "#4caf50" };
  if (score >= 0.6) return { label: "Good", color: "rgba(202, 150, 92, 1)" };
  return { label: "Low — review carefully", color: "#e07040" };
};

const formatIngredient = (ing: IngredientDTO): string => {
  if (!ing.parseOK) return ing.rawLine;
  const qty = ing.quantity > 0 ? `${ing.quantity}` : "";
  const unit = ing.unit ? ` ${ing.unit}` : "";
  return `${qty}${unit} ${ing.ingredientName}`.trim();
};

const detectYeastType = (ings: IngredientDTO[]): "dry" | "sourdough" =>
  ings.some(i => /sourdough|starter|levain|discard|biga|poolish/i.test(i.ingredientName))
    ? "sourdough"
    : "dry";

const RecipePreviewModal = ({ recipe, onClose }: RecipePreviewModalProps) => {
  if (!recipe) return null;

  const { createRecipe, loading, error } = useCreateRecipe();
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    const todraft = ({ ingredientName, quantity, unit }: IngredientDTO) => ({
      ingredientName,
      quantity,
      unit: unit as Unit,
    });

    const result = await createRecipe({
      title: recipe.title,
      description: recipe.description,
      doughIngredients: recipe.doughIngredients.map(todraft),
      otherIngredients: (recipe.otherIngredients ?? []).map(todraft),
      instructions: recipe.instructions,
      yeastType: detectYeastType(recipe.doughIngredients),
    });

    if (result.ok) {
      setSaved(true);
      onClose();
    }
  };

  const { confidence } = recipe;
  const titleConf = confidenceLabel(confidence.title);
  const ingConf = confidenceLabel(confidence.ingredients);
  const instConf = confidenceLabel(confidence.instructions);

  const allIngredients = [...recipe.doughIngredients, ...(recipe.otherIngredients ?? [])];
  const hasMeta = recipe.servings || recipe.prepTime || recipe.cookTime || recipe.additionalTime;

  return (
    <div className="modalOverlay">
      <div className="parseModalContent">
        <h1>{recipe.title || "Untitled Recipe"}</h1>
        {recipe.description && <p className="recipeDescription">{recipe.description}</p>}

        <div className="confidenceSection">
          <div className="confidenceSectionLabel">Parse confidence</div>
          <div className="confidenceRow">
            <span>Title</span>
            <span className="confidenceBadge" style={{ color: titleConf.color }}>{titleConf.label}</span>
          </div>
          <div className="confidenceRow">
            <span>Ingredients</span>
            <span className="confidenceBadge" style={{ color: ingConf.color }}>{ingConf.label}</span>
          </div>
          <div className="confidenceRow">
            <span>Instructions</span>
            <span className="confidenceBadge" style={{ color: instConf.color }}>{instConf.label}</span>
          </div>
        </div>

        {hasMeta && (
          <div className="parsedMeta">
            {recipe.servings && <span>{recipe.servings} servings</span>}
            {recipe.prepTime && <span>Prep: {recipe.prepTime}</span>}
            {recipe.cookTime && <span>Cook: {recipe.cookTime}</span>}
            {recipe.additionalTime && <span>Additional: {recipe.additionalTime}</span>}
          </div>
        )}

        <h2>Ingredients</h2>
        <ul>
          {allIngredients.map((ing, i) => (
            <li key={i} className={ing.parseOK ? undefined : "parseWarning"}>
              {formatIngredient(ing)}
            </li>
          ))}
        </ul>

        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ol>

        <div className="modalActions">
          {error && <p className="errorText">{error}</p>}
          <Button onClick={handleSave} disabled={loading || saved}>
            {loading ? "Saving..." : saved ? "Saved" : "Save Recipe"}
          </Button>
          <Button onClick={onClose} type="secondary" disabled={loading}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipePreviewModal;
