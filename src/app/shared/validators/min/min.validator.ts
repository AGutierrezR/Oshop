import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return !(control.value > min) ? { min: true } : null;
  };
}
