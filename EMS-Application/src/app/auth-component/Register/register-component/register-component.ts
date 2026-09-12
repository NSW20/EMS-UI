import { Component,inject,OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NonNullableFormBuilder } from '@angular/forms';
import { AuthService } from '../../../Services/authService/auth-service';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
@Component({
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,MatButtonModule,MatIconModule,RouterModule],
  selector: 'app-register-component',
  styleUrl: './register-component.css',
  templateUrl: './register-component.html',
})
export class RegisterComponent {
    private nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
    private authService:AuthService=inject(AuthService);
    private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
    private snack:MatSnackBar=inject(MatSnackBar);
    private route:Router=inject(Router);
    registerForm=this.nfb.group({
          name:this.nfb.control('',{validators:[Validators.required]}),
          username:this.nfb.control('',{validators:[Validators.required]}),
            role:this.nfb.control('',{validators:[Validators.required]}),
          email:this.nfb.control('',{validators:[Validators.required,Validators.email]}),
          phone:this.nfb.control('',{validators:[Validators.required,Validators.maxLength(12)]}),
          password:this.nfb.control('',{validators:[Validators.required,Validators.minLength(8)]}),
          confirmPassword:this.nfb.control('',{validators:[Validators.required,Validators.minLength(8)]}),
    })
    onSubmitRegister():void{
      console.log('register')
      if(this.registerForm.valid){
        const registerUser:Register={
          name:this.registerForm.value.name!,
          username:this.registerForm.value.username!,
          email:this.registerForm.value.email!,
          password:this.registerForm.value.password!,
          confirmPassword:this.registerForm.value.confirmPassword!,
          phone:this.registerForm.value.phone!,
          role:this.registerForm.value.role!
        };
        this.authService.registerUser(registerUser).subscribe({
          next:(succ)=>{
             if(succ.statusCode===200){
              this.snack.open('Registration done.','close',{duration:3000});
               this.route.navigate(['/login']);
              this.cdk.detectChanges();
             }
          }
        })
      }
    }
    resetForm():void{
      this.registerForm.reset();
    }
}
