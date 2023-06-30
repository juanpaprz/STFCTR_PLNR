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
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { ConnectorOffset } from '../../Components/connection-button/connection-button.component';

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

  @Input() selectedRecipe: Recipe | null = null;
  @Input() isSelected: boolean = false;
  @Input() container: HTMLDivElement = <HTMLDivElement>(
    document.createElement('div')
  );
  @Input() machine: Machine = {
    name: '',
    id: 0,
    recipes: [],
    selectedRecipe: null,
  };

  @ViewChild('machineContainer') machineContainer: ElementRef =
    {} as ElementRef;

  machineContainerX: number = 0;
  machineContainerY: number = 0;

  connectorsOffset: ConnectorOffset[] = [];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getContainerPos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedRecipe) {
      if (this.machine.id == this.selectedRecipe.machineId)
        this.machine.selectedRecipe = this.selectedRecipe;
    }
  }

  getContainerPos() {
    let containerDiv = this.machineContainer.nativeElement as HTMLElement;
    let rect = containerDiv.getBoundingClientRect();

    this.machineContainerX = Math.round(rect.x);
    this.machineContainerY = Math.round(rect.y);
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

  getConnectorsOffset(connectorOffset: ConnectorOffset) {
    if (!this.machine.selectedRecipe) return
    if (connectorOffset.type == 'output' && connectorOffset.index == this.machine.selectedRecipe.output.length - 1)
  }

  setConnectorsOffset(connectorOffset: ConnectorOffset) {
    this.connectorsOffset = this.connectorsOffset.filter(
      (c) => c.index != connectorOffset.index || c.type !== connectorOffset.type
    );
    this.connectorsOffset.push(connectorOffset);
  }

  sendConnection(connection: Connection, type: string) {
    if (type === 'input') this.inputConnectionEvent.emit(connection);
    else if (type === 'output') this.outputConnectionEvent.emit(connection);
  }

  dragEnded(event: CdkDragEnd<string[]>) {
    this.getContainerPos();
    if (this.machine.selectedRecipe !== null) {
      let movement: DragMovement = {
        x: event.distance.x,
        y: event.distance.y,
        id: this.machine.id,
        offsets: this.connectorsOffset,
      };
      this.movingElementEvent.emit(movement);
    }
  }
}

export class DragMovement {
  x: number = 0;
  y: number = 0;
  id: number = 0;
  offsets: ConnectorOffset[] = [];
}
