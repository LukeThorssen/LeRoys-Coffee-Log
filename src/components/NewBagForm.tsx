import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import { BagFormData } from '../types/coffee';
import { roastLevels } from '../data/roastLevels';

interface NewBagFormProps {
  onSubmit: (data: BagFormData) => void;
}

export function NewBagForm({ onSubmit }: NewBagFormProps) {
  const [bagName, setBagName] = useState('');
  const [roaster, setRoaster] = useState('');
  const [roastDate, setRoastDate] = useState('');
  const [region, setRegion] = useState('');
  const [variety, setVariety] = useState('');
  const [process, setProcess] = useState('');
  const [roastLevel, setRoastLevel] = useState<string>('');
  const [altitude, setAltitude] = useState('');
  const [producer, setProducer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: bagName,
      roaster,
      roastDate: roastDate ? new Date(roastDate) : undefined,
      region: region || undefined,
      variety: variety || undefined,
      process: process || undefined,
      roastLevel: roastLevel as any || undefined,
      altitude: altitude || undefined,
      producer: producer || undefined,
    });
    setBagName('');
    setRoaster('');
    setRoastDate('');
    setRegion('');
    setVariety('');
    setProcess('');
    setRoastLevel('');
    setAltitude('');
    setProducer('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <Coffee className="w-6 h-6 text-brown-600" />
        <h2 className="text-xl font-semibold">New Coffee</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="bagName" className="block text-sm font-medium text-gray-700">
            Coffee Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="bagName"
            value={bagName}
            onChange={(e) => setBagName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="roaster" className="block text-sm font-medium text-gray-700">
            Roaster <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="roaster"
            value={roaster}
            onChange={(e) => setRoaster(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
            required
          />
        </div>

        <div>
          <label htmlFor="roastDate" className="block text-sm font-medium text-gray-700">
            Roast Date
          </label>
          <input
            type="date"
            id="roastDate"
            value={roastDate}
            onChange={(e) => setRoastDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
          />
        </div>

        <div>
          <label htmlFor="roastLevel" className="block text-sm font-medium text-gray-700">
            Roast Level
          </label>
          <select
            id="roastLevel"
            value={roastLevel}
            onChange={(e) => setRoastLevel(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
          >
            <option value="">Not specified</option>
            {roastLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700">
            Region
          </label>
          <input
            type="text"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="e.g., Yirgacheffe, Ethiopia"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
          />
        </div>

        <div>
          <label htmlFor="variety" className="block text-sm font-medium text-gray-700">
            Variety
          </label>
          <input
            type="text"
            id="variety"
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            placeholder="e.g., Bourbon, Typica"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
          />
        </div>

        <div>
          <label htmlFor="process" className="block text-sm font-medium text-gray-700">
            Process
          </label>
          <input
            type="text"
            id="process"
            value={process}
            onChange={(e) => setProcess(e.target.value)}
            placeholder="e.g., Washed, Natural"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
          />
        </div>

        <div>
          <label htmlFor="altitude" className="block text-sm font-medium text-gray-700">
            Altitude
          </label>
          <input
            type="text"
            id="altitude"
            value={altitude}
            onChange={(e) => setAltitude(e.target.value)}
            placeholder="e.g., 1800-2000m"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
          />
        </div>

        <div>
          <label htmlFor="producer" className="block text-sm font-medium text-gray-700">
            Producer
          </label>
          <input
            type="text"
            id="producer"
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
            placeholder="e.g., Farm or Cooperative name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-brown-600 text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2"
      >
        Add New Coffee
      </button>
    </form>
  );
}