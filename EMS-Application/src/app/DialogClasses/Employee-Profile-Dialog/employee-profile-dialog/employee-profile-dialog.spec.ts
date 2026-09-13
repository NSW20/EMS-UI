import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeProfileDialog } from './employee-profile-dialog';

describe('EmployeeProfileDialog', () => {
  let component: EmployeeProfileDialog;
  let fixture: ComponentFixture<EmployeeProfileDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeProfileDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeProfileDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
