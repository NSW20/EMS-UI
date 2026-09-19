import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveEditDialog } from './leave-edit-dialog';

describe('LeaveEditDialog', () => {
  let component: LeaveEditDialog;
  let fixture: ComponentFixture<LeaveEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveEditDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
