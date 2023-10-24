import { TestBed } from '@angular/core/testing';

import { TestAssignmentService } from './test-assignment.service';

describe('TestAssignmentService', () => {
  let service: TestAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
