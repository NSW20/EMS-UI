import { Component,inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../../Services/employeeService/employee-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pipe } from '@angular/core';
import { MatPseudoCheckbox, MatPseudoCheckboxModule } from '@angular/material/core';
@Component({
  imports: [MatDialogModule,CommonModule,MatPseudoCheckboxModule, MatCardModule,MatInputModule,MatFormFieldModule, MatButtonModule, MatIconModule, MatFormFieldModule],
  selector: 'app-employee-profile-dialog',
  styleUrl: './employee-profile-dialog.css',
  templateUrl: './employee-profile-dialog.html',
})
export class EmployeeProfileDialog implements OnInit {
  ngOnInit(): void {
    this.getStartingCharactersOfName();
  }
  private empService:EmployeeService=inject(EmployeeService);
  public data:employeeDTO=inject(MAT_DIALOG_DATA);
  private cdk:ChangeDetectorRef=inject (ChangeDetectorRef);
  profileIcon:string='';
  getStartingCharactersOfName():void{
    const startCharater=this.data.fullName.substring(0,1);
    const [firstname,lastname]=this.data.fullName.split(' ');
    const lastnameStartWith=lastname.substring(0,1)
    this.profileIcon=startCharater+lastnameStartWith;
    this.cdk.detectChanges();
  }

}
