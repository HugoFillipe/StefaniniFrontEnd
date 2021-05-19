import { Component, Host, SkipSelf, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.css']
})
export class FieldErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'Campo obrigatório',
    'minlength': (params) => 'O número mínimo de caracteres é ' + params.requiredLength,
    'maxlength': (params) => 'O número máximo permitido de caracteres é ' + params.requiredLength,
    'pattern': (params) => 'Campo obrigatório',
    'min': (params) => 'O valor mínimo é ' + params.min.toString().replace('.',','),
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  constructor(
    @Host() @SkipSelf() private form: FormGroupDirective,
  ) { }

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched || this.form.submitted);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return FieldErrorsComponent.errorMessages[type](params);
  }

}
