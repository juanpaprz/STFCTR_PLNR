import { Recipe } from '../Entities/recipe.entity';
import { Element } from '../Entities/element.entity';

export class Machine extends Element {
  recipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;
}

export const MACHINES: Machine[] = [
  {
    name: 'Smelter',
    id: 0,
    recipes: [],
    selectedRecipe: null,
  },
  {
    name: 'Foundry',
    id: 0,
    recipes: [],
    selectedRecipe: null,
  },
  {
    name: 'Constructor',
    id: 0,
    recipes: [],
    selectedRecipe: null,
  },
  {
    name: 'Manufacturer',
    id: 0,
    recipes: [],
    selectedRecipe: null,
  },
];
