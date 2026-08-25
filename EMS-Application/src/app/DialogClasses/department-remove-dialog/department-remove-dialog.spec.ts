import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentRemoveDialog } from './department-remove-dialog';

describe('DepartmentRemoveDialog', () => {
  let component: DepartmentRemoveDialog;
  let fixture: ComponentFixture<DepartmentRemoveDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentRemoveDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentRemoveDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
