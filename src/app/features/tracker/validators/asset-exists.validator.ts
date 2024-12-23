import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export function assetExistsValidator(
  http: HttpClient,
): (control: AbstractControl) => Observable<ValidationErrors | null> {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      debounceTime(300),
      switchMap(() =>
        http
          .get<boolean>(
            `${environment.API_BASE_URL}integrations/validate-asset?ticker=${control.value}`,
          )
          .pipe(
            map((exists) => (exists ? null : { notExists: true })),
            catchError(() => of(null)),
          ),
      ),
    );
  };
}
