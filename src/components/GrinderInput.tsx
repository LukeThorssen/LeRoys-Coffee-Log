import React, { useState, useEffect, useRef } from 'react';
import { getGrinders, saveGrinder } from '../data/grinders';

interface GrinderInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function GrinderInput({ value, onChange }: GrinderInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const grinders = getGrinders();
    if (value) {
      setSuggestions(
        grinders.filter(g => 
          g.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions(grinders);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking them
    setTimeout(() => setShowSuggestions(false), 200);
    if (value) {
      saveGrinder(value);
    }
  };

  const selectSuggestion = (grinder: string) => {
    onChange(grinder);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
        placeholder="e.g., Comandante C40"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
          {suggestions.map((grinder) => (
            <li
              key={grinder}
              onClick={() => selectSuggestion(grinder)}
              className="px-4 py-2 hover:bg-brown-50 cursor-pointer"
            >
              {grinder}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}