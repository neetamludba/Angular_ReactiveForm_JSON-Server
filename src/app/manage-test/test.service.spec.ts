// Import necessary modules and the service for testing.
import { TestBed } from '@angular/core/testing'; // Angular testing utilities
import { TestService } from './test.service'; // The service being tested
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Mock HttpClient and HttpTestingController for testing HTTP requests

// Describe the test suite for the 'TestService'.
describe('TestService', () => {
  let service: TestService; // Initialize the TestService instance
  let httpTestingController: HttpTestingController; // Initialize the HttpTestingController for mocking HTTP requests

  // Set up the testing environment before running the tests.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestService], // Provide the TestService as a dependency
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule for mocking HTTP requests
    });

    // Initialize the TestService and HttpTestingController from TestBed
    service = TestBed.inject(TestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // After each test, verify that no outstanding HTTP requests are pending.
  afterEach(() => {
    httpTestingController.verify();
  });

  // Test to ensure that the service is created successfully.
  it('should be created', () => {
    expect(service).toBeTruthy(); // Expect that the service is truthy (it exists)
  });

  // Test to check if the 'getAllCategories' function exists in the service.
  it('should have getAllCategories function', () => {
    expect(service.getAllCategories).toBeTruthy();
  });

  // Test to check if the 'getMatchedTestQuestions' function exists in the service.
  it('should have getMatchedTestQuestions function', () => {
    expect(service.getMatchedTestQuestions).toBeTruthy();
  });

  // Test to check if the 'getTest' function exists in the service.
  it('should have getTest function', () => {
    expect(service.getTest).toBeTruthy();
  });

  // Test to check if the 'getAllTest' function exists in the service.
  it('should have getAllTest function', () => {
    expect(service.getAllTest).toBeTruthy();
  });

  // Test to check if the 'saveTest' function exists in the service.
  it('should have saveTest function', () => {
    expect(service.saveTest).toBeTruthy();
  });

  // Test to check if the 'deleteTest' function exists in the service.
  it('should have deleteTest function', () => {
    expect(service.deleteTest).toBeTruthy();
  });

  // Test to check if the 'unDeleteTest' function exists in the service.
  it('should have unDeleteTest function', () => {
    expect(service.unDeleteTest).toBeTruthy();
  });


  it('should return the all categories data', async () => {
    // Arrange: Define the expected data.
    const expectedData = [
      { id: 1, categoryName: 'Category Description 1', active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false },
      { id: 2, categoryName: 'Category Description 2', active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false }
    ];

    // Act: Call the service function and set up an HTTP request expectation.
    const promise = service.getAllCategories();
    const req = httpTestingController.expectOne('http://localhost:4000/test-category');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);

    // Assert: Verify the data returned by the service.
    const categoryData = await promise;
    expect(categoryData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should return the get matched test questions data', async () => {
    // Arrange: Define the expected data.
    const testID = 1;
    const expectedData = [{
      id: 1,
      testID: 1,
      question: 'Question 1',
      questionType: 'Type 1',
      active: true,
      isDeleted: false,
    },
    {
      id: 2,
      testID: 1,
      question: 'Question 2',
      questionType: 'Type 2',
      active: true,
      isDeleted: false,
    },]
    // Act: Call the service function and set up an HTTP request expectation.
    const promise = service.getMatchedTestQuestions(testID);
    const req = httpTestingController.expectOne('http://localhost:4000/test-question/?testID=1');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);

    // Assert: Verify the data returned by the service.
    const questionData = await promise;
    expect(questionData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should return the get test data', async () => {
    // Arrange: Define the expected data.
    const testID = 1;
    const expectedData = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };

    // Act: Call the service function and set up an HTTP request expectation.
    const promise = service.getTest(testID);
    const req = httpTestingController.expectOne('http://localhost:4000/test/1');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);

    // Assert: Verify the data returned by the service.
    const testData = await promise;
    expect(testData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should return the get all test data', async () => {
    // Arrange: Define the expected data.
    const expectedData = [{ id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false }, 
    { id: 2, description: 'Test 2', categoryID: 2, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false }]

    // Act: Call the service function and set up an HTTP request expectation.
    const promise = service.getAllTest();
    const req = httpTestingController.expectOne('http://localhost:4000/test');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);

    // Assert: Verify the data returned by the service.
    const testData = await promise;
    expect(testData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });


  it('should create a new test if test.id is 0', async () => {
    // Arrange: Define the expected data.
    const test = { id: 0, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false, questions: [] };
    const testDataSave = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };

    // Act: Call the service function and set up an HTTP request expectation.
    const promise = service.saveTest(test);
    const req = httpTestingController.expectOne((service as any).jsonServerURLTest);
    expect(req.request.method).toEqual('POST');
    req.flush(testDataSave);

    // Assert: Verify the data returned by the service.
    const testData = await promise;
    expect(testData).toEqual(testDataSave)


    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should update an existing test if test.id is not 0', async () => {
    // Arrange: Define the expected data.
    const test = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false, questions: [] };

    // Act: Call the service function and set up an HTTP request expectation.
    const promise = service.saveTest(test);
    const req = httpTestingController.expectOne(`${(service as any).jsonServerURLTest}/${test.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush({});

    // Assert: Verify the data returned by the service.
    const testData = await promise;
    expect(testData).toEqual(test)

    httpTestingController.verify();

  });

  it('should create new question using private httpPostQuestion', async () => {
    // Arrange: Define the expected data.
    const question = { testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };
    const questionArray = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };

    // Act: Call the service function and set up an HTTP request expectation.
    const promise = (service as any).httpPostQuestion(question);
    const req = httpTestingController.expectOne(`${(service as any).jsonServerURLQuestion}`);
    expect(req.request.method).toEqual('POST');
    req.flush(questionArray);

    // Assert: Verify the data returned by the service.
    const questionData = await promise;
    expect(questionData).toEqual(questionArray)

    httpTestingController.verify();

  });

  it('should create new questions associated with the test', async () => {
    // Arrange: Define the expected data.
    const test = { id: 0, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };
    const question = { id: 0, testID: 0, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };
    const questionArray = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };

    // Act: Call the service function and set up an HTTP request expectation.
    (service as any).httpPostQuestion = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    const promise = service.saveTest({ ...test, questions: [question] });
    const req = httpTestingController.expectOne(`${(service as any).jsonServerURLTest}`);
    expect(req.request.method).toEqual('POST');
    req.flush(questionArray);

    // Assert: Verify the data returned by the service.
    await promise;

    expect((service as any).httpPostQuestion).toHaveBeenCalledWith(question);

    httpTestingController.verify();

  });

  it('should update existing questions using private httpPutQuestion', async () => {
    // Arrange: Define the expected data.
    const question = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };
    const questionArray = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };

    // Act: Call the service function and set up an HTTP request expectation.
    // Note: Using 'any' to access the private methods
    const promise = (service as any).httpPutQuestion('http://localhost:4000/test-question/1', question);
    const req = httpTestingController.expectOne(`${(service as any).jsonServerURLQuestion}/${question.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(questionArray);

    // Assert: Verify the data returned by the service.
    const questionData = await promise;
    expect(questionData).toEqual(questionArray)

    httpTestingController.verify();

  });


  it('should update existing questions associated with the test', async () => {
    // Arrange: Define the expected data.
    const test = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };
    const question = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };

    // Act: Call the service function and set up an HTTP request expectation.
    // Note: Using 'any' to access the private methods
    (service as any).httpPutQuestion = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    const promise = service.saveTest({ ...test, questions: [question] });
    const req = httpTestingController.expectOne(`${(service as any).jsonServerURLTest}/${test.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush({});
    // Assert: Verify the data returned by the service.
    await promise;

    // Note: Using 'any' to access the private methods

    expect((service as any).httpPutQuestion).toHaveBeenCalledWith(`${(service as any).jsonServerURLQuestion}/${question.id}`, question);

    httpTestingController.verify();

  });

  it('should patch data in deleteTest ', async () => {
    // Arrange: Define the expected data.
    const testID = 1;
    const expectedData = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };
    // Act: Call the service function and set up an HTTP request expectation.
    const promise = service.deleteTest(testID);
    const req = httpTestingController.expectOne('http://localhost:4000/test/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(expectedData);

    // Assert: Verify the data returned by the service.
    expectedData.isDeleted = true;
    const categoryData = await promise;
    expect(categoryData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should reject with an error when testId is undefined', async () => {
    // Arrange: Define the expected data.
    const testId = undefined;

    // Act: Call the service function and set up an HTTP request expectation.
    const promise = service.deleteTest(testId!);

    // Assert: Verify the data returned by the service.
    await expectAsync(promise).toBeRejectedWithError('Test ID is undefined');
  });

  it('should patch data in unDeleteTest', async () => {
    // Arrange: Define the expected data.
    const testID = 1;
    const expectedData = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };

    // Act: Call the service function and set up an HTTP request expectation.
    const promise = service.unDeleteTest(testID);
    const req = httpTestingController.expectOne('http://localhost:4000/test/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(expectedData);
    // Assert: Verify the data returned by the service.
    expectedData.isDeleted = false;
    const categoryData = await promise;
    expect(categoryData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });


});
