import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListDeletedComponent } from './category-list-deleted.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TestCategory } from 'src/app/models/category.model';
import { TestCategoryService } from '../test-category.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CategoryListDeletedComponent', () => {
  let component: CategoryListDeletedComponent;
  let fixture: ComponentFixture<CategoryListDeletedComponent>;
  let testCategoryServiceSpy: jasmine.SpyObj<TestCategoryService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spy objects for the TestCategoryService and Router.
    const spyTestCategoryService = jasmine.createSpyObj('TestCategoryService', ['getAllCategories', 'unDeleteCategory']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    // Configure the testing module with necessary components, modules, and providers.
    await TestBed.configureTestingModule({
      declarations: [CategoryListDeletedComponent],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TestCategoryService, useValue: spyTestCategoryService },
        { provide: Router, useValue: spyRouter }
      ]
    }).compileComponents();

    // Create a component fixture and get the component instance.
    fixture = TestBed.createComponent(CategoryListDeletedComponent);
    component = fixture.componentInstance;

    // Get the spy instances for the service and router.
    testCategoryServiceSpy = TestBed.inject(TestCategoryService) as jasmine.SpyObj<TestCategoryService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  // Test: Component creation.
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Test: Calling getAllDeletedCategories should fetch and populate deleted categories.
  it('should call getAllDeletedCategories', async () => {

    // Define sample deleted categories.
    const categories: TestCategory[] = [
      {
        id: 1,
        categoryName: 'TestCategory1',
        active: true,
        createdDate: new Date(),
        isDeleted: true
      },
      {
        id: 2,
        categoryName: 'TestCategory2',
        active: true,
        createdDate: new Date(),
        isDeleted: true
      }
    ];
    // Set up the testCategoryServiceSpy to return the sample categories.
    testCategoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(categories));

    // Trigger the method to fetch deleted categories.
    await component.getAllDeletedCategories();

    // Expectations: Method should have fetched categories, and dataSource should be populated.
    expect(testCategoryServiceSpy.getAllCategories).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(categories);
  });

  // Test: Calling unDeleteCategory should restore a deleted category.
  it('should call unDeleteCategory', async () => {
    // Define sample deleted categories.
    const categories: TestCategory[] = [
      {
        id: 1,
        categoryName: 'TestCategory1',
        active: true,
        createdDate: new Date(),
        isDeleted: true
      },
      {
        id: 2,
        categoryName: 'TestCategory2',
        active: true,
        createdDate: new Date(),
        isDeleted: true
      }
    ];
    // Set up the testCategoryServiceSpy to return the sample categories.
    testCategoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(categories)); // Update the property name

    // Call getAllDeletedCategories to populate the dataSource.
    await component.getAllDeletedCategories();

    // Trigger filtering and un-deleting a category.
    await component.doFilter('TestCategory1');
    expect(component.dataSource.filter).toEqual('testcategory1');

    await component.unDeleteCategory(2); // Call the unDeleteCategory method

    // Expectations: unDeleteCategory method should be called.
    expect(testCategoryServiceSpy.unDeleteCategory).toHaveBeenCalled();
  });

  // Test: Calling doFilter should update the data source filter.
  it('should call doFilter', () => {
    // Define sample deleted categories.
    const categories: TestCategory[] = [
      {
        id: 1,
        categoryName: 'TestCategory1',
        active: true,
        createdDate: new Date(),
        isDeleted: true
      },
      {
        id: 2,
        categoryName: 'TestCategory2',
        active: true,
        createdDate: new Date(),
        isDeleted: true
      }
    ];

    // Set up the testCategoryServiceSpy to return the sample categories.
    testCategoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(categories)); // Update the property name

    // Call getAllDeletedCategories to populate the dataSource.
    component.getAllDeletedCategories();

    // Trigger the doFilter method.
    component.doFilter('TestCategory1');

    // Expectations: The dataSource filter should be updated.
    expect(component.dataSource.filter).toEqual('testcategory1');
  });

  // Test: Calling unDeleteCategory should restore a deleted category and call unDeleteCategory method.
  it('should call unDeleteCategory on unDeleteCategory', async () => {
    // Define sample deleted categories.
    const testCategories: TestCategory[] = [
      {
        id: 1,
        categoryName: 'Category Description 1',
        active: true,
        createdDate: new Date(),
        isDeleted: true
      },
      {
        id: 2,
        categoryName: 'Category Description 2',
        active: true,
        createdDate: new Date(),
        isDeleted: true
      }
    ];

    // Set up the testCategoryServiceSpy to return the sample categories.
    testCategoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(testCategories));

    // Trigger change detection and async tasks completion.
    fixture.detectChanges(); // Trigger change detection

    await fixture.whenStable(); // Wait for async tasks to complete

    // Call unDeleteCategory method.
    component.unDeleteCategory(1);

    // Expectations: unDeleteCategory method should have been called.
    expect(testCategoryServiceSpy.unDeleteCategory).toHaveBeenCalled();

  }
  );

  // Test: Calling backToCategories should trigger navigation.
  it('should call backToCategories', () => {

    // Call the component's backToCategories method.
    component.backToCategories();

    // Expectations: Navigation should have been triggered.
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
  }
  );
});
