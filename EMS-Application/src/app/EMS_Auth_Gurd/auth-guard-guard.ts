import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../Services/authService/auth-service';
import { inject } from '@angular/core';
export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthService);
  const token=localStorage.getItem('authToken');
  const fetchRole:string|null=auth.getUserRole();
  const router=inject(Router);
  if(!token){
    router.navigate(['/login']);
     return false;
  }
  // const requiredRole:string[]=route.data['role'];
  // if(requiredRole&&fetchRole &&requiredRole.includes(fetchRole)){
  //   router.navigate(['/login']);
  //   return false;
  // }
  return true;
};
