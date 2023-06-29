import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Connection } from '../../Entities/connection.entity';
import { Machine } from '../../Entities/machine.entity';

@Component({
  selector: 'app-connection-button',
  templateUrl: './connection-button.component.html',
  styleUrls: ['./connection-button.component.css'],
})
export class ConnectionButtonComponent implements OnInit, OnChanges {
  @Output() createConnectionEvent = new EventEmitter<Connection>();
  @Output() sendConnectorOffsetEvent = new EventEmitter<ConnectorOffset>();

  @Input() connectionType: string = '';
  @Input() connectionIndex: number = 0;
  @Input() containerX: number = 0;
  @Input() containerY: number = 0;
  @Input() machine: Machine = {
    name: '',
    id: 0,
    recipes: [],
    selectedRecipe: null,
  };

  originalPosX: number = 0;
  originalPosY: number = 0;
  offsetX: number = 0;
  offsetY: number = 0;

  @ViewChild('connectionButton') connectionButton: ElementRef =
    {} as ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    let button = this.connectionButton.nativeElement as HTMLElement;
    let rect = button.getBoundingClientRect();

    switch (this.connectionType) {
      case 'input':
        this.originalPosX = Math.round(rect.right);
        this.originalPosY = Math.round(rect.y + (rect.bottom - rect.y) / 2);
        break;
      case 'output':
        this.originalPosX = Math.round(rect.x);
        this.originalPosY = Math.round(rect.y + (rect.bottom - rect.y) / 2);
        break;
    }

    this.offsetX = this.originalPosX - this.containerX;
    this.offsetY = this.originalPosY - this.containerY;

    console.log(rect.y, rect.bottom);

    let connectorOffset: ConnectorOffset = {
      type: this.connectionType,
      index: this.connectionIndex,
      offsetX: this.offsetX,
      offsetY: this.offsetY,
    };

    this.sendConnectorOffsetEvent.emit(connectorOffset);
  }

  ngOnChanges() {}

  connectorClick(index: number) {
    let button = this.connectionButton.nativeElement as HTMLElement;
    if (this.connectionType === 'input')
      this.inputConnectorClick(button, index);
    else if (this.connectionType === 'output')
      this.outputConnectorClick(button, index);
  }

  inputConnectorClick(button: HTMLElement, index: number) {
    let rect = button.getBoundingClientRect();
    console.log(rect.y, rect.bottom);
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

  outputConnectorClick(button: HTMLElement, index: number) {
    let rect = button.getBoundingClientRect();
    console.log(rect.y, rect.bottom);
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

export class ConnectorOffset {
  type: string = '';
  index: number = 0;
  offsetX: number = 0;
  offsetY: number = 0;
}
