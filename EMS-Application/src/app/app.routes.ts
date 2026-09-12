import { Routes } from '@angular/router';
import { Designation } from './Designation-Components/designation/designation';
import { DepartmentComponents } from './Department-Components/department-components/department-components';
import { RegisterComponent } from './auth-component/Register/register-component/register-component';
import { authGuardGuard } from './EMS_Auth_Gurd/auth-guard-guard';
import { LoginComponent } from './auth-component/Login/login-component/login-component';
import { ResetPassword } from './auth-component/ResetPassword/reset-password/reset-password';
import { ForgotPassword } from './auth-component/forgot-password/forgot-password';
import { LogoutComponent } from './DialogClasses/logout-component/logout-component';
import { EmployeeComponents } from './employee-components/employee-components';
import { AttendanceComponents } from './attendance-components/attendance-components';

export const routes: Routes = [
    {path:'designation',component:Designation,canActivate:[authGuardGuard],data:{role:'Admin'}},
    {path:'department',component:DepartmentComponents,canActivate:[authGuardGuard],data:{role:'Admin'}},
    {path:'employee',component:EmployeeComponents,canActivate:[authGuardGuard],data:{role:'Admin'}},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'',redirectTo:'register',pathMatch:'full'},
    {path:'resetpassword',component:ResetPassword},
     {path:'forgotpassword',component:ForgotPassword},
     {path:'logout',component:LogoutComponent},
     {path:'attendance',component:AttendanceComponents}
];
