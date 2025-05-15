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
import { useToast } from './Hooks/useToast';

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
  const { recipes, error } = useFetchRecipes();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user } = useAuth();
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    if (user) {
      addToast(`Welcome, ${user.displayName || "friend"}!`);
      setIsLoginOpen(false);
    } else {
      addToast("You have logged out.");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      addToast(`Error fetching recipes: ${error}`, "error");
    }
  }, [error]);

  return (
    <RecipeContext.Provider value={recipes}>
      <Header openLogin={() => setIsLoginOpen(true)} />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tab" element={<Tab />} />
          <Route path="/learn" element={<GetStarted />} />
          <Route path="/learning/step/:step" element={<LearningStep />} />
        </Routes>
      </Router>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <div className="toastContainer">
        {toasts.map((toast, idx) => (
          <Toast
            key={idx}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(idx)}
          />
        ))}
      </div>
    </RecipeContext.Provider>
  );
};

export default App
