import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export function storageExistsValidator(
  http: HttpClient,
): (control: AbstractControl) => Observable<ValidationErrors | null> {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (control.value.length > 0) {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap(() =>
          http
            .get<boolean>(
              `${environment.API_BASE_URL}transactions/validate-storage?name=${control.value}`,
            )
            .pipe(
              map((exists) => (exists ? null : { notExists: true })),
              catchError(() => of(null)),
            ),
        ),
      ); 
    } else {
      return of(null);
    }
  };
}
