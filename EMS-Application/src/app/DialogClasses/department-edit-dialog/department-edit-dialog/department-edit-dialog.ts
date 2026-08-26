import { Component,inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DepartmentService } from '../../../Services/departmentService/department-service';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  imports: [MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, ReactiveFormsModule,MatDialogModule],
  selector: 'app-department-edit-dialog',
  styleUrl: './department-edit-dialog.css',
  templateUrl: './department-edit-dialog.html',
})
export class DepartmentEditDialog {
   private dialogRef=inject(MatDialogRef<DepartmentEditDialog>);
   private dialogData:DepartmentDTO=inject(MAT_DIALOG_DATA);
   private nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
   private departmentService:DepartmentService=inject(DepartmentService);
   private snackBar:MatSnackBar=inject(MatSnackBar);
  editDepartmentModule=this.nfb.group({
  departmentId:this.nfb.control(this.dialogData.departmentId,{validators:[Validators.required]}),
   name:this.nfb.control(this.dialogData.name,{validators:[Validators.required]}),
  description:this.nfb.control(this.dialogData.description,{validators:[Validators.required]})
   });
  
   resetForm():void{
    this.editDepartmentModule.reset();
   }

   editDepartmentSubmit():void{
    if(this.editDepartmentModule.valid){
      const editModel:DepartmentDTO={
        departmentId:Number(this.editDepartmentModule.value.departmentId!),
        name:this.editDepartmentModule.value.name!,
        description:this.editDepartmentModule.value.description!
      }
    this.departmentService.updateDepartment(editModel,editModel.departmentId).subscribe({
      next:(succ)=>{
           if(succ.statusCode===200){
            this.dialogRef.close(true);
            this.snackBar.open('Department has been updated successfully','close',{duration:3000})
           }
      },
      error:(err)=>{
         this.dialogRef.close(true);
            this.snackBar.open('Something went wrong while updating department.','close',{duration:3000})
      },
      complete:()=>{
        console.log('department update observable executed successfully');
      }
    })
    }
    
   }
   clearForm():void{
    this.dialogRef.close(true);
   }
}
