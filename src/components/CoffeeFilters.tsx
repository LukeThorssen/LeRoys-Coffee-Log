import { roastLevels } from '../data/roastLevels';

interface CoffeeFiltersProps {
  roastLevel: string;
  setRoastLevel: (level: string) => void;
  sortBy: 'date' | 'name';
  setSortBy: (sort: 'date' | 'name') => void;
}

export function CoffeeFilters({
  roastLevel,
  setRoastLevel,
  sortBy,
  setSortBy,
}: CoffeeFiltersProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-200 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Roast Level
        </label>
        <select
          value={roastLevel}
          onChange={(e) => setRoastLevel(e.target.value)}
          className="w-full rounded-md border-gray-300 focus:border-brown-500 focus:ring-brown-500"
        >
          <option value="">All Roasts</option>
          {roastLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('date')}
            className={`px-4 py-2 rounded-md ${
              sortBy === 'date'
                ? 'bg-brown-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Date Added
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-4 py-2 rounded-md ${
              sortBy === 'name'
                ? 'bg-brown-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Name
          </button>
        </div>
      </div>
    </div>
  );
}