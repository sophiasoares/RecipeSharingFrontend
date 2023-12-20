import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Recipe } from '../models/recipe';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  filteredRecipes: Recipe[] = [];
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  private recipesUrl = 'http://localhost:8080';  // URL to web api

  constructor(private http: HttpClient) { }

  // Fetch all recipes
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.recipesUrl}/recipes/all`)
      .pipe(
        tap(_ => console.log('fetched recipes')),
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }

  // Fetch recipe by id 
  getRecipeById(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/recipes/find/${id}`;
    return this.http.get<Recipe>(url).pipe(
      tap(_ => console.log(`fetched recipe id=${id}`)),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  // Add a new recipe 
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.recipesUrl}/recipes/add`, recipe, this.httpOptions).pipe(
      tap((newRecipe: Recipe) => console.log(`added recipe w/ id=${newRecipe.id}`)),
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  // Update the recipe on the server
  updateRecipe(recipe: Recipe): Observable<any> {
    const url = `${this.recipesUrl}/recipes/edit`;
    return this.http.put(url, recipe, this.httpOptions).pipe(
      tap(_ => console.log(`updated recipe id=${recipe.id}`)),
      catchError(this.handleError<any>('updateRecipe'))
    );
  }

  // Delete the recipe from the server
  deleteRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/recipes/delete/${id}`;
    return this.http.delete<Recipe>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted recipe id=${id}`)),
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Go back to the previous page
  goBack(): void {
    window.history.back();
  }

  // Utility method to mark all form controls as touched
  markAllAsTouched(group: FormGroup): void {
    Object.keys(group.controls).forEach(field => {
      const control = group.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }

  // Utility method to separate lines
  // Convert a string to an array of strings. Also trim each line.
  formatArrays(value: string): string[] {
    const result: string[] = [];
    value.split('\n').forEach(element => {
      let trimmedElement = element.trim().replace(/,\s*$/, ''); // Remove trailing commas and whitespace
      trimmedElement = trimmedElement.charAt(0).toUpperCase() + trimmedElement.slice(1);
      if (trimmedElement !== '') { // Check if it's not an empty string
        result.push(trimmedElement);
      }
    });
    return result;
  }

  formatString(value: string): string {
    const trimmedValue = value.trim().replace(/,\s*$/, ''); // Remove trailing commas and whitespace
    return trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
  }

}
