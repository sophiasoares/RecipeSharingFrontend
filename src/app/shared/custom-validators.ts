import { AbstractControl, ValidatorFn } from '@angular/forms';

export function notEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isNotEmpty = (control.value || '').trim().length > 0;
    return isNotEmpty ? null : {'notEmpty': {value: control.value}};
  };
}
