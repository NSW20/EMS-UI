import { Component,inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../Services/authService/auth-service';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatButtonModule,MatIconModule,MatCardModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  selector: 'app-forgot-password',
  styleUrl: './forgot-password.css',
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
   private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
   private authService:AuthService=inject(AuthService);
   private snack:MatSnackBar=inject(MatSnackBar);
   private nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
   private route:Router=inject(Router);
   forgotPassWordForm=this.nfb.group({
    email:this.nfb.control('',{validators:[Validators.required,Validators.email]})
   });
  onSubmitResetForm():void{
    this.forgotPassWordForm.reset();
  }
   onSubmitForgotPassword():void{
    if(this.forgotPassWordForm.valid){
      const resetPasswordModel:ForgotPasswordModel={
        email:this.forgotPassWordForm.value.email!
      }
      this.authService.forgotPassword(resetPasswordModel).subscribe({
        next:(succ)=>{
          if(succ.statusCode===200){
            this.snack.open('Password reset request has been raised','close',{duration:3000});
            localStorage.setItem('resetpassword',succ.data);
            this.route.navigate(['/resetpassword']);
          }
        },
        error:(err)=>{
          this.snack.open('Password reset request failed.','close',{duration:3000});
        }
      })
    }
   }
}
