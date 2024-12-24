import React from 'react';
import { NewBagForm } from './NewBagForm';
import { RecipeForm } from './RecipeForm';
import { RecipeList } from './RecipeList';
import { type Recipe, type BagFormData, type CoffeeBag } from '../types/coffee';
import { type RecipeFormData } from '../types/recipe';

interface NewCoffeeFormProps {
  selectedBagId: string | null;
  bags: CoffeeBag[];
  recipes: Recipe[];
  onNewBag: (data: BagFormData) => void;
  onNewRecipe: (recipe: RecipeFormData) => void;
}

export function NewCoffeeForm({ selectedBagId, bags, recipes, onNewBag, onNewRecipe }: NewCoffeeFormProps) {
  const selectedBag = bags.find(bag => bag.id === selectedBagId);

  const handleNewRecipe = (recipe: RecipeFormData) => {
    if (selectedBagId) {
      onNewRecipe(recipe);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <NewBagForm onSubmit={onNewBag} />
      </div>
      <div className="space-y-8">
        {selectedBag && (
          <>
            <RecipeForm 
              bagId={selectedBagId} 
              coffee={selectedBag}
              onSubmit={handleNewRecipe} 
            />
            <RecipeList recipes={recipes} />
          </>
        )}
      </div>
    </div>
  );
}