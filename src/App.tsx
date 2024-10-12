import { createContext } from 'react';
import './App.css'
import Tab from './Components/TabComponents/tab';
import SignIn from './Components/SignIn/signin';
import useFetchRecipes from './Hooks/UseFetchRecipes';
import Header from './Components/Header/header';
import Landing from './Components/Landing/landing';
import GetStarted from './Components/GetStarted/getStarted';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <RecipeContext.Provider value={recipes}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tab" element={<Tab />} />
          <Route path="/learn" element={<GetStarted />} />
        </Routes>
      </Router>
    </RecipeContext.Provider>
  );
};

export default App
