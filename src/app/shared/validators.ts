import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, map } from "rxjs";

export function equalToValidator(secondControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const second = control.parent?.get(secondControlName);
    if (!second)
      return null;
    return second.value === control.value ? null : { equalTo: true }
  }
}

export interface valueChecker {
  (value: any): Observable<boolean>
}

export function valueExistsValidator(checker: valueChecker): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return checker(control.value).pipe(
      map( isExists => isExists ? { valueExists: true } : null )
    );
  }
}