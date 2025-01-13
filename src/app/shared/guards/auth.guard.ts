import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route,
  state,
): boolean | Observable<boolean> | Promise<boolean> => {
  const token = localStorage.getItem('jwt');
  const router = inject(Router);
  //check if token is expired
  if (token) {
    const decodedToken: any = jwt_decode.jwtDecode(token);
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();
    if (isTokenExpired) {
      //logout user
      localStorage.removeItem('jwt');
      router.navigateByUrl('auth/login');
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
