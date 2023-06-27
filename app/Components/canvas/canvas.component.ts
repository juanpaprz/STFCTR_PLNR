import { Component, Input, OnInit } from '@angular/core';
import { Machine } from '../../Entities/machine.entity';
import { Element } from '../../Entities/element.entity';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  @Input() machines: Machine[] = [];
  @Input() connectors: Element[] = [];

  constructor() {}

  ngOnInit() {}
}
