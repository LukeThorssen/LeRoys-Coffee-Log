import React from 'react';
import { Clock, Scale } from 'lucide-react';
import { Recipe, CoffeeBag } from '../types/coffee';
import { formatBrewTime } from '../utils/timeUtils';

interface RecentRecipesProps {
  recipes: Recipe[];
  bags: CoffeeBag[];
}

export function RecentRecipes({ recipes, bags }: RecentRecipesProps) {
  const getBagName = (bagId: string): string => {
    const bag = bags.find(bag => bag.id === bagId);
    return bag ? bag.name : 'Unknown Coffee';
  };

  const sortedRecipes = [...recipes].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sortedRecipes.map((recipe) => (
        <div key={recipe.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg text-brown-800">{recipe.brewMethod}</h3>
              <p className="text-sm text-gray-600">{getBagName(recipe.bagId)}</p>
              {recipe.grinder && (
                <p className="text-xs text-gray-500">{recipe.grinder}</p>
              )}
            </div>
            <span className="text-xs text-gray-400">
              {recipe.createdAt.toLocaleDateString()}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center space-x-2">
              <Scale className="w-4 h-4 text-brown-600" />
              <span className="text-sm">
                {recipe.dose}g → {recipe.yield}g
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-brown-600" />
              <span className="text-sm">{formatBrewTime(recipe.brewTime)}</span>
            </div>
          </div>

          {recipe.notes && (
            <p className="text-sm text-gray-600 italic line-clamp-2">
              "{recipe.notes}"
            </p>
          )}
        </div>
      ))}
    </div>
  );
}