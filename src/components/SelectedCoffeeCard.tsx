import React from 'react';
import { Coffee } from 'lucide-react';
import { type CoffeeBag } from '../types/coffee';

interface SelectedCoffeeCardProps {
  coffee: CoffeeBag;
}

export function SelectedCoffeeCard({ coffee }: SelectedCoffeeCardProps) {
  return (
    <div className="bg-brown-50 p-4 rounded-lg border border-brown-200">
      <div className="flex items-center space-x-2 mb-2">
        <Coffee className="w-5 h-5 text-brown-600" />
        <h3 className="font-semibold text-brown-800">Selected Coffee</h3>
      </div>
      <div className="text-lg font-medium text-brown-900">{coffee.name}</div>
      <div className="text-sm text-brown-600">
        {coffee.roaster}
        {coffee.roastDate && ` • Roasted ${coffee.roastDate.toLocaleDateString()}`}
      </div>
    </div>
  );
}