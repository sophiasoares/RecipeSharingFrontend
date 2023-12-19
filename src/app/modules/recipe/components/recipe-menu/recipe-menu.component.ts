import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-menu',
  templateUrl: './recipe-menu.component.html',
  styleUrl: './recipe-menu.component.scss'
})
export class RecipeMenuComponent implements OnInit {
  recipes: Recipe[] = [];
  isSortedAscending: boolean = false;
  inputFocused: boolean = false;
  searchTerm: string = '';

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.getRecipes();
  }

  handleRecipesUpdate(updatedRecipes: Recipe[]) {
    this.recipes = updatedRecipes;
  }

  getRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  navigateToRoute(): void {
    this.router.navigate(['/create']);
  }  

  toggleSort(): void {
    this.isSortedAscending = !this.isSortedAscending;
    this.recipes.sort((a, b) => {
      return this.isSortedAscending 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    });
  }  

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.searchTerm = input.value;
    }
  }
}
