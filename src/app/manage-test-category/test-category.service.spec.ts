import { TestBed } from '@angular/core/testing';
import { TestCategoryService } from './test-category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TestCategoryService', () => {
  let service: TestCategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Configure the testing module with the necessary providers and imports.
    TestBed.configureTestingModule({
      providers: [TestCategoryService],
      imports: [HttpClientTestingModule],
    });

    // Inject the TestCategoryService and HttpTestingController.
    service = TestBed.inject(TestCategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding HTTP requests after each test.
    httpTestingController.verify();
  });

  // Test: Service should be created.

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test: getCategory function should be defined.
  it('should have getCategory function', () => {
    expect(service.getCategory).toBeTruthy();
  });

  // Test: getAllCategories function should be defined.
  it('should have getAllCategories function', () => {
    expect(service.getAllCategories).toBeTruthy();
  });

  // Test: saveCategory function should be defined.
  it('should have saveCategory function', () => {
    expect(service.saveCategory).toBeTruthy();
  });

  // Test: deleteCategory function should be defined.
  it('should have deleteCategory function', () => {
    expect(service.deleteCategory).toBeTruthy();
  });

  // Test: unDeleteCategory function should be defined.
  it('should have unDeleteCategory function', () => {
    expect(service.unDeleteCategory).toBeTruthy();
  });

  // Test: parametrized async saveCategory function should be defined.
  it('should have parametrized async saveCategory function', () => {
    expect(service.saveCategory).toBeTruthy();
  });


  // Test: should save category if id equals to 0
  it('should save category if id equals to 0', async () => {
    let category = {
      id: 0,
      categoryName: 'Category Description 1',
      active: true,
      createdDate: new Date(),
      isDeleted: false
    };
    const expectedResponse = { ...category };

    // Act
    const promise = service.saveCategory(category);
    const req = httpTestingController.expectOne('http://localhost:4000/test-category');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);

    // Assert
    const result = await promise;
    expect(result).toBeTruthy();
  });

  // Test: should update category if id greater than 0
  it('should update category if id greater than to 0', async () => {
    let category = {
      id: 1,
      categoryName: 'Category Description 1',
      active: true,
      createdDate: new Date(),
      isDeleted: false
    };
    const expectedResponse = { ...category };

    // Act
    const promise = service.saveCategory(category);
    const req = httpTestingController.expectOne('http://localhost:4000/test-category/1');
    expect(req.request.method).toBe('PUT');
    req.flush(expectedResponse);

    // Assert
    const result = await promise;
    expect(result).toBeTruthy();
  });

  // Test: should return the category data
  it('should return the category data', async () => {
    // Arrange
    const categoryID = 1;
    const expectedData = { id: 1, categoryName: 'Category Description 1', active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };

    // Act
    const promise = service.getCategory(categoryID);
    const req = httpTestingController.expectOne('http://localhost:4000/test-category/1');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);

    // Assert
    const categoryData = await promise;
    expect(categoryData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  // ... Add more tests for other service methods ...

  // Test: should reject with an error when categoryId is undefined
  it('should reject with an error when categoryId is undefined', async () => {
    // Arrange
    const categoryId = undefined;

    // Act
    const promise = service.deleteCategory(categoryId!);

    // Assert
    await expectAsync(promise).toBeRejectedWithError('Category ID is undefined');
  });

  // Test: should patch data in unDeleteCategory
  it('should patch data in unDeleteCategory', async () => {
    // Arrange
    const categoryID = 1;
    const expectedData = { id: 1, categoryName: 'Category Description 1', active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: true };

    // Act
    const promise = service.unDeleteCategory(categoryID);
    const req = httpTestingController.expectOne('http://localhost:4000/test-category/1');
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