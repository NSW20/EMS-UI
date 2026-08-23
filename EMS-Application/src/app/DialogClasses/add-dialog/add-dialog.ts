import { Component,inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { DesignationService } from '../../Services/designation-service';
import { DesignationAddModel, DesignationModel } from '../../Models/designation_model';
import { MatSnackBarModule,MatSnackBar } from '@angular/material/snack-bar';

@Component({
  imports: [MatFormFieldModule, MatSnackBarModule,MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule,MatDialogModule],
  selector: 'app-add-dialog',
  styleUrl: './add-dialog.css',
  templateUrl: './add-dialog.html',
})
export class AddDialog {
    private nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
    private dialogRef=inject(MatDialogRef<AddDialog>);
    private designationService:DesignationService=inject(DesignationService);
    private snackBar:MatSnackBar=inject(MatSnackBar);
      addDesignation=this.nfb.group({
        title:this.nfb.control('',{validators:[Validators.required]}),
        departmentId:this.nfb.control('',{validators:Validators.required})
      })
      resetForm():void{
        this.addDesignation.reset();
      }
      OnSubmit():void{
          if(this.addDesignation.valid){
            const addModel:DesignationAddModel={
              title:this.addDesignation.value.title!,
              departmentId:Number(this.addDesignation.value.departmentId!)
            }
            this.designationService.AddDesignation(addModel).subscribe({
              next:(succ)=>{
                   if(succ.statusCode==200){
                    this.snackBar.open('Designation has been added successfully','Close', { duration: 3000 })
                    this.dialogRef.close(true);
                   }
              },
              error:(err)=>{
                  this.snackBar.open('Error adding designation', 'Close', { duration: 3000 });
              }
            })
          }
      }
       cancel(): void {
    this.dialogRef.close(false);
  }
      
}
