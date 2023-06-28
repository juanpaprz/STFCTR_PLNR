import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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

  @ViewChild('svgLine') svg: ElementRef = {} as ElementRef;

  constructor(private rd: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    /*console.log(this.rd);
    console.log(this.svg.nativeElement);

    let x =
      this.connection.inputX < this.connection.outputX
        ? this.connection.inputX
        : this.connection.outputX;
    let y =
      this.connection.inputY < this.connection.outputY
        ? this.connection.inputY
        : this.connection.outputY;

    let transformAttr = ' translate(' + x + ',' + y + ')';
    this.svg.nativeElement.setAttribute('transform', transformAttr);*/
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
