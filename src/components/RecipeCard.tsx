import { Clock, Scale } from 'lucide-react';
import { type Recipe } from '../types/coffee';
import { formatBrewTime } from '../utils/timeUtils';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">{recipe.brewMethod}</h3>
        <span className="text-sm text-gray-500">
          {recipe.createdAt.toLocaleDateString()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
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

      {recipe.grinder && (
        <p className="text-sm text-gray-600 mb-2">
          Grinder: {recipe.grinder} @ {recipe.grindSize}
        </p>
      )}

      {recipe.notes && (
        <p className="text-sm text-gray-600 italic">"{recipe.notes}"</p>
      )}
    </div>
  );
}