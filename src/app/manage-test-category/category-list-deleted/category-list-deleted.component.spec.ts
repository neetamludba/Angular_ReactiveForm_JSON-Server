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
    const spyTestCategoryService = jasmine.createSpyObj('TestCategoryService', ['getAllCategories', 'unDeleteCategory']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

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

    fixture = TestBed.createComponent(CategoryListDeletedComponent);
    component = fixture.componentInstance;
    testCategoryServiceSpy = TestBed.inject(TestCategoryService) as jasmine.SpyObj<TestCategoryService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllDeletedCategories', async () => {
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
    testCategoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(categories));
    await component.getAllDeletedCategories();
    expect(testCategoryServiceSpy.getAllCategories).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(categories);
  });

  it('should call unDeleteCategory', async () => {
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
    testCategoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(categories)); // Update the property name
    await component.getAllDeletedCategories();
    await component.doFilter('TestCategory1');
    expect(component.dataSource.filter).toEqual('testcategory1');

    await component.unDeleteCategory(2); // Call the unDeleteCategory method

    expect(testCategoryServiceSpy.unDeleteCategory).toHaveBeenCalled();
  });

  it('should call doFilter', () => {
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
    testCategoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(categories)); // Update the property name
    component.getAllDeletedCategories();
    component.doFilter('TestCategory1');
    expect(component.dataSource.filter).toEqual('testcategory1');
  });


  it('should call unDeleteCategory on unDeleteCategory', async () => {
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

    testCategoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(testCategories));

    fixture.detectChanges(); // Trigger change detection

    await fixture.whenStable(); // Wait for async tasks to complete

    component.unDeleteCategory(1);

    expect(testCategoryServiceSpy.unDeleteCategory).toHaveBeenCalled();

  }
  );


  it('should call backToCategories', () => {
    component.backToCategories();
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
  }
  );
});
