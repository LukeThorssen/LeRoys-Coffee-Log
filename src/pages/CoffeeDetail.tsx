import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { useCoffeeStore } from '../hooks/useCoffeeStore';
import { RecipeCard } from '../components/RecipeCard';
import { RecipeFilters } from '../components/RecipeFilters';
import { SelectedCoffeeCard } from '../components/SelectedCoffeeCard';

export function CoffeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bags, recipes } = useCoffeeStore();
  const [showFilters, setShowFilters] = useState(false);
  const [brewMethod, setBrewMethod] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');

  const coffee = bags.find(bag => bag.id === id);
  if (!coffee) return null;

  const coffeeRecipes = recipes
    .filter(recipe => {
      const matchesBrewMethod = !brewMethod || recipe.brewMethod === brewMethod;
      return recipe.bagId === id && matchesBrewMethod;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return 0; // Add rating logic here if implemented
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Coffee Details</h1>
      </div>

      <SelectedCoffeeCard coffee={coffee} />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Brew History</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-5 h-5" />
          <span>Filter Brews</span>
        </button>
      </div>

      {showFilters && (
        <RecipeFilters
          brewMethod={brewMethod}
          setBrewMethod={setBrewMethod}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {coffeeRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}