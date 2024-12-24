import React from 'react';
import { Clock, Scale } from 'lucide-react';
import { Recipe } from '../types/coffee';
import { formatBrewTime } from '../utils/timeUtils';

interface RecipeListProps {
  recipes: Recipe[];
}

export function RecipeList({ recipes }: RecipeListProps) {
  return (
    <div className="space-y-4">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{recipe.brewMethod}</h3>
            <span className="text-xs text-gray-400">
              {new Date(recipe.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="flex items-center space-x-2">
              <Scale className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {recipe.dose}g → {recipe.yield}g
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{formatBrewTime(recipe.brewTime)}</span>
            </div>
          </div>

          <div className="text-sm">
            <div className="mb-2">
              <span className="font-medium">Grind Size:</span> {recipe.grindSize}
            </div>
            
            {recipe.notes && (
              <div className="text-gray-600 italic">
                "{recipe.notes}"
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}