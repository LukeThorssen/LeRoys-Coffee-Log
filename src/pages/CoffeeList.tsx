import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, PlusCircle } from 'lucide-react';
import { useCoffeeStore } from '../hooks/useCoffeeStore';
import { CoffeeCard } from '../components/CoffeeCard';
import { CoffeeFilters } from '../components/CoffeeFilters';

export function CoffeeList() {
  const navigate = useNavigate();
  const { bags } = useCoffeeStore();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [roastLevel, setRoastLevel] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');

  const filteredBags = bags
    .filter(bag => {
      const matchesSearch = 
        bag.name.toLowerCase().includes(search.toLowerCase()) ||
        bag.roaster.toLowerCase().includes(search.toLowerCase());
      const matchesRoast = !roastLevel || bag.roastLevel === roastLevel;
      return matchesSearch && matchesRoast;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Coffee Collection</h1>
        <button
          onClick={() => navigate('/new')}
          className="flex items-center space-x-2 bg-brown-600 text-white px-4 py-2 rounded-lg hover:bg-brown-700"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Coffee</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search coffees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full rounded-lg border-gray-300 focus:border-brown-500 focus:ring-brown-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <CoffeeFilters
          roastLevel={roastLevel}
          setRoastLevel={setRoastLevel}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBags.map((bag) => (
          <CoffeeCard
            key={bag.id}
            coffee={bag}
            onClick={() => navigate(`/coffee/${bag.id}`)}
          />
        ))}
      </div>
    </div>
  );
}