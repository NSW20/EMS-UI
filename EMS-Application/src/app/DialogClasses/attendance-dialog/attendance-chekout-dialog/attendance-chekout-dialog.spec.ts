import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceChekoutDialog } from './attendance-chekout-dialog';

describe('AttendanceChekoutDialog', () => {
  let component: AttendanceChekoutDialog;
  let fixture: ComponentFixture<AttendanceChekoutDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceChekoutDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceChekoutDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
