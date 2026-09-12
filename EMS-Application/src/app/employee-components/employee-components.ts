import { Component,inject,OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employeeService/employee-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule,NonNullableFormBuilder } from '@angular/forms';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeAddDialog } from '../DialogClasses/employee-dialogs/employee-add/employee-add-dialog/employee-add-dialog';
import { EmployeeUpdateDialoge } from '../DialogClasses/employee-dialogs/employee-edit/employee-update-dialoge/employee-update-dialoge';
import { EmployeeRemoveDialog } from '../DialogClasses/employee-dialogs/employee-remove/employee-remove-dialog/employee-remove-dialog';
import { MatSelectModule } from '@angular/material/select';
import { DepartmentService } from '../Services/departmentService/department-service';
import { DesignationService } from '../Services/designation-service';
import { DesignationModel } from '../Models/designation_model';
@Component({
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule,
    MatFormFieldModule, MatInputModule,
    MatSelectModule, ReactiveFormsModule, MatDialogModule, MatTableModule],
  selector: 'app-employee-components',
  styleUrl: './employee-components.css',
  templateUrl: './employee-components.html',
})
export class EmployeeComponents implements OnInit {

   private empService:EmployeeService=inject(EmployeeService);
   private nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
   private matDialog:MatDialog=inject(MatDialog);
   private snackBar:MatSnackBar=inject(MatSnackBar);
   private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
  private deptService:DepartmentService=inject(DepartmentService);
  private designationService:DesignationService=inject(DesignationService);
  departments:DepartmentDTO[]=[];
  designations:DesignationModel[]=[]
   employeeColumns:string[]=['employeeId','fullName','email',
    'phone','dateOfJoining','departmentId','designationId','salary','status','userId','action']
   employeeData:employeeDTO[]=[];

      ngOnInit(): void {
     this.loadAllEmployee();
   }


   loadAllEmployee():void{
           this.empService.getAllEmployees().subscribe({
        next:(succ)=>{
          if(succ.statusCode===200){
            this.employeeData=succ.data;
            // this.snackBar.open('Employees have been fetched successfully','close',{duration:3000})
            this.cdk.detectChanges();
          }
        },
        error:(err)=>{
          this.snackBar.open('Some error occured','close',{duration:3000})
        },
        complete:()=>{
          console.log('Employee observable has been executed')
        }
      })
   }

   onEmployeeAddDialog():void{
    const dialogRef=this.matDialog.open(EmployeeAddDialog,{
      width:'400',
      data:{}
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.loadAllEmployee();
        this.snackBar.open('Employee has been added successfully','close',{duration:3000})
      }
    })
   }
   
   onEmployeeEditDialog(element:employeeDTO):void{
    const dialogRef=this.matDialog.open(EmployeeUpdateDialoge,{
      width:'400',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.loadAllEmployee();
        this.snackBar.open('Employee has been updated successfully','close',{duration:3000})
      }
    })
   }
   
   onEmployeeRemoveDialog(element:employeeDTO):void{
    const dialogRef=this.matDialog.open(EmployeeRemoveDialog,{
      width:'400',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.loadAllEmployee();
        this.snackBar.open('Employee has been updated successfully','close',{duration:3000})
      }
    })
   }
   

}
