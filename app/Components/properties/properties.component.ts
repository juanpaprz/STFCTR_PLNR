import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Connector } from '../../Entities/connector.entity';
import { Machine } from '../../Entities/machine.entity';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  @Input() machine: Machine | null = null;

  constructor() {}

  ngOnInit() {}
}
