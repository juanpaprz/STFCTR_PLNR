import { Component } from '@angular/core';
import { Element } from './Entities/element.entity';
import { Machine } from './Entities/machine.entity';
import { Recipe } from './Entities/recipe.entity';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  machines: Machine[] = [];
  connectors: Element[] = [];

  machineSelected: Machine | null = null;
  selectedRecipe: Recipe | null = null;

  elementId: number = 0;

  addNewMachine(machine: Machine) {
    let newMachine: Machine = {
      name: machine.name,
      id: this.elementId,
      recipes: machine.recipes,
      selectedRecipe: machine.selectedRecipe,
    };

    let idRecipes: Recipe[] = [];
    newMachine.recipes.forEach((r) => {
      let newRecipe: Recipe = {
        name: r.name,
        machineName: r.machineName,
        machineId: newMachine.id,
        isAlternate: r.isAlternate,
        input: r.input,
        output: r.output,
      };
      idRecipes.push(newRecipe);
    });

    newMachine.recipes = idRecipes;

    this.selectedRecipe = null;
    this.machines.push(newMachine);
    console.table(this.machines);
    this.elementId++;
  }

  addNewConnector(connector: Element) {
    this.connectors.push(connector);
  }

  getMachineSelected(machine: Machine) {
    this.machineSelected = machine;
  }

  getSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }

  deleteMachine(machine: Machine) {
    this.machines = this.machines.filter((m) => m.id != machine.id);
  }
}
