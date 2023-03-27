import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteInterventionComponent } from './modal-delete-intervention.component';

describe('ModalDeleteInterventionComponent', () => {
  let component: ModalDeleteInterventionComponent;
  let fixture: ComponentFixture<ModalDeleteInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteInterventionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
