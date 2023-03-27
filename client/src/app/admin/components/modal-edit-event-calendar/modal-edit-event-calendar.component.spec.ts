import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditEventCalendarComponent } from './modal-edit-event-calendar.component';

describe('ModalEditEventCalendarComponent', () => {
  let component: ModalEditEventCalendarComponent;
  let fixture: ComponentFixture<ModalEditEventCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditEventCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
