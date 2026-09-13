import { Component,inject, OnDestroy, OnInit } from '@angular/core';
import { AttendanceService } from '../Services/attendance-service/attendance-service';
import { EmployeeService } from '../Services/employeeService/employee-service';
import { Subscription } from 'rxjs';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule,MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../Services/authService/auth-service';
import { UserDetailsDTO } from '../Models/UserDetailsDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { AttendanceChekoutDialog } from '../DialogClasses/attendance-dialog/attendance-chekout-dialog/attendance-chekout-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  imports: [MatTableModule,MatTooltipModule,MatProgressSpinnerModule,MatDialogModule,MatButtonModule,MatIconModule,CommonModule,MatSnackBarModule,MatChipsModule],
  selector: 'app-attendance-components',
  styleUrl: './attendance-components.css',
  templateUrl: './attendance-components.html',
})
export class AttendanceComponents implements OnInit {

  ngOnInit(): void {
    this.loadEmpName();
    this.loadAttendance();
  
  }
  private attendanceService:AttendanceService=inject(AttendanceService);
  private empService:EmployeeService=inject(EmployeeService);
  private subscription!:Subscription;
  private snack:MatSnackBar=inject(MatSnackBar);
  private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
  private auth:AuthService=inject(AuthService);
  private dialog=inject(MatDialog);
  loggedInUserId:string|null=null;
  attendanceDataSource:AttendaceDTO[]=[];
  tableColumns:string[]=['attendanceId','employeeId','date','checkIn','checkOut','status','Action']
  employeeId:number=0;

public findHoursBetweenCurrentAndChekinTime(
  checkin: string | null | undefined,
  date?: string | Date
): number {
  if (!checkin || !date) {
    console.warn("Check-in time or date is null");
    return 0;
  }

  // Current time
  const now = new Date();

  // Parse check-in string (assume "HH:mm:ss")
  const [hour, minutes, seconds] = checkin.split(":").map(Number);

  // Create a Date object for check-in with correct date
  const checkInDate = new Date(date);
  checkInDate.setHours(hour, minutes, seconds || 0, 0);

  // Difference in milliseconds
  const diffMs = now.getTime() - checkInDate.getTime();

  // Convert to hours (with decimals)
  const diffHours = diffMs / (1000 * 60 * 60);

  return Math.ceil(diffHours);
}

public hoursWorked:number=0;
  loadAttendance():void{
    const empId:string|null=null;

        const userModel:UserDetailsDTO={
          userId:this.loggedInUserID
    }
         this.empService.getAEmployee(userModel).subscribe({
          next:(succ)=>{
            if(succ.statusCode===200){
              this.employeeId=succ.data.employeeId;
             console.log(this.employeeId)
              this.subscription=this.attendanceService.getAllAttendance(this.employeeId).subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          this.attendanceDataSource=succ.data;
          console.log(this.employeeId);
          console.log(this.attendanceDataSource)
          this.cdk.detectChanges();
        }
      },
      error:(err)=>{
       this.snack.open('Some error occured while fetching the attendace details.','close',{duration:3000})
      }
    })
            }
          },
          error:(err)=>{
            console.log('error while fetching employee details.')
          }
         })
    
  }
 


  formateDate(newDate:string|null):string|null{
    if(!newDate) return null;
    const currentDate=new Date();
    const [year,month,date]=newDate.split('/').map(Number);
    currentDate.setDate(year-month-date);
    return currentDate.toString();
  }
  formatTime(time:string|null):Date|null{
    if(!time) return null;
    const [hours,minutes,seconds]=time.split(":").map(Number);
    const newDate=new Date();
    newDate.setHours(hours,minutes,seconds|0);
    return newDate;
  }
  loggedInUserID:string|null=this.auth.getLoggedInUserID();
  checkInSubmit():void{
    const todaysDate = new Date();
    console.log(todaysDate)
    const userModel:UserDetailsDTO={
          userId:this.loggedInUserID
    }
    this.subscription=this.empService.getAEmployee(userModel).subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          const attendace:AttendaceAddDTO={
            employeeId:succ.data.employeeId,
            date:todaysDate
          }
            this.subscription=this.attendanceService.applyAttendance(attendace).subscribe({
              next:(succ)=>{
                if(succ.statusCode==200){
                  if(succ.data===null){
                     this.snack.open('You have checked in Already.','close',{duration:3000})
                  }
                  else{
                    this.snack.open('Check in completed.','close',{duration:3000})
                  }
                     this.loadAttendance();
                }
              },
              error:(err)=>{
                 this.loadAttendance();
                 this.snack.open('Some error ouccured while check in.','close',{duration:3000})
              }
            })
        }
      },
      error:(err)=>{
          this.cdk.detectChanges();
                 this.snack.open('Some error ouccured while check in.','close',{duration:3000})
      }
    })
  }
 
  onCheckOut(element:AttendaceAddDTO):void{
    const dialogRef=this.dialog.open(AttendanceChekoutDialog,{
      width:'400',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.snack.open('Check out done successfully','close',{duration:3000})
        this.loadAttendance();
      }
    })
  }
    loadEmpName(){
     const user:UserDetailsDTO={
      userId:this.loggedInUserId
    }
    this.loggedInUserId=this.auth.getLoggedInUserID();
}
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}