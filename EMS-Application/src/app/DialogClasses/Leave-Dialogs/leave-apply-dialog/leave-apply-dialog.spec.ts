import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveApplyDialog } from './leave-apply-dialog';

describe('LeaveApplyDialog', () => {
  let component: LeaveApplyDialog;
  let fixture: ComponentFixture<LeaveApplyDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveApplyDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveApplyDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
