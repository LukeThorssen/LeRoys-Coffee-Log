import React, { useState, useEffect } from 'react';
import { Timer, Coffee } from 'lucide-react';
import { brewMethods } from '../data/brewMethods';
import { brewMethodDefaults } from '../data/brewMethodDefaults';
import { parseBrewTime } from '../utils/timeUtils';
import { GrinderInput } from './GrinderInput';
import type { BrewMethod, CoffeeBag } from '../types/coffee';
import type { RecipeFormData } from '../types/recipe';

interface RecipeFormProps {
  bagId: string;
  coffee: CoffeeBag;
  onSubmit: (recipe: RecipeFormData) => void;
}

export function RecipeForm({ bagId, coffee, onSubmit }: RecipeFormProps) {
  const [brewMethod, setBrewMethod] = useState<BrewMethod>(brewMethods[0]);
  const [grindSize, setGrindSize] = useState<string>(brewMethodDefaults[brewMethods[0]].grindSize.toString());
  const [grinder, setGrinder] = useState('');
  const [dose, setDose] = useState<string>(brewMethodDefaults[brewMethods[0]].dose.toString());
  const [yield_, setYield] = useState<string>(brewMethodDefaults[brewMethods[0]].yield.toString());
  const [minutes, setMinutes] = useState<string>(Math.floor(brewMethodDefaults[brewMethods[0]].brewTime / 60).toString());
  const [seconds, setSeconds] = useState<string>((brewMethodDefaults[brewMethods[0]].brewTime % 60).toString());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const defaults = brewMethodDefaults[brewMethod];
    setGrindSize(defaults.grindSize.toString());
    setDose(defaults.dose.toString());
    setYield(defaults.yield.toString());
    setMinutes(Math.floor(defaults.brewTime / 60).toString());
    setSeconds((defaults.brewTime % 60).toString());
  }, [brewMethod]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      brewMethod,
      grindSize: Number(grindSize) || 0,
      grinder,
      dose: Number(dose) || 0,
      yield: Number(yield_) || 0,
      brewTime: parseBrewTime(Number(minutes) || 0, Number(seconds) || 0),
      notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <Timer className="w-6 h-6 text-brown-600" />
        <div>
          <h2 className="text-xl font-semibold">New Recipe</h2>
          <p className="text-sm text-brown-600">for {coffee.name} by {coffee.roaster}</p>
        </div>
      </div>

      <div>
        <label htmlFor="brewMethod" className="block text-sm font-medium text-gray-700">
          Brew Method
        </label>
        <select
          id="brewMethod"
          value={brewMethod}
          onChange={(e) => setBrewMethod(e.target.value as BrewMethod)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
        >
          {brewMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="grinder" className="block text-sm font-medium text-gray-700">
            Grinder
          </label>
          <GrinderInput value={grinder} onChange={setGrinder} />
        </div>

        <div>
          <label htmlFor="grindSize" className="block text-sm font-medium text-gray-700">
            Grind Size
          </label>
          <input
            type="number"
            id="grindSize"
            value={grindSize}
            onChange={(e) => setGrindSize(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
            required
          />
        </div>

        <div>
          <label htmlFor="dose" className="block text-sm font-medium text-gray-700">
            Dose (g)
          </label>
          <input
            type="number"
            id="dose"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
            required
            step="0.1"
          />
        </div>

        <div>
          <label htmlFor="yield" className="block text-sm font-medium text-gray-700">
            Yield (g)
          </label>
          <input
            type="number"
            id="yield"
            value={yield_}
            onChange={(e) => setYield(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
            required
            step="0.1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Brew Time</label>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500 pr-12"
              min="0"
              placeholder="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">min</span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500 pr-12"
              min="0"
              max="59"
              placeholder="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">sec</span>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-brown-600 text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2"
      >
        Save Recipe
      </button>
    </form>
  );
}