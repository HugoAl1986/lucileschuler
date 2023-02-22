import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHorseComponent } from './create-horse.component';

describe('CreateHorseComponent', () => {
  let component: CreateHorseComponent;
  let fixture: ComponentFixture<CreateHorseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHorseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
