import { CommonModule } from '@angular/common';
import { Component,inject, OnInit } from '@angular/core';
import { ReactiveFormsModule,NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmployeeService } from '../../../Services/employeeService/employee-service';
import { LeaveService } from '../../../Services/leaveService/leave-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../Services/authService/auth-service';
import { UserDetailsDTO } from '../../../Models/UserDetailsDTO';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';
@Component({
  imports: [ReactiveFormsModule, MatDatepickerModule,MatSelectModule, MatDatepicker, MatButtonModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule, CommonModule, MatSelect],
  selector: 'app-leave-apply-dialog',
  styleUrl: './leave-apply-dialog.css',
  templateUrl: './leave-apply-dialog.html',
})
export class LeaveApplyDialog implements OnInit{
  ngOnInit(): void {
  this.setLeaveForm()
  }
  private data:leaveDTO=inject(MAT_DIALOG_DATA);
  private dialogRef:MatDialogRef<LeaveApplyDialog>=inject(MatDialogRef<LeaveApplyDialog>)
  private empService:EmployeeService=inject(EmployeeService);
  private leaveService:LeaveService=inject(LeaveService);
  private nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
  private authService:AuthService=inject(AuthService);
  userId=this.authService.getLoggedInUserID();
  empId:number=0;
  empDetails!:employeeDTO;
  leaveForm=this.nfb.group({
    employeeId:this.nfb.control(0),
    fromDate:this.nfb.control('',{validators:[Validators.required]}),
    toDate:this.nfb.control('',{validators:[Validators.required]}),
    reason:this.nfb.control(''),
    leaveType:this.nfb.control(0),
    status:this.nfb.control(0,{validators:[Validators.required]}),
    approvedBy:this.nfb.control('')
  })
  setLeaveForm():void{
    const user:UserDetailsDTO={
      userId:this.userId
  }
  console.log(user)
  this.empService.getAEmployee(user).subscribe({
    next:(succ)=>{
      if(succ.statusCode===200){
      this.leaveForm.patchValue({
        employeeId:succ.data.employeeId!,
        status:0
      })
      }
    },
    error:(err)=>{
      console.log('error occured while fetching employee details')
    }
  })
  }

 applyLeave():void{
  const leave:leaveAddDTO={
    employeeId:this.leaveForm.get('employeeId')?.value!,
    fromDate:new Date(this.leaveForm.get('fromDate')?.value!),
    toDate:new Date(this.leaveForm.get('toDate')?.value!),
    reason:this.leaveForm.get('reason')?.value!,
    leaveType:this.leaveForm.get('leaveType')?.value!,
    status:this.leaveForm.get('status')?.value!,
    approvedBy:this.leaveForm.get('approvedBy')?.value!
  }
  this.leaveService.applyLeave(leave).subscribe({
    next:(succ)=>{
      if(succ.statusCode===200){
        this.dialogRef.close(true);
      }
    },
    error:(err)=>{
      console.log('some error occured while applying leave');
    }
  })
 }

 leaveType:string[]=['Sick','Casual','Earned']
  
}
