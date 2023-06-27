import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Machine } from '../../Entities/machine.entity';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css'],
  standalone: true,
  imports: [CdkDrag],
})
export class MachineComponent implements OnInit {
  @Output() selectMachineEvent = new EventEmitter<Machine>();

  @Input() container: HTMLDivElement = <HTMLDivElement>(
    document.createElement('div')
  );

  @Input() machine: Machine = {
    name: '',
    id: 0,
    recipes: [],
    selectedRecipe: null,
  };

  constructor() {}

  ngOnInit() {}

  onClick() {
    if (this.machine.selectedRecipe == null) {
      this.selectMachineEvent.emit(this.machine);
    }
  }
}
