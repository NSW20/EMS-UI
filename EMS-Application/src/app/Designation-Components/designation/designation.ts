import { AfterViewInit, Component, inject, OnInit, viewChild, ViewChild } from '@angular/core';
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
import { Subject } from 'rxjs';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {  MatSortModule,MatSort,Sort } from '@angular/material/sort';
@Component({
  imports: [MatButtonModule, MatPaginatorModule,MatSortModule,MatIconModule,MatPaginator, MatProgressSpinnerModule, MatTableModule, MatDialogModule, MatPaginator],
  selector: 'app-designation',
  styleUrl: './designation.css',
  templateUrl: './designation.html',
})
export class Designation implements OnInit,AfterViewInit {

     private designationService:DesignationService=inject(DesignationService);
     private dialog:MatDialog=inject(MatDialog);
     private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
    designationData:DesignationModel[]=[];
    dataSource=new MatTableDataSource<DesignationModel>([]);
    displayedColumns: string[] = ['designationId','title','departmentId','actions'];
    sortColumn:string='title'
    sortOrder:'DESC'|'ASC'='ASC'
    pageNumber:number=1
    totalItems!:number
    searchText:string=''

      // Pagination / sorting defaults
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 50];
    pageIndex = 0; // zero-based for MatPaginator, API expects pageNumber starting at 1


  // private searchString=new Subject<string>();
 @ViewChild (MatPaginator) paginator!:MatPaginator
  @ViewChild (MatSort) sort!:MatSort
  ngOnInit(): void {
    this.dataSource.paginator=this.paginator
    this.dataSource.sort=this.sort;
    this.loadDesignationWithPaggination();
   }
  ngAfterViewInit(): void {
   this.sort.sortChange.subscribe((s:Sort)=>{
     const  columnMap:Record<string,string>={
    title:'Title'
    }
    this.sortColumn=columnMap[s.active]??s.active;
    this.sortOrder=s.direction?(s.direction.toUpperCase()==='ASC'?'ASC':'DESC'):'ASC'

    this.pageIndex=0
   if(this.paginator){this.paginator.pageIndex=0}
   this.loadDesignationWithPaggination();
   })

  }
   loadAllDesignation():void{
     this.designationService.GetAllDesignations().subscribe({
      next:(succ:APIResponseWrapper<DesignationModel[]>)=>{
        if(succ.statusCode===200){
        this.dataSource.data=succ.data;
        this.designationData=succ.data;
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
   onPageChange(event:PageEvent):void{
     this.pageIndex=event.pageIndex
     this.pageSize=event.pageSize
     this.loadDesignationWithPaggination();
   }

   loadDesignationWithPaggination():void{
    this.pageNumber=this.pageIndex+1;
    
    this.designationService.getDesignationWithPaggination(this.pageSize,this.pageNumber,this.searchText,this.sortOrder,this.sortColumn).subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          this.dataSource.data=succ.data
          this.totalItems=succ.totalPage
          this.cdk.detectChanges();
          console.log(this.designationData)
        }
      },
      error:(err)=>{
        console.log(err)
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
