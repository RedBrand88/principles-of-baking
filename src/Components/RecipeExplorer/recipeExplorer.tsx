import { useContext } from "react";
import { RecipeContext } from "../../App";
import RecipeCard from "../RecipeCard/recipeCard";
import RecipeDetailView from "../RecipeDetailView/recipeDetailView";
import "./recipeExplorer.css";
import RecipeDrawer from "../RecipeDrawer/recipeDrawer";
import { useDrawer } from "../../Context/DrawerContext";

const RecipeExplorer = () => {
  const recipes = useContext(RecipeContext);
  const { selectedId, setSelectedId } = useDrawer();

  const selectedRecipe = () => recipes.find(r => r.id === selectedId) ?? null;

  return (
    <div className="exploreContainer">
      <RecipeDrawer onSelectRecipe={setSelectedId} selectedId={selectedId} />
      <aside className={"recipeCards"}>
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isActive={recipe.id === selectedId}
            onClick={() => setSelectedId(recipe.id)}
          />
        ))}
      </aside>
      <main className="recipeView">
        {selectedRecipe() ? (
          <RecipeDetailView recipe={selectedRecipe()} />
        ) : (
          <div>
            <p className="desktopPrompt">Select a recipe to view details</p>
            <p className="mobilePrompt">Click the bread icon to see a list of recipes</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RecipeExplorer;
