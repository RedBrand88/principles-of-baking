import { useState } from 'react';
import { auth } from '../firebase';
import { type RecipeRequest } from '../types/dto';
import { type Recipe } from '../types/models';

type CreateRecipeResult =
  | { ok: true; data: Recipe }
  | { ok: false; error: string }

const useCreateRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const join = (a = "", b = "") =>
    `${a.replace(/\/$/, "")}/${b.replace(/^\//, "")}`;

  const createRecipe = async (recipeData: RecipeRequest): Promise<CreateRecipeResult> => {
    setLoading(true);
    setError(null);

    try {
      const idToken = await auth.currentUser?.getIdToken();

      if (!idToken) {
        throw new Error('User is not authenticated');
      }

      const base = import.meta.env.VITE_API_BASE?.trim();
      const url = base ? join(base, "api/recipes") : "/api/recipes";

      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify(recipeData)
      });

      if (!resp.ok) {
        const msg = (await resp.text().catch(() => "")) || `Request failed: ${resp.status}`;
        throw new Error(msg);
      }

      const created: Recipe = await resp.json();

      return { ok: true, data: created };
    } catch (error: any) {
      const msg = error?.message ?? "Unknown Error";
      setError(msg);
      return { ok: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  return { createRecipe, loading, error };
};

export default useCreateRecipe;
