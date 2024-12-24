import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Recipe, CoffeeBag } from '../types/coffee';
import { RecentRecipes } from './RecentRecipes';

interface HomeScreenProps {
  recipes: Recipe[];
  bags: CoffeeBag[];
  onNewCoffeeClick: () => void;
}

export function HomeScreen({ recipes, bags, onNewCoffeeClick }: HomeScreenProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Recent Brews</h2>
        <button
          onClick={onNewCoffeeClick}
          className="flex items-center space-x-2 bg-brown-600 text-white px-4 py-2 rounded-lg hover:bg-brown-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Coffee</span>
        </button>
      </div>
      <RecentRecipes recipes={recipes} bags={bags} />
    </div>
  );
}