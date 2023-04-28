import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryDetailsComponent } from './category-details.component';
import { TestCategoryService } from '../test-category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('CategoryDetailsComponent', () => {
  let component: CategoryDetailsComponent;
  let fixture: ComponentFixture<CategoryDetailsComponent>;
  let testCategoryService: TestCategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDetailsComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        TestCategoryService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '1' }) }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailsComponent);
    component = fixture.componentInstance;
    testCategoryService = TestBed.inject(TestCategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCategory method when initialized', () => {
    spyOn(component, 'getCategory');
    component.ngOnInit();
    expect(component.getCategory).toHaveBeenCalled();
  });

  it('should call saveCategory method of TestCategoryService when saveForm is called', async () => {
    spyOn(testCategoryService, 'saveCategory').and.returnValue(Promise.resolve());
    await component.saveForm();
    expect(testCategoryService.saveCategory).toHaveBeenCalled();
  });

  it('should call reset method of categoryDetailsForm when resetForm is called', () => {
    spyOn(component.categoryDetailsForm, 'reset');
    component.resetForm();
    expect(component.categoryDetailsForm.reset).toHaveBeenCalled();
  });

  it('should navigate to testCategory page when cancelForm is called', () => {
    spyOn(component.router, 'navigateByUrl').and.callThrough();
    component.cancelForm();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('testCategory');
  });

  it('should show error message for required field', () => {
    component.categoryDetailsForm.controls['categoryName'].setValue('');
    expect(component.showErrorMessage('categoryName')).toBe('Category name is required');
  });

  it('should show error message for minimum length validation', () => {
    component.categoryDetailsForm.controls['categoryName'].setValue('abc');
    expect(component.showErrorMessage('categoryName')).toBe('Category name must be 5 characters long');
  });

  it('should not show any error message when field is valid', () => {
    component.categoryDetailsForm.controls['categoryName'].setValue('valid input');
    expect(component.showErrorMessage('categoryName')).toBe('');
  });
});