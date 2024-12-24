import React from 'react';
import { Coffee, Archive } from 'lucide-react';
import { type CoffeeBag } from '../types/coffee';

interface CoffeeListProps {
  coffees: CoffeeBag[];
  selectedCoffeeId: string | null;
  onCoffeeSelect: (id: string) => void;
  onArchive: (id: string) => void;
}

export function CoffeeList({ coffees, selectedCoffeeId, onCoffeeSelect, onArchive }: CoffeeListProps) {
  const activeCoffees = coffees.filter(coffee => !coffee.archived);
  const archivedCoffees = coffees.filter(coffee => coffee.archived);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-3">Active Coffees</h2>
        <div className="space-y-2">
          {activeCoffees.map((coffee) => (
            <div
              key={coffee.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                selectedCoffeeId === coffee.id
                  ? 'border-brown-500 bg-brown-50'
                  : 'border-gray-200 hover:border-brown-300'
              }`}
            >
              <button
                className="flex-1 text-left"
                onClick={() => onCoffeeSelect(coffee.id)}
              >
                <div className="font-medium">{coffee.name}</div>
                <div className="text-sm text-gray-600">
                  {coffee.roaster}
                  {coffee.roastDate && ` • ${coffee.roastDate.toLocaleDateString()}`}
                </div>
              </button>
              <button
                onClick={() => onArchive(coffee.id)}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Archive coffee"
              >
                <Archive className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {archivedCoffees.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Archived Coffees</h2>
          <div className="space-y-2 opacity-60">
            {archivedCoffees.map((coffee) => (
              <div
                key={coffee.id}
                className="p-3 rounded-lg border border-gray-200"
              >
                <div className="font-medium">{coffee.name}</div>
                <div className="text-sm text-gray-600">
                  {coffee.roaster}
                  {coffee.roastDate && ` • ${coffee.roastDate.toLocaleDateString()}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}