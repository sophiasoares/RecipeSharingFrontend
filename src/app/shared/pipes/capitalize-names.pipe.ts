import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeNames'
})
export class CapitalizeNamesPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value; // Return the input value if it's null or undefined

    const words = value.split(' '); // Split the input value into words
    const capitalizedWords = words.map(word => {
      if (word.length > 1) {
        // Capitalize the first letter and convert the rest to lowercase
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        // Handle single-letter words (e.g., "a", "I") without changing them
        return word.toUpperCase();
      }
    });

    return capitalizedWords.join(' '); // Join the words back into a string
  }
}
