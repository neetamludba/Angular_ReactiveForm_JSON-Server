import { TestBed } from '@angular/core/testing';

import { TestAttemptService } from './test-attempt.service';

describe('TestAttemptService', () => {
  let service: TestAttemptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestAttemptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
