import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem('authToken');
  if(token){
     const requestClone=req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
     });
     return next(requestClone);
  }
  return next(req);
};
