import { AfterViewInit, Component,inject,OnDestroy,OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../Services/employeeService/employee-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule,NonNullableFormBuilder, FormsModule } from '@angular/forms';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeAddDialog } from '../DialogClasses/employee-dialogs/employee-add/employee-add-dialog/employee-add-dialog';
import { EmployeeUpdateDialoge } from '../DialogClasses/employee-dialogs/employee-edit/employee-update-dialoge/employee-update-dialoge';
import { EmployeeRemoveDialog } from '../DialogClasses/employee-dialogs/employee-remove/employee-remove-dialog/employee-remove-dialog';
import { MatSelectModule } from '@angular/material/select';
import { DepartmentService } from '../Services/departmentService/department-service';
import { DesignationService } from '../Services/designation-service';
import { DesignationModel } from '../Models/designation_model';
import { MatPaginator,MatPaginatorModule,PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, single, Subject, takeUntil, takeWhile } from 'rxjs';
import { DebounceTimer } from '@angular/core';
import { MatSort,MatSortModule } from '@angular/material/sort';
@Component({
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule,
    MatFormFieldModule, MatInputModule,MatSortModule,
    MatSelectModule,FormsModule, ReactiveFormsModule,MatPaginatorModule, MatDialogModule, MatTableModule],
  selector: 'app-employee-components',
  styleUrl: './employee-components.css',
  templateUrl: './employee-components.html',
})
export class EmployeeComponents implements OnInit,AfterViewInit,OnDestroy {
   private empService:EmployeeService=inject(EmployeeService);
   private nfb:NonNullableFormBuilder=inject(NonNullableFormBuilder);
   private matDialog:MatDialog=inject(MatDialog);
   private snackBar:MatSnackBar=inject(MatSnackBar);
   private cdk:ChangeDetectorRef=inject(ChangeDetectorRef);
  private deptService:DepartmentService=inject(DepartmentService);
  private designationService:DesignationService=inject(DesignationService);
  departments:DepartmentDTO[]=[];
  designations:DesignationModel[]=[]
   employeeColumns:string[]=['employeeId','fullName','email',
    'phone','dateOfJoining','departmentId','designationId','salary','status','userId','action']
   employeeData:employeeDTO[]=[];
   employeeDataSource=new MatTableDataSource<employeeDTO>([]);
      ngOnInit(): void {
        this.employeeDataSource.paginator=this.paginator;
        this.employeeDataSource.sort=this.sort;
        this.search.pipe(debounceTime(300),distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((term)=>{
          this.searchText=term;
          this.pageIndex=0;
          if(this.paginator){this.paginator.pageIndex=0}
          this.loadAllPaginatedEmployees();
        })
     this.loadAllPaginatedEmployees();
   }

@ViewChild (MatPaginator) paginator!:MatPaginator
@ViewChild (MatSort) sort!:MatSort
 searchText:string='';
 search=new Subject<string>();
 destroy$=new Subject<void>();
sortColumn:string='FullName'
sortOrder:'DESC'|'ASC'='ASC'
 pageIndex:number=0;
 pageSize:number=10;
 pageSizeOptions:number[]=[2,5,10,15,20];
 totalItems!:number;
  loadAllPaginatedEmployees():void{
    const pageNumber=this.pageIndex+1;
    this.empService.getAllEmployeesWithPagination(this.searchText,pageNumber,this.pageSize,this.sortColumn,this.sortOrder).subscribe({
      next:(succ)=>{
        if(succ.statusCode===200){
          this.employeeDataSource.data=succ.data;
          this.totalItems=succ.totalPage
         console.log(this.searchText)
          this.cdk.detectChanges();
        }
      },
      error:(err)=>{
        console.log('error occuered')
      }
    })
  }
onChangePage(value:PageEvent):void{
  this.pageIndex=value.pageIndex;
  this.pageSize=value.pageSize;
  this.loadAllPaginatedEmployees();
}
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((term)=>{
     const coulmnMap:Record<string,string>={
      'fullName':'FullName',
      'email':'Email'
     }
     this.sortColumn=coulmnMap[term.active]??term.active;
     this.sortOrder=term.direction?(term.direction.toUpperCase()==='ASC'?'ASC':'DESC'):'DESC'
     this.pageIndex=0
     if(this.paginator){this.paginator.pageIndex=0}
     this.loadAllPaginatedEmployees();
    })
  }
 ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
   loadAllEmployee():void{
           this.empService.getAllEmployees().subscribe({
        next:(succ)=>{
          if(succ.statusCode===200){
            this.employeeData=succ.data;
            // this.snackBar.open('Employees have been fetched successfully','close',{duration:3000})
            this.cdk.detectChanges();
          }
        },
        error:(err)=>{
          this.snackBar.open('Some error occured','close',{duration:3000})
        },
        complete:()=>{
          console.log('Employee observable has been executed')
        }
      })
   }

   onEmployeeAddDialog():void{
    const dialogRef=this.matDialog.open(EmployeeAddDialog,{
      width:'400',
      data:{}
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.loadAllPaginatedEmployees();
        this.snackBar.open('Employee has been added successfully','close',{duration:3000})
      }
    })
   }
   
   onEmployeeEditDialog(element:employeeDTO):void{
    const dialogRef=this.matDialog.open(EmployeeUpdateDialoge,{
      width:'400',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.loadAllPaginatedEmployees();
        this.snackBar.open('Employee has been updated successfully','close',{duration:3000})
      }
    })
   }
   
   onEmployeeRemoveDialog(element:employeeDTO):void{
    const dialogRef=this.matDialog.open(EmployeeRemoveDialog,{
      width:'400',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.loadAllPaginatedEmployees();
        this.snackBar.open('Employee has been updated successfully','close',{duration:3000})
      }
    })
   }
   onSearchText(value:string):void{
     this.search.next(value);
      this.searchText=value;
   }
   OnClear():void{
    this.search.next('');
    this.searchText=''
   }

}
