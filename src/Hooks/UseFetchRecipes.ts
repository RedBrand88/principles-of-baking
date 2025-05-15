import { useEffect, useState } from 'react';
import { Recipe } from '../App';

const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('http://localhost:8080/recipes');
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await resp.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { recipes, loading, error };
};

export default useFetchRecipes;
