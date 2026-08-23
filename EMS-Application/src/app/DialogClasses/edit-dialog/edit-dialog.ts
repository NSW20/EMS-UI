import { Component,inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DesignationModel } from '../../Models/designation_model';
import { DesignationService } from '../../Services/designation-service';
import { MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';

@Component({
  imports: [MatDialogModule,ReactiveFormsModule,
   MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule,MatSnackBarModule],
  selector: 'app-edit-dialog',
  styleUrl: './edit-dialog.css',
  templateUrl: './edit-dialog.html',
})
export class EditDialog {
   private nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
   private designationService:DesignationService=inject(DesignationService);
   private dialogRef=inject(MatDialogRef<EditDialog>);
   private snackbar:MatSnackBar=inject(MatSnackBar);
   data:DesignationModel=inject(MAT_DIALOG_DATA);
   editReactiveForm=this.nfb.group({
    designationId:this.nfb.control(this.data.designationId,{validators:[Validators.required]}),
     title:this.nfb.control(this.data.title,{validators:[Validators.required]}),
      departmentId:this.nfb.control(this.data.departmentId,{validators:[Validators.required]})
   })

   OnEditSubmit():void{
      if(this.editReactiveForm.valid){
         const editModel:DesignationModel={
            designationId:Number(this.editReactiveForm.value.designationId!),
            title:this.editReactiveForm.value.title!,
            departmentId:Number(this.editReactiveForm.value.departmentId!),
         }
        this.designationService.UpdateDesignation(editModel,editModel.designationId).subscribe({
           next:(succ)=>{
                   if(succ.statusCode==200){
                   this.snackbar.open('Designation has been updated successfully','close',{duration:3000})
                    this.dialogRef.close(true);
                   }
              },
              error:(err)=>{
                  this.snackbar.open('Error while updating designation','close',{duration:3000})
              }
        })
      }
   }
   cancel(): void {
    this.dialogRef.close(false);
  }
}
