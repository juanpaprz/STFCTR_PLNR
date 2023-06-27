import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataJsonService } from '../../Services/data-json.service';
import { Element } from '../../Entities/element.entity';
import { Machine } from '../../Entities/machine.entity';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() newMachineEvent = new EventEmitter<Machine>();
  @Output() newConnectorEvent = new EventEmitter<Element>();

  @Input() machineProperties: Machine | null = null;

  machines: Machine[] = [];
  connectors: Element[] = [];

  tab: string = 'machines';

  constructor(private dataService: DataJsonService) {}

  ngOnInit() {
    this.machines = this.dataService.getMachines();
    this.connectors = this.dataService.getConnectors();

    console.log(this.machines);
  }

  addNewMachine(index: number) {
    this.newMachineEvent.emit(this.machines[index]);
  }

  addNewConnector(index: number) {
    this.newConnectorEvent.emit(this.connectors[index]);
  }

  changeTab(tabName: string) {
    this.tab = tabName;
  }

  setActiveClass(tabName: string) {
    return { active: tabName == this.tab };
  }
}
