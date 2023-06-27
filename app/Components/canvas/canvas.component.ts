import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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

  selectedMachineId: number | null = null;

  constructor() {}

  ngOnInit() {}

  sendMachineSelected(machine: Machine) {
    this.sendMachineEvent.emit(machine);
    this.selectedMachineId = machine.id;
  }

  isMachineSelected(machineId: number) {
    if (this.selectedMachineId !== null)
      if (machineId === this.selectedMachineId) return true;

    return false;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {}
}
