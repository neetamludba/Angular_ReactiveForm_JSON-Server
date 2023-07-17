import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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

  it('should have getTestID function', () => {
    expect(service.getTestID).toBeTruthy();
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
    const expectedData = [ {
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
    const expectedData =   { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12-7-2023), isDeleted: false };
 
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
    const expectedData =  [ { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12-7-2023), isDeleted: false },    { id: 2, description: 'Test 2', categoryID: 2, active: true, createdDate: new Date(12-7-2023), isDeleted: false}]

 
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
});
