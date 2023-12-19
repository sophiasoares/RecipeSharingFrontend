import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from '../components/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from '../components/recipe-details/recipe-details.component';
import { RecipeCreateEditComponent } from '../components/recipe-create-edit/recipe-create-edit.component';
import { RecipeMenuComponent } from '../components/recipe-menu/recipe-menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipeMenuComponent,
    children: [
      { path: '', component: RecipeListComponent, pathMatch: 'full' },
    ]
  },
  { path: 'add', component: RecipeCreateEditComponent },
  { path: 'detail/:id', component: RecipeDetailsComponent },
  { path: 'edit/:id', component: RecipeCreateEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
