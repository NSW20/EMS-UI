import { ChangeDetectorRef, Component,inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceService } from '../../../Services/attendance-service/attendance-service';
import { EmployeeService } from '../../../Services/employeeService/employee-service';
import { AuthService } from '../../../Services/authService/auth-service';
import { UserDetailsDTO } from '../../../Models/UserDetailsDTO';
@Component({
  imports: [MatDialogModule,MatButtonModule,MatIconModule,MatSnackBarModule,],
  selector: 'app-attendance-chekout-dialog',
  styleUrl: './attendance-chekout-dialog.css',
  templateUrl: './attendance-chekout-dialog.html',
})
export class AttendanceChekoutDialog implements OnInit{
  private data:AttendaceDTO=inject(MAT_DIALOG_DATA);
  private attendanceService:AttendanceService=inject(AttendanceService);
  private employeeService:EmployeeService=inject(EmployeeService);
  private auth:AuthService=inject(AuthService);
  private dialogRef:MatDialogRef<AttendanceChekoutDialog>=inject(MatDialogRef<AttendanceChekoutDialog>);
  private snack:MatSnackBar=inject(MatSnackBar);
  private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
  loggedInUserId=this.auth.getLoggedInUserID();
  public empName:string|null=null;

  ngOnInit(): void {
   this.loadEmpName();
  }
  loadEmpName(){
     const user:UserDetailsDTO={
      userId:this.loggedInUserId
    }
    this.employeeService.getAEmployee(user).subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          this.empName=succ.data.fullName;
          this.cdk.detectChanges();
        }
      }
    })
  }
  checkOutSubmit():void{
    const user:UserDetailsDTO={
      userId:this.loggedInUserId
    }
    this.employeeService.getAEmployee(user).subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          const now=new Date();
          const time=now.toLocaleTimeString('en-GB', { hour12: false });
          console.log(time)
       const attendanceUpdate:AttendaceDTO={
            attendanceId:this.data.attendanceId,
            employeeId:this.data.employeeId,
            checkIn:this.data.checkIn,
            checkOut:time,
            status:this.data.status,
            date:this.data.date
          }
          this.attendanceService.chekoutAttendance(attendanceUpdate,attendanceUpdate.attendanceId).subscribe({
            next:(succ)=>{
              if(succ.statusCode===200){
               this.dialogRef.close(true);
              }
            },
            error:(err)=>{
              this.snack.open('Some error occured while checking out. Pls try again later','close',{duration:3000})
            }
          })
        }
      },
        error:(err)=>{
              this.snack.open('Some error occured while checking out. Pls try again later','close',{duration:3000})
            }
    })
  }
}
