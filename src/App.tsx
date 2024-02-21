import { createContext } from 'react';
import './App.css'
import Tab from './Components/TabComponents/tab';
import SignIn from './Components/SignIn/signin';
import useFetchRecipes from './Hooks/UseFetchRecipes';

export interface Ingredient {
  ingredientName: string;
  quantity: number;
  unit: string;
}

export interface Percentage {
  ingredientName: string;
  percent: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  percentages: Percentage[];
}

export const RecipeContext = createContext<Recipe[] | null>(null);

function App() {
  const { recipes, loading, error } = useFetchRecipes();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <RecipeContext.Provider value={recipes}>
      <Tab />
    </RecipeContext.Provider>
  );
};

export default App
