import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const priceValid = value > min;

    return !priceValid ? { minPrice: true } : null;
  };
}
