import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CategoryListComponent } from './category-list.component';
import { TestCategoryService } from '../test-category.service';
import { TestCategory } from 'src/app/models/category.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let testCategoryServiceSpy: jasmine.SpyObj<TestCategoryService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spyTestCategoryService = jasmine.createSpyObj('TestCategoryService', ['getAllCategories', 'deleteCategory','createCategory','editCategory','gotoDeletedCategories']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      imports: [
        MatIconModule,
        MatFormFieldModule,
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

    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    testCategoryServiceSpy = TestBed.inject(TestCategoryService) as jasmine.SpyObj<TestCategoryService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllCategories on ngAfterViewInit', async () => {

    const testCategories: TestCategory[] = [
      {
        id: 1,
        categoryName: 'Category Description 1',
        active: true,
        createdDate: new Date(),
        isDeleted: false
      },
      {
        id: 2,
        categoryName: 'Category Description 2',
        active: true,
        createdDate: new Date(),
        isDeleted: false
      }
    ];

    testCategoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(testCategories));

    fixture.detectChanges(); // Trigger change detection

    await fixture.whenStable(); // Wait for async tasks to complete

    expect(testCategoryServiceSpy.getAllCategories).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data[0]).toEqual(testCategories[0]);
    expect(component.dataSource.data[1]).toEqual(testCategories[1]);
    expect(component.dataSource.sort).toBe(component.sort);
  });

  it('should filter data source on doFilter', () => {
    const filterValue = 'category1';

    component.dataSource.data = [
      { id: 1, categoryName: 'Category1', active: true, createdDate: new Date(), isDeleted: false },
      { id: 2, categoryName: 'Category2', active: true, createdDate: new Date(), isDeleted: false },
      { id: 3, categoryName: 'Category3', active: true, createdDate: new Date(), isDeleted: false }
    ];
    component.doFilter(filterValue);

    expect(component.dataSource.filter).toBe(filterValue);
  });

  it('should navigate to create category on createCategory', () => {
    component.createCategory();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('testCategory/create');
  });


  it('should navigate to deleted categories on gotoDeletedCategories', () => {
    component.gotoDeletedCategories();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('testCategory/deleted');
  });

  it('should navigate to edit category on editCategory', () => {
    const categoryId = 1;
    component.editCategory(categoryId);

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`testCategory/${categoryId}`);
  });


  it('should call getAllCategories on refresh', async () => {
    const testCategories: TestCategory[] = [
      {
        id: 1,
        categoryName: 'Category Description 1',
        active: true,
        createdDate: new Date(),
        isDeleted: false
      },
      {
        id: 2,
        categoryName: 'Category Description 2',
        active: true,
        createdDate: new Date(),
        isDeleted: false
      }
    ];

    testCategoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(testCategories));

    fixture.detectChanges(); // Trigger change detection

    await fixture.whenStable(); // Wait for async tasks to complete

    component.refresh();

    expect(testCategoryServiceSpy.getAllCategories).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data[0]).toEqual(testCategories[0]);
    expect(component.dataSource.data[1]).toEqual(testCategories[1]);
    expect(component.dataSource.sort).toBe(component.sort);
  }
  );


  it('should call deleteCategory on deleteCategory', async () => {
    const testCategories: TestCategory[] = [
      {
        id: 1,
        categoryName: 'Category Description 1',
        active: true,
        createdDate: new Date(),
        isDeleted: false
      },
      {
        id: 2,
        categoryName: 'Category Description 2',
        active: true,
        createdDate: new Date(),
        isDeleted: false
      }
    ];

    testCategoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(testCategories));
    testCategoryServiceSpy.deleteCategory.and.returnValue(Promise.resolve());

    fixture.detectChanges(); // Trigger change detection

    await fixture.whenStable(); // Wait for async tasks to complete

    component.deleteCategory(1);

    expect(testCategoryServiceSpy.deleteCategory).toHaveBeenCalled();
  }
  );


});