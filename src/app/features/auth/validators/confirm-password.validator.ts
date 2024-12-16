import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ConfirmPassword(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordField)?.value;
    const confirmPasswordControl = formGroup.get(confirmPasswordField);

    const currentErrors = confirmPasswordControl?.errors || {};

    if(password !== confirmPasswordControl?.value) {
      //add error on control
      confirmPasswordControl?.setErrors({ ...currentErrors, confirmPasswordMismatch: true });
    } else {
      //return other errors if exist
      const { confirmPasswordMismatch, ...otherErrors } = currentErrors;
      confirmPasswordControl?.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
    }

    //return no errors
    return null;
  };
}