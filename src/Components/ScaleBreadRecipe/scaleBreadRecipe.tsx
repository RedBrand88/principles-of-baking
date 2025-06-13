import { useEffect, useContext, useState, useMemo, ChangeEvent } from "react";
import ReadOnlyInputWithLabel from "../ReadOnlyInputWithLabel/readOnlyInputWithLabel";
import InputWithLabel from "../InputWithLabel/inputWithLabel";
import DropDown from "../DropDown/DropDown";
import { RecipeContext } from "../../App";
import Button from "../Button/button";
import { scaleRecipe, type ScaledIngredient } from "../../Utility/scaleRecipe";
import "./scaleBreadRecipe.css";

const ScaleBreadRecipe = () => {
  const recipes = useContext(RecipeContext);
  const [selectedId, setSelectedId] = useState<string>("");
  const [totalDough, setTotalDough] = useState<number>(0);

  // state to hold the last‑clicked scaling result
  const [scaled, setScaled] = useState<ScaledIngredient[]>([]);

  // pick the recipe object from context by ID
  const recipe = useMemo(
    () => recipes.find((r) => r.id === selectedId),
    [recipes, selectedId]
  );

  const handleRecipeChange = (value: string) => {
    setSelectedId(value);
    // clear previous result whenever they pick a new recipe
    setScaled([]);
  };

  const handleDoughChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalDough(Number(e.target.value));
    // clear previous result if they change the dough amount
    setScaled([]);
  };

  const handlePrepare = () => {
    if (!recipe) return;
    const result = scaleRecipe(recipe.ingredients, totalDough);
    setScaled(result);
  };

  return (
    <div className="scaleContainer">
      <DropDown
        label="Recipe Selector"
        value={selectedId}
        options={recipes}
        onChange={(e) => handleRecipeChange(e.target.value)}
        id="recipe-selector"
      />

      <InputWithLabel
        label="Total dough needed"
        value={totalDough.toString()}
        onChange={handleDoughChange}
        id="dough-needed"
        type="number"
      />

      <Button
        onClick={handlePrepare}
        disabled={!recipe || totalDough <= 0}
      >
        Prepare Recipe
      </Button>

      <div className="ingredientList">
        {scaled.map(({ ingredientName, grams }) => (
          <ReadOnlyInputWithLabel
            key={ingredientName}
            label={ingredientName}
            value={grams.toString()}
            placeholder="ingredient in grams"
          />
        ))}
      </div>
    </div>
  );
};

export default ScaleBreadRecipe;
