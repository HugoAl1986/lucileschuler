import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSendReportComponent } from './modal-send-report.component';

describe('ModalSendReportComponent', () => {
  let component: ModalSendReportComponent;
  let fixture: ComponentFixture<ModalSendReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSendReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSendReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
