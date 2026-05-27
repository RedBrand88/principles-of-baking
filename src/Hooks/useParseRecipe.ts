import { useState, useCallback } from "react";
import { RecipeDTO } from "../types/dto";
import { auth } from "../firebase";

interface ParseResult {
  recipe: RecipeDTO | null;
  loading: boolean;
  error: string | null;
  parseRecipe: (text: string) => Promise<void>;
}

export function useParseRecipe(): ParseResult {
  const [recipe, setRecipe] = useState<RecipeDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseRecipe = useCallback(async (text: string) => {
    if (!text.trim()) {
      setError("Recipe text cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) throw new Error("Not authenticated");

      const base = import.meta.env.VITE_API_BASE?.trim();
      const url = base ? `${base.replace(/\/$/, "")}/api/recipes/parse` : "/api/recipes/parse";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || `Server returned ${response.status}`);
      }

      const data: RecipeDTO = await response.json();
      setRecipe(data)
    } catch (err: any) {
      console.log("Parse failed:", err);
      setError(err.message || "Failed to parse recipe.");
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { recipe, loading, error, parseRecipe };
}
