import { useState, useMemo } from 'react';
import { Recipe } from '../types/models';

export function buildSearchableStr(recipe: Recipe): string {
  return [
    recipe.title,
    recipe.description,
    ...recipe.doughIngredients.map(i => i.ingredientName),
    ...recipe.otherIngredients.map(i => i.ingredientName),
    recipe.instructions.join(' '),
    ...(recipe.meta.tags ?? []),
  ].join(' ').toLowerCase();
}

export function parseSearchTerms(searchTerm: string): string[] | null {
  const trimmed = searchTerm.trim();
  if (trimmed.length < 2) return null;
  return trimmed.toLowerCase().split(/\s+/).filter(Boolean);
}

export function matchesSearch(searchStr: string, terms: string[]): boolean {
  return terms.every(term => searchStr.includes(term));
}

const useRecipeFilter = (recipes: Recipe[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchableRecipes = useMemo(
    () => recipes.map(r => ({ recipe: r, searchStr: buildSearchableStr(r) })),
    [recipes]
  );

  const filteredRecipes = useMemo(() => {
    const terms = parseSearchTerms(searchTerm);
    if (!terms) return searchableRecipes.map(({ recipe }) => recipe);
    return searchableRecipes
      .filter(({ searchStr }) => matchesSearch(searchStr, terms))
      .map(({ recipe }) => recipe);
  }, [searchableRecipes, searchTerm]);

  return { filteredRecipes, searchTerm, setSearchTerm };
};

export default useRecipeFilter;
