import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value > 0 ? null : { notPositive: true };
  };
}