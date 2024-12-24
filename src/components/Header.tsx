import React from 'react';
import { Coffee } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-brown-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center space-x-2">
        <Coffee className="w-8 h-8" />
        <h1 className="text-2xl font-bold">Coffee Logbook</h1>
      </div>
    </header>
  );
}