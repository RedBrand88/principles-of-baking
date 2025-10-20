import { useState } from 'react';
import { auth } from '../firebase';
import { RecipeRequest } from '../Components/AddBreadRecipe/addBreadRecipe';

const useCreateRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRecipe = async (recipeData: RecipeRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const idToken = await auth.currentUser?.getIdToken();

      if (!idToken) {
        throw new Error('User is not authenticated');
      }

      const resp = await fetch('http://localhost:8080/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify(recipeData)
      });

      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      await resp.json();

      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createRecipe, loading, error };
};

export default useCreateRecipe;
