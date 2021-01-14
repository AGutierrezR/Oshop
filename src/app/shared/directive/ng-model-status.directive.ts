import { Directive, HostBinding } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[ngModel]',
})
export class NgModelStatusDirective {
  constructor(public control: NgModel) {}

  @HostBinding('class.is-invalid') get invalid(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
