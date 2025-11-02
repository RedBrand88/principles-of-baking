import { useState, useCallback } from "react";
import { Recipe } from "../types/models";

interface ParseResult {
  recipe: Recipe | null;
  loading: boolean;
  error: string | null;
  parseRecipe: (text: string) => Promise<void>;
}

export function useParseRecipe(): ParseResult {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
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
      const response = await fetch("/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || `Server returned ${response.status}`);
      }

      const data: Recipe = await response.json();
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
