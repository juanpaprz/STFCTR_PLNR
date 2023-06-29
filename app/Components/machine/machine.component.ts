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

  sendConnection(connection: Connection, type: string) {
    if (type === 'input') this.inputConnectionEvent.emit(connection);
    else if (type === 'output') this.outputConnectionEvent.emit(connection);
  }

  dragEnded(event: CdkDragEnd<string[]>) {
    if (this.machine.selectedRecipe !== null) {
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
