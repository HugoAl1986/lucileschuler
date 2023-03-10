import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHorseComponent } from './delete-horse.component';

describe('DeleteHorseComponent', () => {
  let component: DeleteHorseComponent;
  let fixture: ComponentFixture<DeleteHorseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteHorseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteHorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
