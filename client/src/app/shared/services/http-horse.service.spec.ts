import { TestBed } from '@angular/core/testing';

import { HttpHorseService } from './http-horse.service';

describe('HttpHorseService', () => {
  let service: HttpHorseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpHorseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
