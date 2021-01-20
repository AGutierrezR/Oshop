import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { minValidator } from '@shared/validators/min/min.validator';

@Directive({
  selector: '[min]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinDirective,
      multi: true,
    },
  ],
})
export class MinDirective implements Validators {
  @Input() min: number;

  validate(control: AbstractControl): ValidationErrors | null {
    return minValidator(this.min)(control);
  }
}
