import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Recipe } from '../../Entities/recipe.entity';
import { Connector } from '../../Entities/connector.entity';
import { Machine } from '../../Entities/machine.entity';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit, OnChanges {
  @Output() selectRecipeEvent = new EventEmitter<Recipe>();

  @Input() machine: Machine | null = null;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    //console.table(this.machine?.recipes)
  }

  selectRecipe(recipe: Recipe) {
    this.selectRecipeEvent.emit(recipe);
  }
}
