import { TestBed } from '@angular/core/testing';

import { ContactMailResponseService } from './contact-mail-response.service';

describe('ContactMailResponseService', () => {
  let service: ContactMailResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactMailResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
