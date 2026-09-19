import { ChangeDetectorRef, Component,inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule,MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { LeaveService } from '../../Services/leaveService/leave-service';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../Services/employeeService/employee-service';
import { LeaveApplyDialog } from '../../DialogClasses/Leave-Dialogs/leave-apply-dialog/leave-apply-dialog';
import { LeaveEditDialog } from '../../DialogClasses/Leave-Dialogs/leave-edit-dialog/leave-edit-dialog';
import { LeaveRemoveDialog } from '../../DialogClasses/Leave-Dialogs/leave-remove-dialog/leave-remove-dialog';
@Component({
  imports: [MatButtonModule,CommonModule, MatIconModule, MatDialogModule, MatSnackBarModule, MatCardModule, MatTableModule, MatInputModule],
  selector: 'app-leave-component',
  styleUrl: './leave-component.css',
  templateUrl: './leave-component.html',
})
export class LeaveComponent implements OnInit{
  private leaveService:LeaveService=inject(LeaveService);
  private snack:MatSnackBar=inject(MatSnackBar);
  private dialog:MatDialog=inject(MatDialog);
  private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
  private empService:EmployeeService=inject(EmployeeService);
  allLeaves:leaveDTO[]=[];
  allemployees:employeeDTO[]=[];
  leaveStatusSetInUI:string='';
  ngOnInit(): void {
    this.loadAllLeaves();
  }
  loadAllLeaves():void{
    this.leaveService.getAllLeaves().subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          this.allLeaves=succ.data;
          this.cdk.detectChanges();
        }
      },
      error:(err)=>{
       this.snack.open('Something went wrong while fetching the leaves','close',{duration:3000})
      }
    })
  }

  loadLeaveStatus(leavesStatus:string):string{
    console.log('getLeaveStatus')
     console.log(leavesStatus)
    if(Number(leavesStatus)===1){
        console.log('getLeaveStatus1')
      return 'Approved'
    }
    else if(Number(leavesStatus)===2){
      return  'Rejected'
    }
    else{
        console.log('getLeaveStatusP')
        return  'Pending'
    }
  }

    loadLeaveType(leaveType:string):string{
    if(Number(leaveType)===1){
        console.log('getLeaveStatus1')
      return 'Casual Leave'
    }
    else if(Number(leaveType)===2){
      return  'Earned Leave'
    }
    else{
        return  'Sick Leave'
    }
  }
  displayColumns:string[]=['employeeId','fromDate','toDate','reason','leaveType','status','approvedBy','Action'];

  applyLeaveMethod():void{
     const dialogRef=this.dialog.open(LeaveApplyDialog,{
      width:'300',
      data:''
     })
  dialogRef.afterClosed().subscribe(result=>{
    if(result){
      this.loadAllLeaves();
    }
  })
  }

  editLeave(leave:leaveDTO):void{
     const dialogRef=this.dialog.open(LeaveEditDialog,{
      width:'400',
      data:leave
     })
     dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.loadAllLeaves();
        this.snack.open('Leaves updated successfully','close',{duration:3000})
      }
     })
    }


     removeLeave(leave:leaveDTO):void{
     const dialogRef=this.dialog.open(LeaveRemoveDialog,{
      width:'400',
      data:leave
     })
     dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.loadAllLeaves();
        this.snack.open('Leaves removed successfully','close',{duration:3000})
      }
     })
    }
  }
    
  

