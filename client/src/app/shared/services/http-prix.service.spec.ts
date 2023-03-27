import { TestBed } from '@angular/core/testing';

import { HttpPrixService } from './http-prix.service';

describe('HttpPrixService', () => {
  let service: HttpPrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
