import { useState } from 'react';
import { Recipe } from '../App';
import { auth } from '../firebase';

const useCreateRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRecipe = async (recipeData: Recipe) => {
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

      const data = await resp.json();
      return data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createRecipe, loading, error };
};

export default useCreateRecipe;

