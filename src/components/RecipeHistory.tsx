import React from 'react';
import { History, RotateCcw } from 'lucide-react';
import { type RecipeEdit } from '../types/coffee';
import { formatBrewTime } from '../utils/timeUtils';

interface RecipeHistoryProps {
  edits: RecipeEdit[];
  onRevert: (editId: string) => void;
}

export function RecipeHistory({ edits, onRevert }: RecipeHistoryProps) {
  const formatChange = (key: string, value: any): string => {
    switch (key) {
      case 'brewTime':
        return formatBrewTime(value);
      case 'dose':
      case 'yield':
        return `${value}g`;
      case 'grindSize':
        return value.toString();
      default:
        return value.toString();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <History className="w-5 h-5 text-brown-600" />
        <h3 className="text-lg font-medium">Edit History</h3>
      </div>

      <div className="space-y-3">
        {edits.map((edit) => (
          <div key={edit.id} className="p-3 bg-white rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-gray-500">
                {edit.timestamp.toLocaleString()}
              </div>
              <button
                onClick={() => onRevert(edit.id)}
                className="p-1 text-gray-400 hover:text-brown-600"
                title="Revert to this version"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              {Object.entries(edit.changes).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="font-medium">{key}:</span>{' '}
                  {formatChange(key, value)}
                </div>
              ))}
            </div>

            {edit.note && (
              <div className="mt-2 text-sm text-gray-600 italic">
                "{edit.note}"
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}