
import { Component,inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule,NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../../../Services/departmentService/department-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  imports: [MatDialogModule,MatFormFieldModule,
    MatInputModule,MatButtonModule,MatIconModule,MatSnackBarModule,ReactiveFormsModule],
  selector: 'app-department-add-dialog',
  styleUrl: './department-add-dialog.css',
  templateUrl: './department-add-dialog.html',
})
export class DepartmentAddDialog {
  private nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
  private dialogRef=inject(MatDialogRef<DepartmentAddDialog>);
  private departmentService:DepartmentService=inject(DepartmentService);
  private snackBar:MatSnackBar=inject(MatSnackBar);
  addDepartment=this.nfb.group({
    name:this.nfb.control('',{validators:[Validators.required]}),
    description:this.nfb.control('',{validators:[Validators.required]})
  })
  submitAddDepartment():void{
    console.log('clicked add')
    if(this.addDepartment.valid){
      const addNewDept:DepartmentAddDTO={
        name:this.addDepartment.value.name!,
        description:this.addDepartment.value.description!
      };
          this.departmentService.addDepartment(addNewDept).subscribe({
            next:(succ)=>{
               this.snackBar.open('Department has been added successfully','close',{duration:3000});
               this.dialogRef.close(true);
            },
             error:(err)=>{
              this.dialogRef.close(true);
               this.snackBar.open('Something went wrong while adding department','close',{duration:3000});
            }
          })
    }
  }
   closeDialog():void{
         this.dialogRef.close(false);
    }
}
