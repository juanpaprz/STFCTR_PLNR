import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Connection } from '../../Entities/connection.entity';
import { Machine } from '../../Entities/machine.entity';

@Component({
  selector: 'app-connection-button',
  templateUrl: './connection-button.component.html',
  styleUrls: ['./connection-button.component.css'],
})
export class ConnectionButtonComponent implements OnInit {
  @Output() createConnectionEvent = new EventEmitter<Connection>();

  @Input() connectionType: string = '';
  @Input() connectionIndex: number = 0;
  @Input() machine: Machine = {
    name: '',
    id: 0,
    recipes: [],
    selectedRecipe: null,
  };

  constructor() {}

  ngOnInit() {}

  connectorClick(event: Event, index: number) {
    if (this.connectionType === 'input') this.inputConnectorClick(event, index);
    else if (this.connectionType === 'output')
      this.outputConnectorClick(event, index);
  }

  inputConnectorClick(event: Event, index: number) {
    let button = event.target as HTMLElement;
    let rect = button.getBoundingClientRect();

    let inputConnection: Connection = {
      elementIdInput: this.machine.id,
      elementPortInput: index,
      inputX: Math.round(rect.right),
      inputY: Math.round(rect.y + (rect.bottom - rect.y) / 2),
      elementIdOutput: 0,
      elementPortOutput: 0,
      outputX: 0,
      outputY: 0,
    };

    this.createConnectionEvent.emit(inputConnection);
  }

  outputConnectorClick(event: Event, index: number) {
    let button = event.target as HTMLElement;
    let rect = button.getBoundingClientRect();

    let outputConnection: Connection = {
      elementIdInput: 0,
      elementPortInput: 0,
      inputX: 0,
      inputY: 0,
      elementIdOutput: this.machine.id,
      elementPortOutput: index,
      outputX: Math.round(rect.x),
      outputY: Math.round(rect.y + (rect.bottom - rect.y) / 2),
    };

    this.createConnectionEvent.emit(outputConnection);
  }

  setClass(index: number) {
    if (this.connectionType === 'input') return this.setInputsClass(index);
    if (this.connectionType === 'output') return this.setOutputsClass(index);
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
}
