import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { DesignationService } from '../../Services/designation-service';
import { APIResponseWrapper, DesignationModel } from '../../Models/designation_model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { AddDialog } from '../../DialogClasses/add-dialog/add-dialog';
import { EditDialog } from '../../DialogClasses/edit-dialog/edit-dialog';
import { RemoveDialog } from '../../DialogClasses/remove-dialog/remove-dialog';
import { ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatError } from "@angular/material/form-field";
@Component({
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTableModule, MatDialogModule, MatPaginator],
  selector: 'app-designation',
  styleUrl: './designation.css',
  templateUrl: './designation.html',
})
export class Designation {
     private designationService:DesignationService=inject(DesignationService);
     private dialog:MatDialog=inject(MatDialog);
     private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
    designationData:DesignationModel[]=[];
    dataSource=new MatTableDataSource<DesignationModel>(this.designationData);
    displayedColumns: string[] = ['designationId','title','departmentId','actions'];

@ViewChild(MatPaginator) paginator!:MatPaginator

  ngOnInit(): void {
    this.loadAllDesignation();
   }
   loadAllDesignation():void{
     this.designationService.GetAllDesignations().subscribe({
      next:(succ:APIResponseWrapper<DesignationModel[]>)=>{
        if(succ.statusCode===200){
        this.designationData=succ.data;
        this.dataSource=new MatTableDataSource(this.designationData);
        this.dataSource.paginator=this.paginator;
        this.cdk.detectChanges();
        }
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log('Oversable executed');
      }
     })
   }
   openAddDialog():void{
    const dialogRef=this.dialog.open(AddDialog,{
      width:'400px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
       this.loadAllDesignation();
       this.cdk.detectChanges();
      }
    })
   }
   openEditDialog(element:DesignationModel):void{
    const dialogRef=this.dialog.open(EditDialog,{
      width:'400px',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.loadAllDesignation();
        this.cdk.detectChanges();
      }
    })
   }
   openRemoveDialog(element:DesignationModel):void{
    const dialogRef=this.dialog.open(RemoveDialog,{
      width:"500px",
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.loadAllDesignation();
        this.cdk.detectChanges();
      }
    })
   }
}
