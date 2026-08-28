import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../Services/authService/auth-service';
import { inject } from '@angular/core';
export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthService);
  const token=localStorage.getItem('authToken');
  const fetchRole=auth.getUserRole();
  const router=inject(Router);
  if(!token)return false;
  const requiredRole=route.data['role'];
  if(requiredRole &&requiredRole!==fetchRole){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
