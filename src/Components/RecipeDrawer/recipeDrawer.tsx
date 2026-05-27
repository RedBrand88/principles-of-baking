import { useContext } from "react";
import { RecipeContext } from "../../App";
import { useDrawer } from "../../Context/DrawerContext";
import { isStarter } from "../../Utility/ingredientMatchers";
import "./recipeDrawer.css";

type RecipeDrawerProps = {
  onSelectRecipe: (id: string) => void;
  selectedId: string | null;
};

const RecipeDrawer = ({ onSelectRecipe, selectedId }: RecipeDrawerProps) => {
  const { isRecipeDrawerOpen, closeRecipeDrawer } = useDrawer();
  const recipes = useContext(RecipeContext);

  const handleSelect = (id: string) => {
    onSelectRecipe(id);
    closeRecipeDrawer();
  };

  return (
    <>
      <div
        className={`recipeDrawerOverlay ${isRecipeDrawerOpen ? "open" : ""}`}
        onClick={closeRecipeDrawer}
      />
      <div className={`recipeDrawer ${isRecipeDrawerOpen ? "open" : ""}`} inert={isRecipeDrawerOpen ? undefined : ""}>
        <div className="recipeDrawerContent">
          {recipes.map(recipe => {
            const yeastLabel = recipe.doughIngredients.some(i => isStarter(i.ingredientName))
              ? "sourdough"
              : "dry yeast";
            return (
              <button
                key={recipe.id}
                className={`recipeDrawerItem ${recipe.id === selectedId ? "active" : ""}`}
                onClick={() => handleSelect(recipe.id)}
              >
                {recipe.title}
                <span className={`drawerYeastBadge${yeastLabel === "dry yeast" ? " drawerYeastBadgeDry" : ""}`}>{yeastLabel}</span>
              </button>
            );
          })}
        </div>
        <button className="recipeCloseButton" onClick={closeRecipeDrawer}>
          ✕
        </button>
      </div>
    </>
  );
};

export default RecipeDrawer;
