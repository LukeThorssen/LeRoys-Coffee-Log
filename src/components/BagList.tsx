import React from 'react';
import { type CoffeeBag } from '../types/coffee';

interface BagListProps {
  bags: CoffeeBag[];
  selectedBagId: string | null;
  onBagSelect: (bagId: string) => void;
}

export function BagList({ bags, selectedBagId, onBagSelect }: BagListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Coffee Bags</h2>
      <div className="space-y-2">
        {bags.map((bag) => (
          <button
            key={bag.id}
            onClick={() => onBagSelect(bag.id)}
            className={`w-full text-left p-3 rounded-md transition-colors ${
              selectedBagId === bag.id
                ? 'bg-brown-100 text-brown-800'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="font-medium">{bag.name}</div>
            <div className="text-sm text-gray-600">
              {bag.roaster}
              {bag.roastDate && ` • Roasted: ${bag.roastDate.toLocaleDateString()}`}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}