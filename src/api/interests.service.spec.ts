import { TestBed } from '@angular/core/testing';

import { InterestService } from './interests.service';

describe('InterestService', () => {
  let service: InterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});