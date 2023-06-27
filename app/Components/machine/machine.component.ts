import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Recipe } from '../../Entities/recipe.entity';
import { Machine } from '../../Entities/machine.entity';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css'],
})
export class MachineComponent implements OnInit, OnChanges {
  @Output() selectMachineEvent = new EventEmitter<Machine>();

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

  inputConnectorClick(event: Event) {
    let button = event.target as HTMLElement;
    let rect = button.getBoundingClientRect();

    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // set line stroke and line width
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(500, 500);
    ctx.lineTo(300, 500);
    ctx.stroke();
  }
}
