import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatIngredients'
})
export class FormatIngredientsPipe implements PipeTransform {

  transform(ingredients: string[]): string {
    if (!ingredients || ingredients.length === 0) {
      return '';
    }
    
    if (ingredients.length === 1) {
      return ingredients[0];
    }
    
    const last = ingredients[ingredients.length - 1];
    const rest = ingredients.slice(0, -1);
    return `${rest.join(', ')} and ${last}`;
  }
}
