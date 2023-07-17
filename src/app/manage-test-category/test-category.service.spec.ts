import { TestBed } from '@angular/core/testing';

import { TestCategoryService } from './test-category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TestCategoryService', () => {
  let service: TestCategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestCategoryService],
      imports: [HttpClientTestingModule],


    });
    service = TestBed.inject(TestCategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getCategory function', () => {
    expect(service.getCategory).toBeTruthy();
  });

  it('should have getAllCategories function', () => {
    expect(service.getAllCategories).toBeTruthy();
  }
  );
  it('should have saveCategory function', () => {
    expect(service.saveCategory).toBeTruthy();
  }
  );
  it('should have deleteCategory function', () => {
    expect(service.deleteCategory).toBeTruthy();
  }
  );
  it('should have unDeleteCategory function', () => {
    expect(service.unDeleteCategory).toBeTruthy();
  }
  );

  it('should have parametrized async saveCategory function', () => {
    expect(service.saveCategory).toBeTruthy();
  }
  );

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
    const req = httpTestingController.expectOne('http://localhost:3000/test-category');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);

    // Assert
    const result = await promise;
    expect(result).toBeTruthy();
  }
  );


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
    const req = httpTestingController.expectOne('http://localhost:3000/test-category/1');
    expect(req.request.method).toBe('PUT');
    req.flush(expectedResponse);

    // Assert
    const result = await promise;
    expect(result).toBeTruthy();
  }
  );


  it('should return the category data', async () => {
    // Arrange
    const categoryID = 1;
    const expectedData = { id: 1, categoryName: 'Category Description 1', active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };

    // Act
    const promise = service.getCategory(categoryID);
    const req = httpTestingController.expectOne('http://localhost:3000/test-category/1');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);

    // Assert
    const categoryData = await promise;
    expect(categoryData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  }); 

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

  it('should patch data in deleteCategory ', async () => {
    // Arrange
    const categoryID = 1;
    const expectedData = { id: 1, categoryName: 'Category Description 1', active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };

    // Act
    const promise = service.deleteCategory(categoryID);
    const req = httpTestingController.expectOne('http://localhost:3000/test-category/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(expectedData);
    
    // Assert
    expectedData.isDeleted = true;
    const categoryData = await promise;
    expect(categoryData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  }); 

  it('should reject with an error when categoryId is undefined', async () => {
    // Arrange
    const categoryId = undefined;
  
    // Act
    const promise = service.deleteCategory(categoryId!);
  
    // Assert
    await expectAsync(promise).toBeRejectedWithError('Category ID is undefined');
  });

  it('should patch data in unDeleteCategory', async () => {
    // Arrange
    const categoryID = 1;
    const expectedData = { id: 1, categoryName: 'Category Description 1', active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: true };

    // Act
    const promise = service.unDeleteCategory(categoryID);
    const req = httpTestingController.expectOne('http://localhost:3000/test-category/1');
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
