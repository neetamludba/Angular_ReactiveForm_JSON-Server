import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('TestService', () => {
  let service: TestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TestService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getAllCategories function', () => {
    expect(service.getAllCategories).toBeTruthy();
  }
  );

  it('should have getMatchedTestQuestions function', () => {
    expect(service.getMatchedTestQuestions).toBeTruthy();
  }
  );

  it('should have getTest function', () => {
    expect(service.getTest).toBeTruthy();
  }
  );

  it('should have getAllTest function', () => {
    expect(service.getAllTest).toBeTruthy();
  }
  );

  it('should have saveTest function', () => {
    expect(service.saveTest).toBeTruthy();
  }
  );

  it('should have deleteTest function', () => {
    expect(service.deleteTest).toBeTruthy();
  }
  );

  it('should have unDeleteTest function', () => {
    expect(service.unDeleteTest).toBeTruthy();
  }
  );

  it('should return the all categories data', async () => {
    // Arrange
    const expectedData = [
      { id: 1, categoryName: 'Category Description 1', active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false },
      { id: 2, categoryName: 'Category Description 2', active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false }
    ];

    // Act
    const promise = service.getAllCategories();
    const req = httpTestingController.expectOne('http://localhost:3000/test-category');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);

    // Assert
    const categoryData = await promise;
    expect(categoryData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should return the get matched test questions data', async () => {
    // Arrange
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
    // Act
    const promise = service.getMatchedTestQuestions(testID);
    const req = httpTestingController.expectOne('http://localhost:3000/test-question/?testID=1');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);

    // Assert
    const questionData = await promise;
    expect(questionData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should return the get test data', async () => {
    // Arrange
    const testID = 1;
    const expectedData = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };

    // Act
    const promise = service.getTest(testID);
    const req = httpTestingController.expectOne('http://localhost:3000/test/1');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);

    // Assert
    const testData = await promise;
    expect(testData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should return the get all test data', async () => {
    // Arrange
    const expectedData = [{ id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false }, { id: 2, description: 'Test 2', categoryID: 2, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false }]


    // Act
    const promise = service.getAllTest();
    const req = httpTestingController.expectOne('http://localhost:3000/test');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);

    // Assert
    const testData = await promise;
    expect(testData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });


  it('should create a new test if test.id is 0', async () => {
    // Arrange
    const test = { id: 0, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false, questions: [] };
    const testDataSave = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };

    // Act
    const promise = service.saveTest(test);
    const req = httpTestingController.expectOne((service as any).jsonServerURLTest);
    expect(req.request.method).toEqual('POST');
    req.flush(testDataSave);


    // Assert
    const testData = await promise;
    expect(testData).toEqual(testDataSave)


    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should update an existing test if test.id is not 0', async () => {
    // Arrange
    const test = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false, questions: [] };

    // Act
    const promise = service.saveTest(test);
    const req = httpTestingController.expectOne(`${(service as any).jsonServerURLTest}/${test.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush({});

    // Assert
    const testData = await promise;
    expect(testData).toEqual(test)

    httpTestingController.verify();

  });

  it('should create new question using private httpPostQuestion', async () => {
    // Arrange
    const question = { testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };
    const questionArray = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };

    // Act
    const promise = (service as any).httpPostQuestion(question);
    const req = httpTestingController.expectOne(`${(service as any).jsonServerURLQuestion}`);
    expect(req.request.method).toEqual('POST');
    req.flush(questionArray);

    // Assert
    const questionData = await promise;
    expect(questionData).toEqual(questionArray)

    httpTestingController.verify();

  });

  it('should create new questions associated with the test', async () => {
    // Arrange
    const test = { id: 0, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };
    const question = { id: 0, testID: 0, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };
    const questionArray = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };

    // Act
    (service as any).httpPostQuestion = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    const promise = service.saveTest({ ...test, questions: [question] });
    const req = httpTestingController.expectOne(`${(service as any).jsonServerURLTest}`);
    expect(req.request.method).toEqual('POST');
    req.flush(questionArray);

    // Assert
    await promise;

    expect((service as any).httpPostQuestion).toHaveBeenCalledWith(question);

    httpTestingController.verify();

  });

  it('should update existing questions using private httpPutQuestion', async () => {
    // Arrange
    const question = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };
    const questionArray = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };

    // Act
    // Note: Using 'any' to access the private methods
    const promise = (service as any).httpPutQuestion('http://localhost:3000/test-question/1', question);
    const req = httpTestingController.expectOne(`${(service as any).jsonServerURLQuestion}/${question.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(questionArray);

    // Assert
    const questionData = await promise;
    expect(questionData).toEqual(questionArray)

    httpTestingController.verify();

  });


  it('should update existing questions associated with the test', async () => {
    // Arrange
    const test = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };
    const question = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };

    // Act
    // Note: Using 'any' to access the private methods
    (service as any).httpPutQuestion = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    const promise = service.saveTest({ ...test, questions: [question] });
    const req = httpTestingController.expectOne(`${(service as any).jsonServerURLTest}/${test.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush({});
    // Assert
    await promise;

    // Note: Using 'any' to access the private methods

    expect((service as any).httpPutQuestion).toHaveBeenCalledWith(`${(service as any).jsonServerURLQuestion}/${question.id}`, question);

    httpTestingController.verify();

  });

  it('should patch data in deleteTest ', async () => {
    // Arrange
    const testID = 1;
    const expectedData = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };
    // Act
    const promise = service.deleteTest(testID);
    const req = httpTestingController.expectOne('http://localhost:3000/test/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(expectedData);

    // Assert
    expectedData.isDeleted = true;
    const categoryData = await promise;
    expect(categoryData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should reject with an error when testId is undefined', async () => {
    // Arrange
    const testId = undefined;

    // Act
    const promise = service.deleteTest(testId!);

    // Assert
    await expectAsync(promise).toBeRejectedWithError('Test ID is undefined');
  });

  it('should patch data in unDeleteTest', async () => {
    // Arrange
    const testID = 1;
    const expectedData = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };

    // Act
    const promise = service.unDeleteTest(testID);
    const req = httpTestingController.expectOne('http://localhost:3000/test/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(expectedData);
    // Assert
    expectedData.isDeleted = false;
    const categoryData = await promise;
    expect(categoryData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });


});
