import { Component, Input,OnInit } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../../../services/recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.sass'
})
export class RecipeItemComponent implements OnInit  {
@Input() recipe: Recipe | undefined;
constructor(private recipeService: RecipeService) { }

ngOnInit() {
}

onSelected(){
  this.recipeService.recipeSelected.emit(this.recipe);
}
}
