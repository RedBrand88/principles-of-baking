import { useState } from "react";
import useCreateRecipe from "../../Hooks/UseCreateRecipe";
import { parseFraction } from "../../Utility/parseFraction";
import { type RecipeDTO, type IngredientDTO, type Unit } from "../../types/dto";
import "./recipePreviewModal.css";
import Button from "../Button/button";

type RecipePreviewModalProps = {
  recipe: RecipeDTO | null;
  onClose: () => void;
};

type EditIngredient = Omit<IngredientDTO, 'quantity'> & { quantity: string };

const confidenceLabel = (score: number): { label: string; color: string } => {
  if (score >= 0.8) return { label: "High", color: "#4caf50" };
  if (score >= 0.6) return { label: "Good", color: "rgba(202, 150, 92, 1)" };
  return { label: "Low — review carefully", color: "#e07040" };
};

const detectYeastType = (ings: { ingredientName: string }[]): "dry" | "sourdough" =>
  ings.some(i => /sourdough|starter|levain|discard|biga|poolish/i.test(i.ingredientName))
    ? "sourdough"
    : "dry";

const emptyIng = (): EditIngredient => ({
  ingredientName: "", quantity: "", unit: "g", rawLine: "", parseOK: true,
});

const RecipePreviewModal = ({ recipe, onClose }: RecipePreviewModalProps) => {
  if (!recipe) return null;

  const { createRecipe, loading, error } = useCreateRecipe();
  const [saved, setSaved] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [title, setTitle] = useState(recipe.title || "");
  const [doughIngredients, setDoughIngredients] = useState<EditIngredient[]>(() =>
    (recipe.doughIngredients ?? []).map(ing => ({
      ...ing,
      quantity: ing.quantity.toString(),
      ingredientName: ing.ingredientName || ing.rawLine,
    }))
  );
  const [otherIngredients, setOtherIngredients] = useState<EditIngredient[]>(
    (recipe.otherIngredients ?? []).map(ing => ({
      ...ing,
      quantity: ing.quantity.toString(),
    }))
  );
  const [instructions, setInstructions] = useState<string[]>(recipe.instructions);

  const updateIng = (
    list: EditIngredient[],
    set: React.Dispatch<React.SetStateAction<EditIngredient[]>>,
    i: number,
    field: keyof EditIngredient,
    value: string
  ) => set(list.map((ing, idx) => idx === i ? { ...ing, [field]: value } : ing));

  const removeIng = (
    set: React.Dispatch<React.SetStateAction<EditIngredient[]>>,
    i: number
  ) => set(prev => prev.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setFormError(null);
    const allIngs = [...doughIngredients, ...otherIngredients].filter(i => i.ingredientName.trim());
    for (const ing of allIngs) {
      if (parseFraction(ing.quantity) === null) {
        setFormError("One or more quantities couldn't be read. Check ingredient amounts.");
        return;
      }
    }

    const todraft = ({ ingredientName, quantity, unit }: EditIngredient) => ({
      ingredientName,
      quantity: parseFraction(quantity) as number,
      unit: unit as Unit,
    });

    const result = await createRecipe({
      title,
      description: recipe.description,
      doughIngredients: doughIngredients.filter(i => i.ingredientName.trim()).map(todraft),
      otherIngredients: otherIngredients.filter(i => i.ingredientName.trim()).map(todraft),
      instructions: instructions.filter(s => s.trim()),
      yeastType: detectYeastType(doughIngredients),
    });
    if (result.ok) { setSaved(true); onClose(); }
  };

  const { confidence } = recipe;
  const hasMeta = recipe.servings || recipe.prepTime || recipe.cookTime || recipe.additionalTime;

  const IngredientList = ({
    list,
    set,
  }: {
    list: EditIngredient[];
    set: React.Dispatch<React.SetStateAction<EditIngredient[]>>;
  }) => (
    <>
      <ul className="ingredientEditList">
        {list.map((ing, i) => (
          <li key={i} className="ingredientRow">
            <div>
              <span className="fieldLabel">Qty</span>
              <input
                type="text"
                className="editInput ingQtyInput"
                value={ing.quantity}
                onChange={e => updateIng(list, set, i, "quantity", e.target.value)}
                placeholder="e.g. 1/2"
                aria-label="quantity"
              />
            </div>
            <div>
              <span className="fieldLabel">Unit</span>
              <input
                type="text"
                className="editInput ingUnitInput"
                value={ing.unit}
                onChange={e => updateIng(list, set, i, "unit", e.target.value)}
                placeholder="unit"
                aria-label="unit"
              />
            </div>
            <div>
              <span className="fieldLabel">Ingredient</span>
              <input
                type="text"
                className="editInput ingNameInput"
                value={ing.ingredientName}
                onChange={e => updateIng(list, set, i, "ingredientName", e.target.value)}
                placeholder="ingredient name"
                aria-label="ingredient name"
              />
            </div>
            <button className="removeBtn" onClick={() => removeIng(set, i)} type="button" aria-label="remove">×</button>
          </li>
        ))}
      </ul>
      <button className="addRowBtn" onClick={() => set(prev => [...prev, emptyIng()])} type="button">
        + Add ingredient
      </button>
    </>
  );

  return (
    <div className="modalOverlay">
      <div className="parseModalContent">

        <input
          className="editInput titleInput"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Recipe title"
          aria-label="Recipe title"
        />

        {recipe.description && <p className="recipeDescription">{recipe.description}</p>}

        <div className="confidenceSection">
          <div className="confidenceSectionLabel">Parse confidence</div>
          {[
            ["Title", confidence.title],
            ["Ingredients", confidence.ingredients],
            ["Instructions", confidence.instructions],
          ].map(([label, score]) => {
            const { label: cl, color } = confidenceLabel(score as number);
            return (
              <div key={label as string} className="confidenceRow">
                <span>{label}</span>
                <span className="confidenceBadge" style={{ color }}>{cl}</span>
              </div>
            );
          })}
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
        <IngredientList list={doughIngredients} set={setDoughIngredients} />

        {otherIngredients.length > 0 && (
          <>
            <h2>Other ingredients</h2>
            <IngredientList list={otherIngredients} set={setOtherIngredients} />
          </>
        )}

        <h2>Instructions</h2>
        <ol className="instructionEditList">
          {instructions.map((inst, i) => (
            <li key={i} className="instructionRow">
              <textarea
                className="editInput instInput"
                value={inst}
                onChange={e => setInstructions(prev => prev.map((s, idx) => idx === i ? e.target.value : s))}
                rows={2}
                aria-label={`Step ${i + 1}`}
              />
              <button
                className="removeBtn"
                onClick={() => setInstructions(prev => prev.filter((_, idx) => idx !== i))}
                type="button"
                aria-label="remove step"
              >×</button>
            </li>
          ))}
        </ol>
        <button className="addRowBtn" onClick={() => setInstructions(prev => [...prev, ""])} type="button">
          + Add step
        </button>

        <div className="modalActions">
          {(formError || error) && <p className="errorText">{formError ?? error}</p>}
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
