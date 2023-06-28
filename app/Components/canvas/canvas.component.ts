import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Machine } from '../../Entities/machine.entity';
import { Element } from '../../Entities/element.entity';
import { Recipe } from '../../Entities/recipe.entity';
import { Connection } from '../../Entities/connection.entity';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { DragMovement } from '../../Components/machine/machine.component';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit, OnChanges {
  @ViewChild('canvasContainer') canvasContainer: ElementRef = {} as ElementRef;

  @Output() sendMachineEvent = new EventEmitter<Machine>();
  @Output() deleteMachineEvent = new EventEmitter<Machine>();
  @Output() sendInputConnectionEvent = new EventEmitter<Connection>();
  @Output() sendOutputConnectionEvent = new EventEmitter<Connection>();
  @Output() sendMovingElementEvent = new EventEmitter<DragMovement>();
  @Output() sendCanvasPositionEvent = new EventEmitter<number[]>();

  @Input() machines: Machine[] = [];
  @Input() connectors: Element[] = [];
  @Input() selectedRecipe: Recipe | null = null;

  selectedMachineId: number | null = null;
  canvasPosition: number[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {}

  ngAfterViewInit() {
    let canvasHtml = this.canvasContainer.nativeElement as HTMLElement;
    let rect = canvasHtml.getBoundingClientRect();

    this.canvasPosition.push(Math.round(rect.x));
    this.canvasPosition.push(Math.round(rect.y));

    this.sendCanvasPositionEvent.emit(this.canvasPosition);
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

  sendMovingElement(event: DragMovement) {
    this.sendMovingElementEvent.emit(event);
  }
}
