import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  isSortedAscending: boolean = true;
  @Input() filterValue: string = '';
  @Output() recipesUpdated = new EventEmitter<Recipe[]>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
      console.log("Emitting recipesUpdated event");
      this.recipesUpdated.emit(this.recipes);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterValue']) {
      this.applyFilter(this.filterValue);
    }
  }

  applyFilter(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredRecipes = this.recipes;
    } else {
      this.filteredRecipes = this.recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
  
}
