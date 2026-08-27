import { Routes } from '@angular/router';
import { Designation } from './Designation-Components/designation/designation';
import { DepartmentComponents } from './Department-Components/department-components/department-components';
import { RegisterComponent } from './auth-component/Register/register-component/register-component';

export const routes: Routes = [
    {path:'designation',component:Designation},
    {path:'department',component:DepartmentComponents},
    {path:'register',component:RegisterComponent},
    {path:'',redirectTo:'designation',pathMatch:'full'}
];
