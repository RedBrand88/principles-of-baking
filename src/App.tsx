import { createContext, useEffect, useState } from 'react';
import './App.css'
import Tab from './Components/TabComponents/tab';
import SignIn from './Components/SignIn/signin';

interface Ingredient {
    ingredientName: string;
    quantity: number;
    unit: string;
}

interface Percentage {
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
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const resp = await fetch('http://localhost:8080/recipes');
                if (!resp.ok) {
                    throw new Error("Error response was not ok");
                }

                const data = await resp.json();
                setRecipes(data);
            } catch (e) {
                console.error("Error fetching recipes: ", e.message);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <RecipeContext.Provider value={recipes}>
            <Tab />
        </RecipeContext.Provider>
    )
}

export default App
