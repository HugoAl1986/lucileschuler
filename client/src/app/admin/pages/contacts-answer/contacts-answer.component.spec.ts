import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsAnswerComponent } from './contacts-answer.component';

describe('ContactsAnswerComponent', () => {
  let component: ContactsAnswerComponent;
  let fixture: ComponentFixture<ContactsAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
