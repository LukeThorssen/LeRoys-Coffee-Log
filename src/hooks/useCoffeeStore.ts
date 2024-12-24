import { useState, useCallback } from 'react';
import { type Recipe, type CoffeeBag, type RecipeEdit, type BagFormData } from '../types/coffee';
import { type RecipeFormData } from '../types/recipe';

export function useCoffeeStore() {
  const [bags, setBags] = useState<CoffeeBag[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedBagId, setSelectedBagId] = useState<string | null>(null);

  const addBag = useCallback((data: BagFormData) => {
    const newBag: CoffeeBag = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
    };
    setBags(prev => [newBag, ...prev]);
    setSelectedBagId(newBag.id);
    return newBag.id;
  }, []);

  const archiveBag = useCallback((bagId: string) => {
    setBags(prev => prev.map(bag => 
      bag.id === bagId ? { ...bag, archived: true } : bag
    ));
  }, []);

  const addRecipe = useCallback((bagId: string, data: RecipeFormData) => {
    const newRecipe: Recipe = {
      id: crypto.randomUUID(),
      bagId,
      ...data,
      createdAt: new Date(),
    };
    setRecipes(prev => [newRecipe, ...prev]);
    return newRecipe.id;
  }, []);

  const editRecipe = useCallback((recipeId: string, changes: Partial<Recipe>, note?: string) => {
    setRecipes(prev => prev.map(recipe => {
      if (recipe.id !== recipeId) return recipe;

      const edit: RecipeEdit = {
        id: crypto.randomUUID(),
        recipeId,
        changes,
        timestamp: new Date(),
        note,
      };

      return {
        ...recipe,
        ...changes,
        editHistory: [...(recipe.editHistory || []), edit],
      };
    }));
  }, []);

  const revertRecipe = useCallback((recipeId: string, editId: string) => {
    setRecipes(prev => prev.map(recipe => {
      if (recipe.id !== recipeId || !recipe.editHistory) return recipe;

      const editIndex = recipe.editHistory.findIndex(edit => edit.id === editId);
      if (editIndex === -1) return recipe;

      // Revert all changes after the selected edit
      const revertedRecipe = { ...recipe };
      for (let i = recipe.editHistory.length - 1; i >= editIndex; i--) {
        const edit = recipe.editHistory[i];
        Object.keys(edit.changes).forEach(key => {
          delete revertedRecipe[key as keyof Recipe];
        });
      }

      return {
        ...revertedRecipe,
        editHistory: recipe.editHistory.slice(0, editIndex),
      };
    }));
  }, []);

  return {
    bags,
    recipes,
    selectedBagId,
    setSelectedBagId,
    addBag,
    archiveBag,
    addRecipe,
    editRecipe,
    revertRecipe,
  };
}