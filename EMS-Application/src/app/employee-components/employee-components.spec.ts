import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeComponents } from './employee-components';

describe('EmployeeComponents', () => {
  let component: EmployeeComponents;
  let fixture: ComponentFixture<EmployeeComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
