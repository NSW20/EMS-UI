import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Designation } from './Designation-Components/designation/designation';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from './DialogClasses/logout-component/logout-component';
import { AuthService } from './Services/authService/auth-service';
import { MatTooltip } from "@angular/material/tooltip";
import { EmployeeService } from './Services/employeeService/employee-service';
import { UserModel } from './Models/UserModel';
import { UserDetailsDTO } from './Models/UserDetailsDTO';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeProfileDialog } from './DialogClasses/Employee-Profile-Dialog/employee-profile-dialog/employee-profile-dialog';
@Component({
  imports: [RouterOutlet, MatToolbarModule, MatTooltip,MatButtonModule, MatIconModule, MatDialogModule, RouterLink, MatTooltip],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App{
  private dialog:MatDialog=inject(MatDialog);
  private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
 authService:AuthService=inject(AuthService);
 private empService:EmployeeService=inject(EmployeeService);
  openLogout():void{
    this.dialog.open(LogoutComponent,{
      width:'400',
      data:''
    })
   
  }
employeeDetails!:employeeDTO;
   fetchEmployee():void{
     const userIdFetched:string|null=this.authService.getLoggedInUserID();
     console.log(userIdFetched);
    this.empService.getUserDetailsByUserId(userIdFetched).subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
              const user:UserDetailsDTO={
      userId:succ.data.id
    }
          this.empService.getAEmployee(user).subscribe({
            next:(succ)=>{
              if(succ.statusCode===200){
                console.log(this.employeeDetails)
               this.employeeDetails=succ.data;
               this.cdk.detectChanges();
              }
            },
            error:(err)=>{
              console.log('Some error occured while fetching details')
            }
          })
        }
      }
    })
   
   this.dialog.open(EmployeeProfileDialog,{
    width:'500px',
    data:this.employeeDetails
   })
  


  }
}
