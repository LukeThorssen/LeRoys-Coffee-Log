import { Coffee } from 'lucide-react';
import { type CoffeeBag } from '../types/coffee';

interface CoffeeCardProps {
  coffee: CoffeeBag;
  onClick: () => void;
}

export function CoffeeCard({ coffee, onClick }: CoffeeCardProps) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Coffee className="w-6 h-6 text-brown-600" />
          <h3 className="text-lg font-semibold text-gray-900">{coffee.name}</h3>
        </div>
        {coffee.roastLevel && (
          <span className="px-2 py-1 text-xs font-medium bg-brown-100 text-brown-800 rounded-full">
            {coffee.roastLevel}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-gray-600">{coffee.roaster}</p>
        {coffee.roastDate && (
          <p className="text-sm text-gray-500">
            Roasted: {coffee.roastDate.toLocaleDateString()}
          </p>
        )}
        {coffee.region && (
          <p className="text-sm text-gray-500">Origin: {coffee.region}</p>
        )}
      </div>
    </button>
  );
}