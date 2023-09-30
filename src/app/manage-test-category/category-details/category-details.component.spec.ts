import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryDetailsComponent } from './category-details.component';
import { TestCategoryService } from '../test-category.service';

describe('CategoryDetailsComponent', () => {
  let component: CategoryDetailsComponent;
  let fixture: ComponentFixture<CategoryDetailsComponent>;
  let testCategoryService: TestCategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryDetailsComponent],
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      

      ],
      providers: [
        TestCategoryService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => '1' // Set the 'id' parameter value to '1'
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailsComponent);
    component = fixture.componentInstance;
    testCategoryService = TestBed.inject(TestCategoryService);
    spyOn(testCategoryService, 'getCategory').and.returnValue(
      Promise.resolve({
        categoryName: 'Test Category',
        active: true
      })
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component with category details', waitForAsync(async () => {
   
    // Arrange: Wait for the form to be initialized.
    await fixture.whenStable();
    
    // Assert: Verify that the category name is correctly initialized.

    expect(component.categoryDetailsForm.get('categoryName')?.value).toBe(
      'Test Category'
    );
  }));

  it('should show an error message for the category name field', () => {
    // Test showing error messages for category name validation.

    component.categoryDetailsForm.controls['categoryName'].setValue('');
    expect(component.showErrorMessage('categoryName')).toBe('Category name is required');

    component.categoryDetailsForm.controls['categoryName'].setValue('abc');
    expect(component.showErrorMessage('categoryName')).toBe('Category name must be 5 characters long');

    component.categoryDetailsForm.controls['categoryName'].setValue('valid category name');
    expect(component.showErrorMessage('categoryName')).toBe('');
  });

  it('should save the form data and navigate to the testCategory page', async () => {
    // Test saving the form data and navigation.

    spyOn(testCategoryService, 'saveCategory').and.returnValue(Promise.resolve());
    spyOn((component as any).router, 'navigateByUrl');

    component.categoryId = 1;
    component.categoryDetailsForm.controls['categoryName'].setValue('Test Category');
    component.categoryDetailsForm.controls['active'].setValue(true);
    component.categoryDate = '2023-06-27 10:00 AM';

    await component.saveForm();

    expect(testCategoryService.saveCategory).toHaveBeenCalledWith({
      id: 1,
      categoryName: 'Test Category',
      active: true,
      createdDate: '2023-06-27 10:00 AM',
      isDeleted: false
    });
    expect((component as any).router.navigateByUrl).toHaveBeenCalledWith('testCategory');
  });

  it('should cancel the form and navigate to the testCategory page', () => {
    // Test canceling the form and navigation.

    spyOn((component as any).router, 'navigateByUrl');

    component.cancelForm();

    expect((component as any).router.navigateByUrl).toHaveBeenCalledWith('testCategory');
  });

  it('should reset the form', () => {
    // Test resetting the form.

    spyOn(console, 'log');

    component.categoryDetailsForm.controls['categoryName'].setValue('Test Category');
    component.categoryDetailsForm.controls['active'].setValue(true);

    component.resetForm();

    expect(console.log).toHaveBeenCalledWith('Reset Button Works ');
    expect(component.categoryDetailsForm.value).toEqual({
      categoryName: '',
      active: false
    });
  });
});

