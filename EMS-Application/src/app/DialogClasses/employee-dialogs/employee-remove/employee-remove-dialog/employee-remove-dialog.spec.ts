import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeRemoveDialog } from './employee-remove-dialog';

describe('EmployeeRemoveDialog', () => {
  let component: EmployeeRemoveDialog;
  let fixture: ComponentFixture<EmployeeRemoveDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeRemoveDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeRemoveDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
