import { Component,inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule,NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../../../../Services/departmentService/department-service';
import { DesignationService } from '../../../../Services/designation-service';
import { DesignationModel } from '../../../../Models/designation_model';
import { Subscription } from 'rxjs';
import { UserModel } from '../../../../Models/UserModel';
import { EmployeeService } from '../../../../Services/employeeService/employee-service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  imports: [MatButtonModule,MatIconModule,MatSnackBarModule,MatDialogModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,
    MatIconModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule
  ],
  selector: 'app-employee-update-dialoge',
  styleUrl: './employee-update-dialoge.css',
  templateUrl: './employee-update-dialoge.html',
})
export class EmployeeUpdateDialoge implements OnInit,OnDestroy{

   ngOnInit(): void {
     this.loadAllDepartment();
     this.loadAllDesignation();
     this.loadAllUsers();
   }
   private subscription!:Subscription;
   dialogRef:MatDialogRef<EmployeeUpdateDialoge>=inject(MatDialogRef<EmployeeUpdateDialoge>)
   dialogData:employeeDTO=inject(MAT_DIALOG_DATA);
   nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
   departmentService=inject(DepartmentService);
   designationService=inject(DesignationService)
   employeeService=inject(EmployeeService);
   departmentList:DepartmentDTO[]=[];
   designationList:DesignationModel[]=[];
   usersList:UserModel[]=[];
   editEmployeeForm=this.nfb.group({
    employeeId:this.nfb.control(this.dialogData.employeeId,{validators:[Validators.required]}),
    fullName: this.nfb.control(this.dialogData.fullName, { validators: [Validators.required] }),
    email: this.nfb.control(this.dialogData.email, { validators: [Validators.required, Validators.email] }),
    phone: this.nfb.control(this.dialogData.phone, { validators: [Validators.required] }),
    dateOfJoining: this.nfb.control(this.dialogData.dateOfJoining, { validators: [Validators.required] }),
    departmentId: this.nfb.control(this.dialogData.departmentId, { validators: [Validators.required] }),
    designationId: this.nfb.control(this.dialogData.designationId, { validators: [Validators.required] }),
    salary: this.nfb.control(this.dialogData.salary, { validators: [Validators.required] }),
    status: this.nfb.control(this.dialogData.status, { validators: [Validators.required] }),
    userId: this.nfb.control(this.dialogData.userId),
   })
   loadAllDepartment():void{
    this.subscription=this.departmentService.getAllDepartment().subscribe({
      next:(succ)=>{
         if(succ.statusCode===200){
          this.departmentList=succ.data;
         }
      },
      error:(err)=>{
        console.log('error while fetching deparments.')
      }
    })
   }

   loadAllDesignation():void{
    this.subscription=this.designationService.GetAllDesignations().subscribe({
      next:(succ)=>{
         if(succ.statusCode===200){
          this.designationList=succ.data;
         }
      },
      error:(err)=>{
        console.log('error while fetching designation.')
      }
    })
   }
   loadAllUsers():void{
    this.subscription=this.employeeService.getAllUsers().subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          this.usersList=succ.data;
        }
      },
      error:(err)=>{
        console.log('some error occured while fetching users');
      }
    })
   }
   

  employeeStatus: string[] = ['Active', 'Inactive', 'OnProbation', 'Resigned', 'Terminated'];

  cancelEdit():void{
    this.editEmployeeForm.reset();
  }

  updateEmployeeSubmit():void{
    if(this.editEmployeeForm.valid){
      const data:employeeDTO={
        employeeId:Number(this.editEmployeeForm.value.employeeId!),
        dateOfJoining:this.editEmployeeForm.value.dateOfJoining!,
        salary:this.editEmployeeForm.value.salary!,
        userId:this.editEmployeeForm.value.userId!,
        fullName:this.editEmployeeForm.value.fullName!,
        departmentId:this.editEmployeeForm.value.departmentId!,
        designationId:this.editEmployeeForm.value.designationId!,
        phone:this.editEmployeeForm.value.phone!,
        email:this.editEmployeeForm.value.email!,
        status:this.editEmployeeForm.value.status!
      }
      this.subscription=this.employeeService.editEmployee(data).subscribe({
        next:(succ)=>{
          if(succ.statusCode===200){
            this.dialogRef.close(true);
          }
        },
        error:(err)=>{
          console.log('error while updating employee')
        }
      })
    }
  }

   ngOnDestroy(): void {
    if(this.subscription){
    this.subscription.unsubscribe();
    }
   }

}
