import { Routes } from '@angular/router';
import { Designation } from './Designation-Components/designation/designation';
import { DepartmentComponents } from './Department-Components/department-components/department-components';

export const routes: Routes = [
    {path:'designation',component:Designation},
    {path:'department',component:DepartmentComponents},
    {path:'',redirectTo:'designation',pathMatch:'full'}
];
