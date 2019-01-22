import { TestBed } from '@angular/core/testing';

import { ReceptenServiceService } from './recepten-service.service';

describe('ReceptenServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceptenServiceService = TestBed.get(ReceptenServiceService);
    expect(service).toBeTruthy();
  });
});
