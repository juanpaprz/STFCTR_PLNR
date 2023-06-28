import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Recipe } from '../../Entities/recipe.entity';
import { Machine } from '../../Entities/machine.entity';
import { Connection } from '../../Entities/connection.entity';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnd,
  CdkDragMove,
  CdkDragStart,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css'],
})
export class MachineComponent implements OnInit, OnChanges {
  @Output() selectMachineEvent = new EventEmitter<Machine>();
  @Output() inputConnectionEvent = new EventEmitter<Connection>();
  @Output() outputConnectionEvent = new EventEmitter<Connection>();
  @Output() movingElementEvent = new EventEmitter<DragMovement>();

  @Input() container: HTMLDivElement = <HTMLDivElement>(
    document.createElement('div')
  );
  @Input() selectedRecipe: Recipe | null = null;
  @Input() machine: Machine = {
    name: '',
    id: 0,
    recipes: [],
    selectedRecipe: null,
  };
  @Input() isSelected: boolean = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedRecipe) {
      if (this.machine.id == this.selectedRecipe.machineId)
        this.machine.selectedRecipe = this.selectedRecipe;
    }
  }

  onClick() {
    this.selectMachineEvent.emit(this.machine);
  }

  setSelectedClass() {
    if (this.isSelected)
      return {
        border: true,
        'border-secondary': true,
      };
  }

  setInputsClass(index: number) {
    if (!this.machine.selectedRecipe) return;
    let inputAmount = this.machine.selectedRecipe.input.length;

    return {
      'connect-back-top': inputAmount > 1 && index == 0,
      'connect-back-center':
        inputAmount == 1 || (inputAmount > 2 && index == 1),
      'connect-back-bottom': inputAmount > 1 && index == inputAmount - 1,
    };
  }

  setOutputsClass(index: number) {
    if (!this.machine.selectedRecipe) return;
    let outputAmount = this.machine.selectedRecipe.output.length;

    return {
      'connect-front-top': outputAmount > 1 && index == 0,
      'connect-front-center':
        outputAmount == 1 || (outputAmount > 2 && index == 1),
      'connect-front-bottom': outputAmount > 1 && index == outputAmount - 1,
    };
  }

  inputConnectorClick(event: Event, index: number) {
    let button = event.target as HTMLElement;
    let rect = button.getBoundingClientRect();

    let inputConnection: Connection = {
      elementIdInput: this.machine.id,
      elementPortInput: index,
      inputX: Math.round(rect.x),
      inputY: Math.round(rect.y),
      elementIdOutput: 0,
      elementPortOutput: 0,
      outputX: 0,
      outputY: 0,
    };

    this.inputConnectionEvent.emit(inputConnection);
  }

  outputConnectorClick(event: Event, index: number) {
    let button = event.target as HTMLElement;
    let rect = button.getBoundingClientRect();

    let outputConnection: Connection = {
      elementIdInput: 0,
      elementPortInput: 0,
      inputX: 0,
      inputY: 0,
      elementIdOutput: this.machine.id,
      elementPortOutput: index,
      outputX: Math.round(rect.x),
      outputY: Math.round(rect.y),
    };

    this.outputConnectionEvent.emit(outputConnection);
  }

  dragEnded(event: CdkDragEnd<string[]>) {
    if (this.machine.selectedRecipe !== null) {
      console.log(event.distance);
      let movement: DragMovement = {
        x: event.distance.x,
        y: event.distance.y,
        id: this.machine.id,
      };
      this.movingElementEvent.emit(movement);
    }
  }
}

export class DragMovement {
  x: number = 0;
  y: number = 0;
  id: number = 0;
}
