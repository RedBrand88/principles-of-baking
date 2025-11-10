import { useContext, useState } from "react";
import { RecipeContext } from "../../App";
import RecipeCard from "../RecipeCard/recipeCard";
import RecipeDetailView from "../RecipeDetailView/recipeDetailView";
import "./recipeExplorer.css";

const RecipeExplorer = () => {
  const recipes = useContext(RecipeContext);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedRecipe = () => recipes.find(r => r.id === selectedId) ?? null;

  return (
    <div className="exploreContainer">
      <aside className="recipeCards">
        {recipes.map(recipe => (
          <RecipeCard
            keyStr={recipe.id}
            recipe={recipe}
            isActive={recipe.id === selectedId}
            onClick={() => setSelectedId(recipe.id)}
          />
        ))}     
      </aside>
      <main className="recipeView">
      {selectedRecipe ? (
        <RecipeDetailView recipe={selectedRecipe()} />
      ) : (
        <p>Select a recipe to view details</p>
      )}
      </main>
    </div>
  );
};

export default RecipeExplorer;
