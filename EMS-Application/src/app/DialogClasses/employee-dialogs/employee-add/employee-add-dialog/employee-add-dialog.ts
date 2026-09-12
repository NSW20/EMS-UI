import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../../../Services/employeeService/employee-service';
import { DesignationModel } from '../../../../Models/designation_model';
import { DepartmentService } from '../../../../Services/departmentService/department-service';
import { DesignationService } from '../../../../Services/designation-service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { single } from 'rxjs';
import { UserModel } from '../../../../Models/UserModel';
import { SIGNAL } from '@angular/core/primitives/signals';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  selector: 'app-employee-add-dialog',
  styleUrl: './employee-add-dialog.css',
  templateUrl: './employee-add-dialog.html',
})
export class EmployeeAddDialog implements OnInit {
  private snack: MatSnackBar = inject(MatSnackBar);
  private nfb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private empService: EmployeeService = inject(EmployeeService);
  private deptService: DepartmentService = inject(DepartmentService);
  private designationService: DesignationService = inject(DesignationService);
  private dialogRef: MatDialogRef<EmployeeAddDialog> = inject(MatDialogRef<EmployeeAddDialog>);
  departments: DepartmentDTO[] = [];
  designations: DesignationModel[] = [];

  employeeForm = this.nfb.group({
    fullName: this.nfb.control('', { validators: [Validators.required] }),
    email: this.nfb.control('', { validators: [Validators.required, Validators.email] }),
    phone: this.nfb.control('', { validators: [Validators.required] }),
    dateOfJoining: this.nfb.control(null, { validators: [Validators.required] }),
    departmentId: this.nfb.control(0, { validators: [Validators.required] }),
    designationId: this.nfb.control(0, { validators: [Validators.required] }),
    salary: this.nfb.control('', { validators: [Validators.required] }),
    status: this.nfb.control('Active', { validators: [Validators.required] }),
    userId: this.nfb.control(''),
  });

  ngOnInit(): void {
    this.loadDepartments();
    this.loadDesignations();
  }

  clearEmployeeForm(): void {
    this.employeeForm.reset();
  }
  loadDepartments(): void {
    this.deptService.getAllDepartment().subscribe({
      next: (succ) => {
        if (succ.statusCode === 200) {
          this.departments = succ.data;
        }
      },
      error: (err) => {
        console.log('error occured while fetching departments');
      },
    });
  }

  loadDesignations(): void {
    this.designationService.GetAllDesignations().subscribe({
      next: (succ) => {
        if (succ.statusCode === 200) {
          this.designations = succ.data;
          console.log(this.designations);
        }
      },
      error: (err) => {
        console.log('error occured while fetching designations');
      },
    });
  }
  loadUserDetails(): void {
    const emailId: string = this.employeeForm.get('email')?.value!;
    this.empService.getUserDetails(emailId).subscribe({
      next: (succ) => {
        if (succ.statusCode === 200) {
          this.employeeForm.patchValue({
            userId: succ.data.id,
          });
          console.log(succ.data);
        }
      },
      error: (err) => {

        console.log('error occured while fetching users');
      },
    });
  }

  addEmployeeSubmit(): void {
    console.log('add emp1');
    if (this.employeeForm.valid) {
      const emailId: string = this.employeeForm.get('email')?.value!;
      this.empService.getUserDetails(emailId).subscribe({
        next: (succ) => {
          if (succ.statusCode === 200) {
            console.log('add emp2');
            const addEmp: employeeAddDTO = {
              fullName: this.employeeForm.get('fullName')?.value!,
              email: this.employeeForm.get('email')?.value!,
              phone: this.employeeForm.get('phone')?.value!,
              dateOfJoining: new Date(this.employeeForm.get('dateOfJoining')?.value!),
              departmentId: Number(this.employeeForm.get('departmentId')?.value!),
              designationId: Number(this.employeeForm.get('designationId')?.value!),
              salary: this.employeeForm.get('salary')?.value!,
              status: this.employeeForm.get('status')?.value!,
              userId: succ.data.id,
            };
               console.log('Add employee1');
            this.empService.addNewEmployee(addEmp).subscribe({
              next: (succ) => {
                if (succ.statusCode === 200) {
                  console.log('Add employee');

                  this.dialogRef.close(true);
                }
              },
              error: (err) => {
                 this.snack.open('Some error occured while adding employee','close',{duration:3000})
                this.dialogRef.close(false);
              },
            });
            console.log(succ.data);
          }
        }
      });
    }
  }
  cancelAdd(): void {
    this.dialogRef.close(true);
  }
  employeeStatus: string[] = ['Active', 'Inactive', 'OnProbation', 'Resigned', 'Terminated'];
}
