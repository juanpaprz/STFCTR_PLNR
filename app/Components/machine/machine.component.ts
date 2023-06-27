import { CdkDrag } from '@angular/cdk/drag-drop';
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
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css'],
  standalone: true,
  imports: [CdkDrag, MatButtonModule, MatTooltipModule],
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
    selectedRecipe: this.selectedRecipe,
  };

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.machine.selectedRecipe = this.selectedRecipe;
  }

  onClick() {
    this.selectMachineEvent.emit(this.machine);
  }
}
