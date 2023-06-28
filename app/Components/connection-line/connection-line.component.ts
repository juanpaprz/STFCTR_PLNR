import { Component, Input, OnInit } from '@angular/core';
import { Connection } from '../../Entities/connection.entity';

@Component({
  selector: 'app-connection-line',
  templateUrl: './connection-line.component.html',
  styleUrls: ['./connection-line.component.css'],
})
export class ConnectionLineComponent implements OnInit {
  @Input() connection: Connection = {
    elementIdInput: 0,
    elementPortInput: 0,
    inputX: 0,
    inputY: 0,
    elementIdOutput: 0,
    elementPortOutput: 0,
    outputX: 0,
    outputY: 0,
  };

  constructor() {}

  ngOnInit() {}

  getLineWidth(connection: Connection): number {
    let a =
      connection.inputX > connection.outputX
        ? connection.inputX
        : connection.outputX;
    let b =
      connection.inputX > connection.outputX
        ? connection.outputX
        : connection.inputX;

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
