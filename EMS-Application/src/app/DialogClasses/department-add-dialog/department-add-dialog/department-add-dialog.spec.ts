import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentAddDialog } from './department-add-dialog';

describe('DepartmentAddDialog', () => {
  let component: DepartmentAddDialog;
  let fixture: ComponentFixture<DepartmentAddDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentAddDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentAddDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
