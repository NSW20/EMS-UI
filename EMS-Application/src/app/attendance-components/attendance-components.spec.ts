import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceComponents } from './attendance-components';

describe('AttendanceComponents', () => {
  let component: AttendanceComponents;
  let fixture: ComponentFixture<AttendanceComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
