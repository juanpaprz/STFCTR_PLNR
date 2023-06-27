import { Resource } from '../Entities/resource.entity';

export class ResourceRecipe {
  recipeName: string = '';
  type: string = '';
  resourceName: string = '';
  resource: Resource = { name: '' };
  amount: number = 0;
  amountMinute: number = 0;
}

export const RESOURCERECIPES: ResourceRecipe[] = [
  {
    recipeName: 'Iron Alloy Ingot',
    type: 'input',
    resourceName: 'Iron Ore',
    resource: { name: '' },
    amount: 2,
    amountMinute: 20,
  },
  {
    recipeName: 'Iron Alloy Ingot',
    type: 'input',
    resourceName: 'Copper Ore',
    resource: { name: '' },
    amount: 2,
    amountMinute: 20,
  },
  {
    recipeName: 'Iron Alloy Ingot',
    type: 'output',
    resourceName: 'Iron Ingot',
    resource: { name: '' },
    amount: 5,
    amountMinute: 50,
  },
  {
    recipeName: 'Copper Alloy Ingot',
    type: 'input',
    resourceName: 'Copper Ore',
    resource: { name: '' },
    amount: 10,
    amountMinute: 50,
  },
  {
    recipeName: 'Copper Alloy Ingot',
    type: 'input',
    resourceName: 'Iron Ore',
    resource: { name: '' },
    amount: 5,
    amountMinute: 25,
  },
  {
    recipeName: 'Copper Alloy Ingot',
    type: 'output',
    resourceName: 'Copper Ingot',
    resource: { name: '' },
    amount: 20,
    amountMinute: 100,
  },
];
