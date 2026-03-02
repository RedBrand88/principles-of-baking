import { useContext } from "react";
import { RecipeContext } from "../../App";
import { useDrawer } from "../../Context/DrawerContext";
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
      <div className={`recipeDrawer ${isRecipeDrawerOpen ? "open" : ""}`}>
        <div className="recipeDrawerContent">
          {recipes.map(recipe => (
            <button
              key={recipe.id}
              className={`recipeDrawerItem ${recipe.id === selectedId ? "active" : ""}`}
              onClick={() => handleSelect(recipe.id)}
            >
              {recipe.title}
            </button>
          ))}
        </div>
        <button className="closeDrawerButton" onClick={closeRecipeDrawer}>
          ✕
        </button>
      </div>
    </>
  );
};

export default RecipeDrawer;
