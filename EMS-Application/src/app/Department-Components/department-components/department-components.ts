import { AfterViewInit, Component,inject,OnInit, viewChild, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { DepartmentService } from '../../Services/departmentService/department-service';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule,MatSnackBar } from '@angular/material/snack-bar';
import { ɵEmptyOutletComponent } from "@angular/router";
import { DepartmentEditDialog } from '../../DialogClasses/department-edit-dialog/department-edit-dialog/department-edit-dialog';
import { DepartmentRemoveDialog } from '../../DialogClasses/department-remove-dialog/department-remove-dialog';
import { DepartmentAddDialog } from '../../DialogClasses/department-add-dialog/department-add-dialog/department-add-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator,MatPaginatorModule,PageEvent } from '@angular/material/paginator';
import { MatSort,MatSortModule,Sort  } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  imports: [    // Common Angular
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule],
  selector: 'app-department-components',
  styleUrl: './department-components.css',
  templateUrl: './department-components.html',
  standalone:true
})
export class DepartmentComponents implements OnInit,AfterViewInit {
  private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
  private departmentService:DepartmentService=inject(DepartmentService);
  private matDialogRef:MatDialog=inject(MatDialog);
  private matSnackBar:MatSnackBar=inject(MatSnackBar);
  departments:DepartmentDTO[]=[];
  datasourceDepartments = new MatTableDataSource<DepartmentDTO>([]);
  departmentColumns:string[]=['departmentId','name','description','actions']
  ngOnInit(): void {
        // connect datasource with paginator and sort
    this.datasourceDepartments.paginator = this.paginator;
    this.datasourceDepartments.sort = this.sort;
    this.loadAllPagginatedDepartments();
  }

  onPageChange(event:PageEvent):void{
   this.pageIndex=event.pageIndex
   this.pageSize=event.pageSize
   this.loadAllPagginatedDepartments();
  }

  @ViewChild (MatPaginator) paginator!:MatPaginator
  @ViewChild (MatSort) sort!:MatSort;
  pageSize=10
  pageIndex=0;
  pageSizeOptions=[5,10,15,20]
  pageNumber!:number;
  sortOrder:'ASC'|'DESC'='ASC'
  sortColumns:string='Name'
  totalItems!:number
  searchText:string=''
  
  loadAllDepartments():void{
    this.departmentService.getAllDepartment().subscribe({
      next:(result)=>{
        if(result.statusCode===200){
            this.departments=result.data;
            console.log(result.data)
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
 
    ngAfterViewInit(): void {

    // server-side sort handling
    this.sort.sortChange.subscribe((s: Sort) => {
      // map frontend header keys to backend column names if needed
      const columnMap: Record<string, string> = {
        departmentId: 'DepartmentId',
        name: 'Name',
        description: 'Description'
      };
      this.sortColumns = columnMap[s.active] ?? s.active;
      this.sortOrder = s.direction ? (s.direction.toUpperCase() === 'ASC' ? 'ASC' : 'DESC') : 'ASC';

      // reset to first page and fetch
      this.pageIndex = 0;
      if (this.paginator) { this.paginator.pageIndex = 0; }
      this.loadAllPagginatedDepartments();
    });
  }


  loadAllPagginatedDepartments(): void {
    this.pageNumber = this.pageIndex + 1; // API expects 1-based
    this.departmentService.getPaginatedDepartments(this.pageSize, this.pageNumber, this.searchText, this.sortOrder, this.sortColumns)
      .subscribe({
        next: (succ) => {
          console.log('Paginated response:', succ); // inspect this in console
          if (succ.statusCode === 200) {
            this.departments = succ.data || [];
            this.datasourceDepartments.data = this.departments;
            this.totalItems=succ.totalPage
            // }
            this.cdk.detectChanges();
          } else {
            this.matSnackBar.open('Failed to fetch departments', 'Close', { duration: 3000 });
          }
        },
        error: (err) => {
          console.error('Error fetching paginated departments', err);
          this.matSnackBar.open('Something went wrong while fetching departments', 'Close', { duration: 3000 });
        }
      });
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
    const dialog=this.matDialogRef.open(DepartmentEditDialog,{
      width:'400px',
      data:element
    })
    dialog.afterClosed().subscribe(result=>{
    if(result){
      this.loadAllDepartments();
      this.cdk.detectChanges();
    }
   })
  }
  openRemoveDialog(element:DepartmentDTO):void{
    const dialog=this.matDialogRef.open(DepartmentRemoveDialog,{
      width:'400px',
      data:element
    })
  dialog.afterClosed().subscribe(result=>{
    if(result){
      this.loadAllDepartments();
      this.cdk.detectChanges();
    }
  })
  }
}
