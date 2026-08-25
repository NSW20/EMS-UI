import { Component,inject,OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { DepartmentService } from '../../Services/departmentService/department-service';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule,MatSnackBar } from '@angular/material/snack-bar';
import { ɵEmptyOutletComponent } from "@angular/router";
import { MatPaginatorModule,MatPaginator } from '@angular/material/paginator';
import { DepartmentEditDialog } from '../../DialogClasses/department-edit-dialog/department-edit-dialog/department-edit-dialog';
import { DepartmentRemoveDialog } from '../../DialogClasses/department-remove-dialog/department-remove-dialog';
import { DepartmentAddDialog } from '../../DialogClasses/department-add-dialog/department-add-dialog/department-add-dialog';
@Component({
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, ɵEmptyOutletComponent, MatPaginator],
  selector: 'app-department-components',
  styleUrl: './department-components.css',
  templateUrl: './department-components.html',
})
export class DepartmentComponents implements OnInit {
  private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
  private departmentService:DepartmentService=inject(DepartmentService);
  private matDialogRef:MatDialog=inject(MatDialog);
  private matSnackBar:MatSnackBar=inject(MatSnackBar);
  departments:DepartmentDTO[]=[];
  dataSource=new MatTableDataSource<DepartmentDTO>(this.departments);
  departmentColumns:string[]=['departmentId','name','description','actions']
  @ViewChild (MatPaginator)matPaginator!:MatPaginator;
  ngOnInit(): void {
    this.loadAllDepartments();
  }
  loadAllDepartments():void{
    this.departmentService.getAllDepartment().subscribe({
      next:(result)=>{
        if(result.statusCode===200){
            this.departments=result.data;
            this.matSnackBar.open('Successfully fetched all the departments','close',{duration:3000});
            console.log(result.data)
            this.dataSource=new MatTableDataSource(this.departments);
            this.dataSource.paginator=this.matPaginator;
            this.cdk.detectChanges();
        }
      },
      error:(err)=>{
               this.matSnackBar.open('Something went wrong while fetching the departments','close',{duration:3000});
      },
      complete:()=>{
        console.log('Observable executed');
      }
    })
  }
  openAddDialog():void{
   const dialog= this.matDialogRef.open(DepartmentAddDialog,{
      width:'400px',
      data:{}
    })
    dialog.afterClosed().subscribe(result=>{
      if(result){
        this.loadAllDepartments();
        this.cdk.detectChanges();
      }
    })
  }
  openEditDialog(element:DepartmentDTO):void{
    this.matDialogRef.open(DepartmentEditDialog,{
      width:'400px',
      data:element
    })
  }
  openRemoveDialog(element:DepartmentDTO):void{
    this.matDialogRef.open(DepartmentRemoveDialog,{
      width:'400px',
      data:element
    })
  }
}
