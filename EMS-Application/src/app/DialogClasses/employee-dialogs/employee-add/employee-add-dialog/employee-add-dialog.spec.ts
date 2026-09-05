import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeAddDialog } from './employee-add-dialog';

describe('EmployeeAddDialog', () => {
  let component: EmployeeAddDialog;
  let fixture: ComponentFixture<EmployeeAddDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAddDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeAddDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
