import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { type Recipe } from '../types/coffee';
import { RecipeForm } from './RecipeForm';
import { RecipeHistory } from './RecipeHistory';
import { formatBrewTime } from '../utils/timeUtils';

interface EditableRecipeProps {
  recipe: Recipe;
  onEdit: (recipeId: string, changes: Partial<Recipe>, note?: string) => void;
  onRevert: (recipeId: string, editId: string) => void;
}

export function EditableRecipe({ recipe, onEdit, onRevert }: EditableRecipeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState('');

  const handleEdit = (changes: Partial<Recipe>) => {
    onEdit(recipe.id, changes, editNote);
    setIsEditing(false);
    setEditNote('');
  };

  const handleRevert = (editId: string) => {
    onRevert(recipe.id, editId);
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <RecipeForm
          initialData={recipe}
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Edit Note (optional)
            </label>
            <input
              type="text"
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              placeholder="Describe your changes..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
            />
          </div>
        </RecipeForm>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold">{recipe.brewMethod}</h3>
            {recipe.grinder && (
              <p className="text-sm text-gray-600">{recipe.grinder}</p>
            )}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-brown-600"
            title="Edit recipe"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm font-medium text-gray-500">Dose</div>
            <div>{recipe.dose}g</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Yield</div>
            <div>{recipe.yield}g</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Grind Size</div>
            <div>{recipe.grindSize}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Brew Time</div>
            <div>{formatBrewTime(recipe.brewTime)}</div>
          </div>
        </div>

        {recipe.notes && (
          <div className="text-gray-600 italic">"{recipe.notes}"</div>
        )}
      </div>

      {recipe.editHistory && recipe.editHistory.length > 0 && (
        <RecipeHistory
          edits={recipe.editHistory}
          onRevert={handleRevert}
        />
      )}
    </div>
  );
}