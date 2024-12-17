import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  //urld to exclude
  const excludeUrls: string[] = ['/auth/register', '/auth/login'];
  const isExcluded = excludeUrls.some((url) => req.url.includes(url));

  if (!isExcluded) {
    //get token form local storage
    const token: string | null = localStorage.getItem('jwt');

    if (token) {
      //clone and add auth header
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
  return next(req);
};
