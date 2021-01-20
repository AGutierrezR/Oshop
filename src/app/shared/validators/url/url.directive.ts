import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { urlValidator } from '@shared/validators/url/url.validator';

@Directive({
  selector: '[url]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UrlDirective,
      multi: true,
    },
  ],
})
export class UrlDirective implements Validators {
  validate(control: AbstractControl): ValidationErrors | null {
    return urlValidator()(control);
  }
}
