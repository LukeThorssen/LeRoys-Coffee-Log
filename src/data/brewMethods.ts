export const brewMethods = [
  'Espresso',
  'V60',
  'Chemex',
  'French Press',
  'AeroPress',
  'Moka Pot',
  'Siphon',
  'Cold Brew',
  'Kalita Wave',
  'Turkish Coffee'
] as const;

export type BrewMethod = typeof brewMethods[number];