import { Component,inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../../../Services/employeeService/employee-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
@Component({
  imports: [MatDialogModule,MatButtonModule,MatIconModule],
  selector: 'app-employee-remove-dialog',
  styleUrl: './employee-remove-dialog.css',
  templateUrl: './employee-remove-dialog.html',
})
export class EmployeeRemoveDialog {
  private empService:EmployeeService=inject(EmployeeService);
  private data:employeeDTO=inject(MAT_DIALOG_DATA);
  private dialogRef:MatDialogRef<EmployeeRemoveDialog>=inject(MatDialogRef<EmployeeRemoveDialog>)
 private subscription!:Subscription;
 public employeeName:string=this.data.fullName
  removeEmployee():void{
    this.subscription=this.empService.removeEmployee(this.data.employeeId).subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          this.dialogRef.close(true)
        }
      },
      error:(err)=>{
        console.log('some error occured while removing employee')
      }
    })
  }
  onCancel():void{
    this.dialogRef.close(true);
  }
}
