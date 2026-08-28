import { Component,inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCardActions } from "@angular/material/card";
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../Services/authService/auth-service';
@Component({
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCardActions],
  selector: 'app-logout-component',
  styleUrl: './logout-component.css',
  templateUrl: './logout-component.html',
})
export class LogoutComponent {
  private dialogRef:MatDialogRef<LogoutComponent>=inject(MatDialogRef<LogoutComponent>);
  private snack:MatSnackBar=inject(MatSnackBar);
  private route:Router=inject(Router);
  private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
  private auth:AuthService=inject(AuthService)
  onSubmit():void{
     this.auth.setToken(null);
    this.snack.open('Logged out..','close',{duration:3000})
    this.route.navigate(['/login']);
    this.dialogRef.close(true);
    this.cdk.detectChanges();
  }
  OnCancel():void{
    this.dialogRef.close(true);
  }
}

