import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Machine } from '../../Entities/machine.entity';
import { Element } from '../../Entities/element.entity';
import { Recipe } from '../../Entities/recipe.entity';
import { Connection } from '../../Entities/connection.entity';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  @Output() sendMachineEvent = new EventEmitter<Machine>();
  @Output() deleteMachineEvent = new EventEmitter<Machine>();
  @Output() sendInputConnectionEvent = new EventEmitter<Connection>();
  @Output() sendOutputConnectionEvent = new EventEmitter<Connection>();

  @Input() machines: Machine[] = [];
  @Input() connectors: Element[] = [];
  @Input() connections: Connection[] = [];
  @Input() selectedRecipe: Recipe | null = null;

  selectedMachineId: number | null = null;

  constructor() {}

  ngOnInit() {
    this.connections = [
      {
        elementIdInput: 0,
        elementPortInput: 0,
        inputX: 50,
        inputY: 58,
        elementIdOutput: 0,
        elementPortOutput: 0,
        outputX: 100,
        outputY: 100,
      },
    ];
  }

  sendMachineSelected(machine: Machine) {
    this.sendMachineEvent.emit(machine);
    this.selectedMachineId = machine.id;
  }

  isMachineSelected(machineId: number) {
    if (this.selectedMachineId !== null)
      if (machineId === this.selectedMachineId) return true;

    return false;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let isOneSelected = this.machines.some((m) => this.isMachineSelected(m.id));
    if (!isOneSelected) return;

    if (event.key !== 'Delete') return;

    let machineToDelete = this.machines.find((m) =>
      this.isMachineSelected(m.id)
    );

    if (!machineToDelete) return;

    this.sendMachineEvent.emit(undefined);
    this.deleteMachineEvent.emit(machineToDelete);
  }

  sendInputConnection(connection: Connection) {
    this.sendInputConnectionEvent.emit(connection);
  }

  sendOutputConnection(connection: Connection) {
    this.sendOutputConnectionEvent.emit(connection);
  }

  getLineWidth(connection: Connection): number {
    let a =
      connection.inputX > connection.outputX
        ? connection.inputX
        : connection.outputX;
    let b =
      connection.inputX > connection.outputX
        ? connection.outputX
        : connection.inputX;

    console.log(a - b);

    return Math.round(a - b);
  }

  getLineHeight(connection: Connection): number {
    let a =
      connection.inputY > connection.outputY
        ? connection.inputY
        : connection.outputY;
    let b =
      connection.inputY > connection.outputY
        ? connection.outputY
        : connection.inputY;

    return Math.round(a - b);
  }
}
