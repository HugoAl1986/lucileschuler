import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWatchEventComponent } from './modal-watch-event.component';

describe('ModalWatchEventComponent', () => {
  let component: ModalWatchEventComponent;
  let fixture: ComponentFixture<ModalWatchEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWatchEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalWatchEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
