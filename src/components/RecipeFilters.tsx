import { brewMethods } from '../data/brewMethods';

interface RecipeFiltersProps {
  brewMethod: string;
  setBrewMethod: (method: string) => void;
  sortBy: 'date' | 'rating';
  setSortBy: (sort: 'date' | 'rating') => void;
}

export function RecipeFilters({
  brewMethod,
  setBrewMethod,
  sortBy,
  setSortBy,
}: RecipeFiltersProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-200 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brew Method
        </label>
        <select
          value={brewMethod}
          onChange={(e) => setBrewMethod(e.target.value)}
          className="w-full rounded-md border-gray-300 focus:border-brown-500 focus:ring-brown-500"
        >
          <option value="">All Methods</option>
          {brewMethods.map((method) => (
            <option key={method} value={method}>
              {method}
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
            Date
          </button>
          <button
            onClick={() => setSortBy('rating')}
            className={`px-4 py-2 rounded-md ${
              sortBy === 'rating'
                ? 'bg-brown-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rating
          </button>
        </div>
      </div>
    </div>
  );
}