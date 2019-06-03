import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static patternValidator(regex: RegExp, errorName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const result = regex.test(control.value.trim());
      return result ? null : JSON.parse(`{ "${errorName}": { "value": true } }`);
    };
  }
}