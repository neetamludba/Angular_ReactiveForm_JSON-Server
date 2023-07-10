import { TestBed } from '@angular/core/testing';

import { TestCategoryService } from './test-category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestCategoryService', () => {
  let service: TestCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestCategoryService],
      imports: [HttpClientTestingModule],
      

    });
    service = TestBed.inject(TestCategoryService);
  });

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



});
