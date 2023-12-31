import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataJsonService } from '../../Services/data-json.service';
import { Element } from '../../Entities/element.entity';
import { Machine } from '../../Entities/machine.entity';
import { Recipe } from '../../Entities/recipe.entity';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() newMachineEvent = new EventEmitter<Machine>();
  @Output() newConnectorEvent = new EventEmitter<Element>();
  @Output() sendRecipeEvent = new EventEmitter<Recipe>();

  @Input() machineProperties: Machine | null = null;

  machines: Machine[] = [];
  connectors: Element[] = [];

  tab: string = 'machines';

  constructor(private dataService: DataJsonService) {}

  ngOnInit() {
    this.machines = this.dataService.getMachines();
    this.connectors = this.dataService.getConnectors();
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

  sendSelectedRecipe(recipe: Recipe) {
    this.sendRecipeEvent.emit(recipe);
  }
}
