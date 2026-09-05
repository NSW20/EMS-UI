import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeUpdateDialoge } from './employee-update-dialoge';

describe('EmployeeUpdateDialoge', () => {
  let component: EmployeeUpdateDialoge;
  let fixture: ComponentFixture<EmployeeUpdateDialoge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeUpdateDialoge],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeUpdateDialoge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
