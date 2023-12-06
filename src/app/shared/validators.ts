import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function equalToValidator(secondControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const second = control.parent?.get(secondControlName);
    if (!second)
      return null;
    return second.value === control.value ? null : { equalTo: true }
  }
}
