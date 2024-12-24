import { BrewMethod } from '../types/coffee';

interface BrewDefaults {
  dose: number;
  yield: number;
  brewTime: number;
  grindSize: number;
}

export const brewMethodDefaults: Record<BrewMethod, BrewDefaults> = {
  'Espresso': {
    dose: 18,
    yield: 36,
    brewTime: 30,
    grindSize: 1,
  },
  'V60': {
    dose: 15,
    yield: 250,
    brewTime: 180,
    grindSize: 14,
  },
  'Chemex': {
    dose: 30,
    yield: 500,
    brewTime: 240,
    grindSize: 20,
  },
  'French Press': {
    dose: 30,
    yield: 500,
    brewTime: 240,
    grindSize: 30,
  },
  'AeroPress': {
    dose: 15,
    yield: 200,
    brewTime: 90,
    grindSize: 12,
  },
  'Moka Pot': {
    dose: 20,
    yield: 100,
    brewTime: 180,
    grindSize: 8,
  },
  'Siphon': {
    dose: 25,
    yield: 400,
    brewTime: 150,
    grindSize: 13,
  },
  'Cold Brew': {
    dose: 75,
    yield: 1000,
    brewTime: 43200, // 12 hours
    grindSize: 35,
  },
  'Kalita Wave': {
    dose: 15,
    yield: 250,
    brewTime: 180,
    grindSize: 14,
  },
  'Turkish Coffee': {
    dose: 9,
    yield: 60,
    brewTime: 180,
    grindSize: 0,
  },
};