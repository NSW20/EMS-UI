import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DesignationModel } from '../../Models/designation_model';
import { MatChipsModule } from '@angular/material/chips';
import { DesignationService } from '../../Services/designation-service';
import { MatSnackBarModule,MatSnackBar } from '@angular/material/snack-bar';
@Component({
  imports: [MatButtonModule, MatIconModule, MatDialogModule,MatChipsModule,MatSnackBarModule],
  selector: 'app-remove-dialog',
  styleUrl: './remove-dialog.css',
  templateUrl: './remove-dialog.html',
})
export class RemoveDialog {
  private data:DesignationModel=inject(MAT_DIALOG_DATA);
  private dialogRef=inject(MatDialogRef<RemoveDialog>);
  private designationService:DesignationService=inject(DesignationService);
  private snackBar:MatSnackBar=inject(MatSnackBar);
  public title:string=this.data.title;

  OnRemove():void{
    this.designationService.RemoveDesignation(this.data.designationId).subscribe({
      next:(succ)=>{
             if(succ.statusCode==200){
              this.snackBar.open('Designation has been removed successfully','close',{duration:3000})
              this.dialogRef.close(true);
             }
      },
      error:(err)=>{
            this.snackBar.open('Error while deleting designation','close',{duration:3000})
      }
    })
  }
  OnCancle(){
    this.dialogRef.close(false);
  }
}
