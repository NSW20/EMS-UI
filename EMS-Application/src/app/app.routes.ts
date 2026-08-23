import { Routes } from '@angular/router';
import { Designation } from './Designation-Components/designation/designation';

export const routes: Routes = [
    {path:'designation',component:Designation},
    {path:'',redirectTo:'designation',pathMatch:'full'}
];
