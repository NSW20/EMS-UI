import { Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { RouterModule, RouterLink,Route, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../Services/authService/auth-service';
import { MatCardModule } from "@angular/material/card";
import { CdkAriaLive } from "../../../../../node_modules/@angular/cdk/types/_a11y-module-chunk";


@Component({
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCardModule, RouterLink],
  selector: 'app-login-component',
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent{
  private cdk: ChangeDetectorRef = inject(ChangeDetectorRef);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private authService: AuthService = inject(AuthService);
  private nfb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private route:Router=inject(Router);
  loginForm = this.nfb.group({
    email: this.nfb.control('', { validators: [Validators.required, Validators.email] }),
    password: this.nfb.control('', { validators: [Validators.required, Validators.minLength(8)] }),
  });
  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      const loginModel: Login = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };
      this.authService.loginUser(loginModel).subscribe({
        next: (succ) => {
          if (succ.statusCode === 200) {
           this.authService.setToken(succ.data);
              this.snackBar.open('Login Succeeded','close',{duration:3000});
            this.route.navigate(['/department']);
          }
        },
        error: (err) => {
          console.log(err)
          this.snackBar.open('Invalid email or password','close',{duration:3000});
          this.cdk.detectChanges();
        },
        complete: () => {
          console.log('Login observable executed..');
        },
      });
    }
  }
  resetForm(): void {
    this.loginForm.reset();
  }

}
