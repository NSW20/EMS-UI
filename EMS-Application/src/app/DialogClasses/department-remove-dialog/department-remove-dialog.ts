import { Component,inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DepartmentService } from '../../Services/departmentService/department-service';
@Component({
  imports: [MatButtonModule,MatDialogModule,MatIconModule,MatSnackBarModule],
  selector: 'app-department-remove-dialog',
  styleUrl: './department-remove-dialog.css',
  templateUrl: './department-remove-dialog.html',
})
export class DepartmentRemoveDialog {
   private departmentService:DepartmentService=inject(DepartmentService);
   private snackbar:MatSnackBar=inject(MatSnackBar);
   private dialogRef=inject(MatDialogRef<DepartmentRemoveDialog>);
   private data:DepartmentDTO=inject(MAT_DIALOG_DATA);

   departmentData:DepartmentDTO={
    departmentId:this.data.departmentId,
    name:this.data.name,
    description:this.data.description
   }

   OnRemove():void{
    this.departmentService.removeDepartment(this.departmentData.departmentId).subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          this.dialogRef.close(true);
          this.snackbar.open('Department has been deleted successfully','close',{duration:3000})
        }
      },
      error:(err)=>{
         this.dialogRef.close(true);
          this.snackbar.open('Something went wrong while deleting department','close',{duration:3000})
      },
      complete:()=>{
        console.log('Delete department observable has been executed.')
      }
    })
   }
   OnCancel():void{
    this.dialogRef.close(true);
   }

}
