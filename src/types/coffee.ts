import { type BrewMethod } from '../data/brewMethods';

export interface Recipe {
  id: string;
  bagId: string;
  brewMethod: BrewMethod;
  grindSize: number;
  grinder: string;
  dose: number;
  yield: number;
  brewTime: number;
  notes: string;
  createdAt: Date;
  editHistory?: RecipeEdit[];
}

export interface RecipeEdit {
  id: string;
  recipeId: string;
  changes: Partial<Recipe>;
  timestamp: Date;
  note?: string;
}

export interface CoffeeBag {
  id: string;
  name: string;
  roaster: string;
  roastDate?: Date;
  region?: string;
  variety?: string;
  process?: string;
  roastLevel?: RoastLevel;
  altitude?: string;
  producer?: string;
  createdAt: Date;
  archived?: boolean;
}

export interface BagFormData {
  name: string;
  roaster: string;
  roastDate?: Date;
  region?: string;
  variety?: string;
  process?: string;
  roastLevel?: RoastLevel;
  altitude?: string;
  producer?: string;
}

export type RoastLevel = 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark';

export type { BrewMethod } from '../data/brewMethods';