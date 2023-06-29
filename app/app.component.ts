import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConnectorOffset } from './Components/connection-button/connection-button.component';
import { DragMovement } from './Components/machine/machine.component';
import { Connection } from './Entities/connection.entity';
import { Element } from './Entities/element.entity';
import { Machine } from './Entities/machine.entity';
import { Recipe } from './Entities/recipe.entity';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvasContainer') canvasContainer: ElementRef = {} as ElementRef;

  machines: Machine[] = [];
  connectors: Element[] = [];
  connections: Connection[] = [];

  connection: Connection = {
    elementIdInput: 0,
    elementPortInput: 0,
    inputX: 0,
    inputY: 0,
    elementIdOutput: 0,
    elementPortOutput: 0,
    outputX: 0,
    outputY: 0,
  };

  machineSelected: Machine | null = null;
  selectedRecipe: Recipe | null = null;

  elementId: number = 1;
  startConnection: boolean = true;
  canvasContainerX: number = 0;
  canvasContainerY: number = 0;

  ngOnInit(): void {}

  ngAfterViewInit() {}

  setCanvasPosition(position: number[]) {
    console.log(position);
    this.canvasContainerX = position[0];
    this.canvasContainerY = position[1];
  }

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

  createNewConnection(): Connection {
    let newConnection: Connection = {
      elementIdInput: this.connection.elementIdInput,
      elementPortInput: this.connection.elementPortInput,
      inputX: this.connection.inputX,
      inputY: this.connection.inputY,
      elementIdOutput: this.connection.elementIdOutput,
      elementPortOutput: this.connection.elementPortOutput,
      outputX: this.connection.outputX,
      outputY: this.connection.outputY,
    };

    this.connection = {
      elementIdInput: 0,
      elementPortInput: 0,
      inputX: 0,
      inputY: 0,
      elementIdOutput: 0,
      elementPortOutput: 0,
      outputX: 0,
      outputY: 0,
    };
    return newConnection;
  }

  setInputConnection(inputConnection: Connection) {
    if (this.connection.elementIdInput != 0) this.startConnection = true;

    if (this.connection.elementIdOutput == inputConnection.elementIdInput)
      return;

    this.connection.elementIdInput = inputConnection.elementIdInput;
    this.connection.elementPortInput = inputConnection.elementPortInput;
    this.connection.inputX = inputConnection.inputX;
    this.connection.inputY = inputConnection.inputY;

    if (!this.startConnection)
      this.connections.push(this.createNewConnection());

    this.startConnection = !this.startConnection;
  }

  setOutputConnection(outputConnection: Connection) {
    if (this.connection.elementIdOutput != 0) this.startConnection = true;

    if (this.connection.elementIdInput == outputConnection.elementIdOutput)
      return;

    this.connection.elementIdOutput = outputConnection.elementIdOutput;
    this.connection.elementPortOutput = outputConnection.elementPortOutput;
    this.connection.outputX = outputConnection.outputX;
    this.connection.outputY = outputConnection.outputY;

    if (!this.startConnection)
      this.connections.push(this.createNewConnection());

    this.startConnection = !this.startConnection;
  }

  setNewElementPosition(event: DragMovement) {
    let inputs = this.connections.filter((c) => c.elementIdInput == event.id);
    let outputs = this.connections.filter((c) => c.elementIdOutput == event.id);

    inputs.forEach((i) => {
      i.inputX += event.x;
      i.inputY += event.y;

      let offsets = event.offsets.find(
        (o) => o.index === i.elementPortInput && o.type === 'input'
      );
      if (!offsets) return;

      console.log(offsets);

      if (i.inputX < this.canvasContainerX)
        i.inputX = this.canvasContainerX + offsets.offsetX;

      let topLimit = this.canvasContainerY;
      if (offsets.offsetY > 20) topLimit += offsets.offsetY;

      if (i.inputY < topLimit)
        i.inputY = this.canvasContainerY + offsets.offsetY;
    });

    outputs.forEach((o) => {
      o.outputX += event.x;
      o.outputY += event.y;

      let offsets = event.offsets.find(
        (of) => of.index === o.elementPortOutput && of.type === 'output'
      );
      if (!offsets) return;

      console.log();

      if (o.outputX < this.canvasContainerX + offsets.offsetX)
        o.outputX = this.canvasContainerX + offsets.offsetX;

      let topLimit = this.canvasContainerY;
      if (offsets.offsetY > 20) topLimit += offsets.offsetY;

      if (o.outputY < topLimit)
        o.outputY = this.canvasContainerY + offsets.offsetY;
    });
  }
}
