import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Machine } from '../../Entities/machine.entity';
import { Element } from '../../Entities/element.entity';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  @Output() sendMachineEvent = new EventEmitter<Machine>();

  @Input() machines: Machine[] = [];
  @Input() connectors: Element[] = [];

  constructor() {}

  ngOnInit() {}

  sendMachineSelected(machine: Machine) {
    this.sendMachineEvent.emit(machine);
  }
}
