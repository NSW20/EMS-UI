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
@Component({
  imports: [RouterOutlet, MatToolbarModule, MatTooltip,MatButtonModule, MatIconModule, MatDialogModule, RouterLink, MatTooltip],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App{
  private dialog:MatDialog=inject(MatDialog);
 authService:AuthService=inject(AuthService);
  openLogout():void{
    this.dialog.open(LogoutComponent,{
      width:'400',
      data:''
    })
   
  }
   
}
