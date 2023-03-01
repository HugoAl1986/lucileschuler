import { TestBed } from '@angular/core/testing';

import { HttpAdresseInterventionService } from './http-adresse-intervention.service';

describe('HttpAdresseInterventionService', () => {
  let service: HttpAdresseInterventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAdresseInterventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
