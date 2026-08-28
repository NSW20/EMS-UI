import { Component,inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../Services/authService/auth-service';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBarModule,MatSnackBar } from '@angular/material/snack-bar';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@Component({
  imports: [MatButtonModule,MatIconModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatCardModule],
  selector: 'app-reset-password',
  styleUrl: './reset-password.css',
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  private authService:AuthService=inject(AuthService);
  private snackBar:MatSnackBar=inject(MatSnackBar);
  private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
  private nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
  private route:Router=inject(Router);
  resetPassword=this.nfb.group({
    email:this.nfb.control('',{validators:[Validators.required,Validators.email]}),
      confirmPassword:this.nfb.control('',{validators:[Validators.required,Validators.minLength(8)]}),
        newPassword:this.nfb.control('',{validators:[Validators.required,Validators.minLength(8)]}),
  })
  onResetSubmit():void{
    if(this.resetPassword.valid){
      const resetToken=localStorage.getItem('resetpassword');
      const resetModel:ResetPasswordModel={
         email:this.resetPassword.value.email!,
         newPassword:this.resetPassword.value.newPassword!,
         confirmPassword:this.resetPassword.value.confirmPassword!,
         token:resetToken!
      }
      console.log(resetModel)
          this.authService.resetPassword(resetModel).subscribe({
            next:(succ)=>{
             if(succ.statusCode===200){
              this.snackBar.open('Password has been changed successfully','close',{duration:3000});
              this.route.navigate(['/login']);
             }
            },
            error:(err)=>{
                this.snackBar.open('Some error occured.please try again later','close',{duration:3000});
                this.cdk.detectChanges();
            }
          })
    }
  }
  onResetForm():void{
    this.resetPassword.reset();
  }

}
