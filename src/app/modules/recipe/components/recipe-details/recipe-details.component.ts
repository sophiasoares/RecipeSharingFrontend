import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    dateCreated: new Date(),
    ingredients: [],
    instructions: []
  };

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipeById(+id).subscribe(recipe => this.recipe = recipe);
    } else {
      // Handle the absence of an ID
      console.error('No recipe ID found in route');
    }
  }

  deleteRecipe(): void {
    if (this.recipe) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Delete Recipe',
          message: 'Are you sure you want to delete ' + this.recipe.name + '?',
          confirmButtonText: 'Delete'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.recipeService.deleteRecipe(this.recipe.id).subscribe(() => this.recipeService.goBack());
      this.snackbarService.openSnackBar(this.recipe.name + ' was deleted successfully');
        }
      });
    } else {
      // Handle the absence of a recipe
      console.error('No recipe found to delete');
    }
  }

  goToEdit(): void {
    this.router.navigate(['/edit', this.recipe?.id]);
  }

  goBack(): void {
    this.recipeService.goBack();
  }
}
