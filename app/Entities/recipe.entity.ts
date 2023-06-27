import { ResourceRecipe } from '../Entities/resource-recipe.entity';

export class Recipe {
  name: string = '';
  machineName: string = '';
  machineId: number = 0;
  input: ResourceRecipe[] = [];
  output: ResourceRecipe[] = [];
  isAlternate: boolean = false;
}

export const RECIPES: Recipe[] = [
  {
    name: 'Iron Alloy Ingot',
    machineName: 'Foundry',
    machineId: 0,
    input: [],
    output: [],
    isAlternate: true,
  },
  {
    name: 'Copper Alloy Ingot',
    machineName: 'Foundry',
    machineId: 0,
    input: [],
    output: [],
    isAlternate: true,
  },
];
