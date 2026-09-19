import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeService } from '../../../Services/employeeService/employee-service';
import { LeaveService } from '../../../Services/leaveService/leave-service';
import { AuthService } from '../../../Services/authService/auth-service';

@Component({
  imports: [ReactiveFormsModule, MatDatepickerModule,MatSelectModule, MatButtonModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule, CommonModule],

  selector: 'app-leave-edit-dialog',
  styleUrl: './leave-edit-dialog.css',
  templateUrl: './leave-edit-dialog.html',
})
export class LeaveEditDialog {
    private data:leaveDTO=inject(MAT_DIALOG_DATA);
  private dialogRef:MatDialogRef<LeaveEditDialog>=inject(MatDialogRef<LeaveEditDialog>)
  private empService:EmployeeService=inject(EmployeeService);
  private leaveService:LeaveService=inject(LeaveService);
  private nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
  private authService:AuthService=inject(AuthService);
  userId=this.authService.getLoggedInUserID();
  empId:number=0;
  empDetails!:employeeDTO;
  leaveUpdateForm=this.nfb.group({
    leaveId:this.nfb.control(this.data.leaveId),
    employeeId:this.nfb.control(this.data.employeeId),
    fromDate:this.nfb.control(this.data.fromDate),
    toDate:this.nfb.control(this.data.toDate),
    reason:this.nfb.control(this.data.reason),
    leaveType:this.nfb.control(this.data.leaveType),
    status:this.nfb.control(this.data.status),
    approvedBy:this.nfb.control(this.data.approvedBy)
  })
  
 leaveType:string[]=['Sick','Casual','Earned']

 editLeave():void{
  const leave:leaveDTO={
    leaveId:this.leaveUpdateForm.get('leaveId')?.value!,
    employeeId:this.leaveUpdateForm.get('employeeId')?.value!,
    fromDate:new Date(this.leaveUpdateForm.get('fromDate')?.value!),
    toDate:new Date(this.leaveUpdateForm.get('toDate')?.value!),
    reason:this.leaveUpdateForm.get('reason')?.value!,
    leaveType:this.leaveUpdateForm.get('leaveType')?.value!,
    status:this.leaveUpdateForm.get('status')?.value!,
    approvedBy:this.leaveUpdateForm.get('approvedBy')?.value!
  }
  this.leaveService.editAppliedLeave(leave,leave.leaveId).subscribe({
    next:(succ)=>{
      if(succ.statusCode===200){
        this.dialogRef.close(true);
      }
    },
    error:(err)=>{
     console.log('error occured while updating leave');
     this.dialogRef.close(true);
    },
    complete:()=>{
      console.log('Observable executed')
    }
    
  })
 }
}
