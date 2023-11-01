import { TestBed } from '@angular/core/testing';

import { TestAssignmentService } from './test-assignment.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Mock HttpClient and HttpTestingController for testing HTTP requests

describe('TestAssignmentService', () => {
  let service: TestAssignmentService;
  let httpTestingController: HttpTestingController; // Initialize the HttpTestingController for mocking HTTP requests

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestAssignmentService], // Provide the TestService as a dependency
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule for mocking HTTP requests
    });
    service = TestBed.inject(TestAssignmentService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  // After each test, verify that no outstanding HTTP requests are pending.
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
