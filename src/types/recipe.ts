import { BrewMethod } from './coffee';

export interface RecipeFormData {
  brewMethod: BrewMethod;
  grindSize: number;
  grinder: string;
  dose: number;
  yield: number;
  brewTime: number;
  notes: string;
}