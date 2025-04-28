import { createContext, useState, useEffect } from 'react';
import './App.css'
import Tab from './Components/TabComponents/tab';
import useFetchRecipes from './Hooks/UseFetchRecipes';
import Header from './Components/Header/header';
import Landing from './Components/Landing/landing';
import GetStarted from './Components/GetStarted/getStarted';
import LearningStep from './Components/LearningStep/learningStep';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginModal } from './Components/Login/Login';
import { Toast } from './Components/Toast/Toast';
import { useAuth } from './Context/AuthContext';

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
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setToastMessage(`Welcome, ${user.displayName || "friend"}!`);
      setIsLoginOpen(false);
    } else {
      setToastMessage("You have logged out.");
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <RecipeContext.Provider value={recipes}>
      <Header openLogin={() => setIsLoginOpen(true)}/>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tab" element={<Tab />} />
          <Route path="/learn" element={<GetStarted />} />
          <Route path="/learning/step/:step" element={<LearningStep />} />
        </Routes>
      </Router>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      {toastMessage && (
        <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        />
      )}
    </RecipeContext.Provider>
  );
};

export default App
