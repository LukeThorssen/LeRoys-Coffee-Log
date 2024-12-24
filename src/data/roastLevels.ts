export const roastLevels = [
  'Light',
  'Medium-Light',
  'Medium',
  'Medium-Dark',
  'Dark'
] as const;

export type RoastLevel = typeof roastLevels[number];