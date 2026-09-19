import { Component,inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LeaveService } from '../../../Services/leaveService/leave-service';
import { CommonModule } from '@angular/common';
@Component({
  imports: [MatDialogModule,MatIconModule,MatButtonModule,CommonModule],
  selector: 'app-leave-remove-dialog',
  styleUrl: './leave-remove-dialog.css',
  templateUrl: './leave-remove-dialog.html',
})
export class LeaveRemoveDialog {
  private leaveService:LeaveService=inject(LeaveService);
  public data:leaveDTO=inject(MAT_DIALOG_DATA)
  private dialogRef:MatDialogRef<LeaveRemoveDialog>=inject(MatDialogRef<LeaveRemoveDialog>);

  onRemoveLeave():void{
    this.leaveService.removeLeave(this.data.leaveId).subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
             this.dialogRef.close(true);
        }
      },
      error:(err)=>{
        console.log('error occured while removing leave')
      }
    })
  }
}
