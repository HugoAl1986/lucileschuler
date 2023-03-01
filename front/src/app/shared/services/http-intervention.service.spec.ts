import { TestBed } from '@angular/core/testing';

import { HttpInterventionService } from './http-intervention.service';

describe('HttpInterventionService', () => {
  let service: HttpInterventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
