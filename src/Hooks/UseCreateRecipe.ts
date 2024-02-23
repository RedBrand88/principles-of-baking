import { useState } from 'react';
import { Recipe } from '../App';

const useCreateRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRecipe = async (recipeData: Recipe) => {
    setLoading(true);
    setError(null);

    try {
      const resp = await fetch('http://localhost:8080/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData)
      });

      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await resp.json();
      console.log('New recipe created:', data);
    } catch (error) {
      console.error('Error creating recipe:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createRecipe, loading, error };
};

export default useCreateRecipe;

