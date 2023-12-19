import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeCreateEditComponent } from './components/recipe-create-edit/recipe-create-edit.component';
import { FormatIngredientsPipe } from '../../shared/pipes/format-ingredients.pipe';
import { CapitalizeNamesPipe } from '../../shared/pipes/capitalize-names.pipe';
import { AutoExpandDirective } from '../../shared/directives/auto-expand.directive';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeMenuComponent } from './components/recipe-menu/recipe-menu.component';
import { RecipeRoutingModule } from './recipe-routing/recipe-routing.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeCreateEditComponent,
    RecipeMenuComponent,
    FormatIngredientsPipe,
    CapitalizeNamesPipe,
    AutoExpandDirective,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    RouterLink,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeCreateEditComponent,
    RecipeMenuComponent,
    RecipeRoutingModule,
    FormatIngredientsPipe,
    CapitalizeNamesPipe,
    AutoExpandDirective,
    ConfirmDialogComponent
  ]
})
export class RecipeModule { }
