import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { notEmptyValidator } from '../../../../shared/custom-validators';
import { ActivatedRoute } from '@angular/router';
import { CapitalizeNamesPipe } from '../../../../shared/pipes/capitalize-names.pipe';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-recipe-create-edit',
  templateUrl: './recipe-create-edit.component.html',
  styleUrls: ['./recipe-create-edit.component.scss']
})
export class RecipeCreateEditComponent implements OnInit {
  recipeForm: FormGroup = new FormGroup({});
  title: string = 'Recipe';
  currentRoute: string = '';
  recipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    dateCreated: new Date(),
    ingredients: [],
    instructions: []
  };

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      name: ['', [Validators.required, notEmptyValidator()]],
      description: ['', [Validators.required, notEmptyValidator()]],
      ingredients: ['', [Validators.required, notEmptyValidator()]],
      instructions: ['']
    });

    this.currentRoute = this.checkRoute();
    if (this.currentRoute == 'add') {
      this.title = 'Create Recipe';
    } else if (this.currentRoute == 'edit') {
      this.title = 'Edit Recipe';
      this.loadRecipeForEdit();
    }
  }

  
  // Check on what page the user is in
  checkRoute(): string {
    let currentRoute = '';
    this.activatedRoute.url.subscribe(urlSegments => {
      if (urlSegments.length > 0 && urlSegments[0].path === 'add') {
        currentRoute = 'add';
      } else if (urlSegments.length > 0 && urlSegments[0].path === 'edit') {
        currentRoute = 'edit';
      }
    });
    return currentRoute;
  }

  loadRecipeForEdit(): void {
    const recipeId = this.activatedRoute.snapshot.params['id'];
    if (recipeId) {
      this.recipeService.getRecipeById(recipeId).subscribe(recipeData => {
        const formData = {
          ...recipeData,
          ingredients: recipeData.ingredients.join('\n'), // Convert the array of strings to a single string with new lines
          instructions: recipeData.instructions.join('\n')
        };
        this.recipeForm.patchValue(formData);
      });
    }
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      this.recipeService.markAllAsTouched(this.recipeForm);
      return;
    }

    const formattedRecipe = this.formatInputs();

    if (this.currentRoute == 'edit') {
      this.updateRecipe(formattedRecipe);
    } else if (this.currentRoute == 'add') {
      this.addRecipe(formattedRecipe);
    }
  }

  updateRecipe(updatedRecipe: Recipe): void {
    if (updatedRecipe) {
      updatedRecipe.id = this.activatedRoute.snapshot.params['id'];
      console.log(updatedRecipe);
      this.recipeService.updateRecipe(updatedRecipe).subscribe(() => this.recipeService.goBack());
      this.snackbarService.openSnackBar(updatedRecipe.name + ' was updated successfully');
    } else {
      // Handle the absence of a recipe
      console.error('No recipe found to update');
    }
  }

  addRecipe(newRecipe: Recipe): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Create Recipe',
        message: 'Do you confirm the data you input?',
        confirmButtonText: 'Confirm'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeService.addRecipe(newRecipe).subscribe(() => this.recipeService.goBack());
        this.snackbarService.openSnackBar(newRecipe.name + ' was created successfully');
      }
    });
  }

  formatInputs(): Recipe {
    let form = this.recipeForm.value;
    const capitalizePipe = new CapitalizeNamesPipe();
    const formattedName = capitalizePipe.transform(form.name.trim());
    const formattedDescription = this.recipeService.formatString(form.description);
    const formattedIngredients = this.recipeService.formatArrays(form.ingredients);
    const formattedInstructions = this.recipeService.formatArrays(form.instructions);
    
    // Return formatted recipe
    const newRecipe: Recipe = { 
      ...this.recipeForm.value, 
      name: formattedName,
      description: formattedDescription,
      dateCreated: new Date(),
      ingredients: formattedIngredients,
      instructions: formattedInstructions,
    };
    return newRecipe;
  }

  goBack(): void {
    this.recipeForm.reset();
    this.recipeService.goBack();
  }
}
