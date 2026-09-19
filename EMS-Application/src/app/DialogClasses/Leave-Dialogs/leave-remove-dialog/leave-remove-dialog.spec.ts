import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveRemoveDialog } from './leave-remove-dialog';

describe('LeaveRemoveDialog', () => {
  let component: LeaveRemoveDialog;
  let fixture: ComponentFixture<LeaveRemoveDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveRemoveDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveRemoveDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
