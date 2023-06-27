import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../Entities/recipe.entity';
import { Connector } from '../../Entities/connector.entity';
import { Machine } from '../../Entities/machine.entity';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  @Output() selectRecipeEvent = new EventEmitter<Recipe>();

  @Input() machine: Machine | null = null;

  constructor() {}

  ngOnInit() {}

  selectRecipe(recipe: Recipe) {
    this.selectRecipeEvent.emit(recipe);
  }
}
