import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Machine } from '../../Entities/machine.entity';
import { Element } from '../../Entities/element.entity';
import { Recipe } from '../../Entities/recipe.entity';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  @Output() sendMachineEvent = new EventEmitter<Machine>();

  @Input() machines: Machine[] = [];
  @Input() connectors: Element[] = [];
  @Input() selectedRecipe: Recipe | null = null;

  constructor() {}

  ngOnInit() {}

  sendMachineSelected(machine: Machine) {
    this.sendMachineEvent.emit(machine);
  }
}
