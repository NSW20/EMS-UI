import { Component,inject, OnDestroy, OnInit } from '@angular/core';
import { AttendanceService } from '../Services/attendance-service/attendance-service';
import { EmployeeService } from '../Services/employeeService/employee-service';
import { Subscription } from 'rxjs';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule,MatSnackBar } from '@angular/material/snack-bar';
import { APIResponseWrapper } from '../Models/designation_model';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Pipe } from '@angular/core';
import { AuthService } from '../Services/authService/auth-service';
import { UserDetailsDTO } from '../Models/UserDetailsDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { AttendanceChekoutDialog } from '../DialogClasses/attendance-dialog/attendance-chekout-dialog/attendance-chekout-dialog';
@Component({
  imports: [MatTableModule,MatProgressSpinnerModule,MatDialogModule,MatButtonModule,MatIconModule,CommonModule,MatSnackBarModule,MatChipsModule],
  selector: 'app-attendance-components',
  styleUrl: './attendance-components.css',
  templateUrl: './attendance-components.html',
})
export class AttendanceComponents implements OnInit,OnDestroy {

  ngOnInit(): void {
    this.loadAttendance();
  }
  private attendanceService:AttendanceService=inject(AttendanceService);
  private empService:EmployeeService=inject(EmployeeService);
  private subscription!:Subscription;
  private snack:MatSnackBar=inject(MatSnackBar);
  private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
  private auth:AuthService=inject(AuthService);
  private dialog=inject(MatDialog);

  attendanceDataSource:AttendaceDTO[]=[];
  tableColumns:string[]=['attendanceId','employeeId','date','checkIn','checkOut','status','Action']

  loadAttendance():void{
    this.subscription=this.attendanceService.getAllAttendance().subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          this.attendanceDataSource=succ.data;
          this.cdk.detectChanges();
        }
      },
      error:(err)=>{
       this.snack.open('Some error occured while fetching the attendace details.','close',{duration:3000})
      }
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    const userModel:UserDetailsDTO={
          userId:this.loggedInUserID
    }
    this.empService.getAEmployee(userModel).subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          const attendace:AttendaceAddDTO={
            employeeId:succ.data.employeeId
          }
            this.attendanceService.applyAttendance(attendace).subscribe({
              next:(succ)=>{
                if(succ.statusCode==200){
                    this.loadAttendance();
                     this.snack.open('Check in completed.','close',{duration:3000})
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
}
