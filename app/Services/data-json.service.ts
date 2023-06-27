import { Injectable } from '@angular/core';
import { Resource, RESOURCES } from '../Entities/resource.entity';
import { Connector, CONNECTORS } from '../Entities/connector.entity';
import { Machine, MACHINES } from '../Entities/machine.entity';
import {
  ResourceRecipe,
  RESOURCERECIPES,
} from '../Entities/resource-recipe.entity';
import { Recipe, RECIPES } from '../Entities/recipe.entity';
@Injectable()
export class DataJsonService {
  constructor() {}

  getConnectors(): Connector[] {
    return CONNECTORS;
  }

  getResources(): Resource[] {
    return RESOURCES;
  }

  getResourceRecipes(): ResourceRecipe[] {
    let resourceRecipes = RESOURCERECIPES;
    let resources = this.getResources();
    resourceRecipes.forEach((rr) => {
      let resource = resources.find((r) => r.name == rr.resourceName);

      if (!resource) return;

      rr.resource = resource;
    });
    return resourceRecipes;
  }

  getRecipes(): Recipe[] {
    let recipes = RECIPES;
    let resourceRecipes = this.getResourceRecipes();

    recipes.forEach((r) => {
      r.input = resourceRecipes.filter(
        (rr) => rr.recipeName == r.name && rr.type == 'input'
      );
      r.output = resourceRecipes.filter(
        (rr) => rr.recipeName == r.name && rr.type == 'output'
      );
    });

    return recipes;
  }

  getMachines(): Machine[] {
    let machines = MACHINES;
    let recipes = this.getRecipes();

    machines.forEach((m) => {
      m.recipes = recipes.filter((r) => r.machineName == m.name);
    });

    return machines;
  }
}
