import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentComponents } from './department-components';

describe('DepartmentComponents', () => {
  let component: DepartmentComponents;
  let fixture: ComponentFixture<DepartmentComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
