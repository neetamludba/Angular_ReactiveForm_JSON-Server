// Step 1: Import necessary modules and components for testing.
import { ComponentFixture, TestBed } from '@angular/core/testing'; // Angular testing utilities
import { TestDetailsComponent } from './test-details.component'; // The component being tested
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Mock HttpClient for testing HTTP requests
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Forms-related modules
import { MatCardModule } from '@angular/material/card'; // Angular Material card module
import { MatCheckboxModule } from '@angular/material/checkbox'; // Angular Material checkbox module
import { MatFormFieldModule } from '@angular/material/form-field'; // Angular Material form field module
import { MatInputModule } from '@angular/material/input'; // Angular Material input module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Angular animations module
import { ActivatedRoute, Router } from '@angular/router'; // Routing-related modules
import { RouterTestingModule } from '@angular/router/testing'; // Mock Router module for testing
import { TestService } from '../test.service'; // The service used in the component
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Angular Material dialog module
import { MatOptionModule } from '@angular/material/core'; // Angular Material core module
import { MatIconModule } from '@angular/material/icon'; // Angular Material icon module
import { MatSelectModule } from '@angular/material/select'; // Angular Material select module
import { MatTableModule } from '@angular/material/table'; // Angular Material table module
import { of } from 'rxjs'; // RxJS observable
import { QuestionDetailsComponent } from 'src/app/manage-question/question-details/question-details.component'; // Related component
import { Question } from 'src/app/models/question.model'; // Model for questions

// Step 2: Describe the test suite for the 'TestDetailsComponent'.
describe('TestDetailsComponent', () => {
  let component: TestDetailsComponent; // Initialize the component being tested
  let fixture: ComponentFixture<TestDetailsComponent>; // Initialize a test fixture for the component
  let testService: TestService; // Initialize the service used in the component
  let dialog: MatDialog; // Initialize the dialog service
  let router: Router; // Initialize the router service
  let testDetailsForm: FormGroup; // Initialize the form group for test details

  // Step 3: Set up the testing environment before running the tests.
  beforeEach(async () => {
    // Step 4: Create a form group for test details with a form control and validation
    testDetailsForm = new FormGroup({
      fieldName: new FormControl('', Validators.minLength(5))
    });

    await TestBed.configureTestingModule({
      declarations: [TestDetailsComponent], // Declare the component to be tested
      imports: [
        RouterTestingModule, // Import the mock RouterTestingModule
        HttpClientTestingModule, // Import the mock HttpClientTestingModule for testing HTTP requests
        MatCardModule, // Import Angular Material card module
        MatFormFieldModule, // Import Angular Material form field module
        MatInputModule, // Import Angular Material input module
        MatSelectModule, // Import Angular Material select module
        MatCheckboxModule, // Import Angular Material checkbox module
        ReactiveFormsModule, // Import the ReactiveFormsModule for forms
        BrowserAnimationsModule, // Import Angular animations module
        MatDialogModule, // Import Angular Material dialog module
        MatOptionModule, // Import Angular Material core module
        MatIconModule, // Import Angular Material icon module
        MatTableModule, // Import Angular Material table module
      ],
      providers: [
        TestService, // Provide the TestService as a dependency
        {
          provide: ActivatedRoute, // Provide a mock ActivatedRoute with a predefined 'id' parameter
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => '1', // Set the 'id' parameter value to '1'
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDetailsComponent); // Create a fixture for the component
    component = fixture.componentInstance; // Initialize the component from the fixture
    testService = TestBed.inject(TestService); // Initialize the test service from TestBed
    dialog = TestBed.inject(MatDialog); // Initialize the dialog service from TestBed
    router = TestBed.inject(Router); // Initialize the router service from TestBed

    // Step 5: Create spies for service methods and set their return values
    spyOn(testService, 'getAllCategories').and.returnValue(
      Promise.resolve([
        { id: 1, categoryName: 'Category 1', active: true, createdDate: new Date(2023, 6, 12), isDeleted: false },
        { id: 2, categoryName: 'Category 2', active: true, createdDate: new Date(2023, 6, 12), isDeleted: false },
      ])
    );

    spyOn(testService, 'getTest').and.returnValue(
      Promise.resolve({
        id: 1,
        description: 'Test Description',
        categoryID: 1,
        active: true,
      })
    );

    spyOn(testService, 'getMatchedTestQuestions').and.returnValue(
      Promise.resolve([
        {
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
        },
      ])
    );
  });

  // Step 6: Run a test to ensure that the component is created successfully.
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return an empty string when the field length is equal to 5', () => {
    // Arrange
    testDetailsForm.get('fieldName')?.setValue('valid');

    // Act
    const errorMessage = component.showErrorMessage('fieldName');

    // Assert
    expect(errorMessage).toBe('');
  });

  it('should return an empty string when there are no errors', () => {
    // Arrange
    testDetailsForm.get('fieldName')?.setValue('valid description');

    // Act
    const errorMessage = component.showErrorMessage('fieldName');

    // Assert
    expect(errorMessage).toBe('');
  });

  it('should initialize form and load test details', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.testDetailsForm.get('description')?.value).toBe(
      'Test Description'
    );
    expect(component.testDetailsForm.get('categoryID')?.value).toBe(1);
    expect(component.testDetailsForm.get('active')?.value).toBe(true);
  });

  it('should load test categories', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(testService.getAllCategories).toHaveBeenCalled();
    expect(component.testCategories).toEqual([
      { id: 1, categoryName: 'Category 1', active: true, createdDate: new Date(2023, 6, 12), isDeleted: false },
      { id: 2, categoryName: 'Category 2', active: true, createdDate: new Date(2023, 6, 12), isDeleted: false },
    ]);
  });

  it('should filter questions', () => {
    component.dsQuestions.data = [
      {
        id: 1,
        testID: 1,
        question: 'Question 1',
        questionType: 1,
        mandatory: true,
        options: 'x,y,z',
        correctAnswers: '2',
        active: true,
        isDeleted: false,
      },
      {
        id: 2,
        testID: 1,
        question: 'Question 2',
        questionType: 2,
        mandatory: true,
        options: 'a,b,c',
        correctAnswers: '2',
        active: true,
        isDeleted: false,
      },
    ];

    component.doFilter('Question 1');
    expect(component.dsQuestions.filter).toBe('question 1');

    component.doFilterDeleted('Question 2');
    expect(component.dsDeletedQuestions.filter).toBe('question 2');
  });

  it('should change category', () => {
    const e = {
      target: {
        value: 2,
      },
    };
    component.changeCategory(e);

    expect(component.testDetailsForm.value).toEqual({
      categoryID: 2,
      description: null,
      active: null,
    });
  });

  it('should open dialog for question editing', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of({ id: 1, question: 'Question 1' }),
    } as any);

    component.editQuestion(-1);

    expect(dialog.open).toHaveBeenCalledWith(QuestionDetailsComponent, {
      data: {
        id: -1,
        testID: 0,
        options: 'a,b,c',
      },
      width: '750px',
    });
    expect(component.filteredTestQuestions).toEqual([
      {
        id: 1,
        testID: 0,
        question: 'Question 1',
      },
    ]);
    expect(component.testDetailsForm.dirty).toBeTrue();
  });

  it('should log the error when an error occurs during saving', async () => {
    // Arrange
    const testError = new Error('Test error');
    spyOn(console, 'log');
    spyOn(testService, 'saveTest').and.throwError(testError);

    // Act
    await component.saveTest();

    // Assert
    expect(console.log).toHaveBeenCalledWith(testError);
  });

  it('should handle undefined error when saving', async () => {
    // Arrange
    spyOn(console, 'log');
    spyOn(testService, 'saveTest').and.returnValue(Promise.reject(undefined));

    // Act
    await component.saveTest();

    // Assert
    expect(console.log).toHaveBeenCalledWith(undefined);
  });

  it('should save test', async () => {
    spyOn(testService, 'saveTest').and.stub();
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();
    fixture.detectChanges();
    await fixture.whenStable();
    component.testDate = '2023-07-12 08:05 PM';
    component.saveTest();

    await expect(testService.saveTest).toHaveBeenCalledWith({
      id: 1,
      description: 'Test Description',
      categoryID: 1,
      active: true,
      createdDate: '2023-07-12 08:05 PM',
      isDeleted: false,
      questions: [
        {
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
        },
      ],
    });

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/test')
  });

  it('should delete a question', () => {
    // Mock data
    const questionIndex = 0;
    const crntQuestion: Question = {
      id: 1,
      testID: 1,
      question: 'Question 1',
      questionType: 1,
      mandatory: true,
      options: 'x,y,z',
      correctAnswers: '2',
      active: true,
      isDeleted: false,
    };
    const filteredTestQuestions: Question[] = [crntQuestion];
    const deletedTestQuestions: Question[] = [];

    // Set component properties
    component.filteredTestQuestions = filteredTestQuestions;
    component.deletedTestQuestions = deletedTestQuestions;

    // Call the deleteQuestion method
    component.deleteQuestion(questionIndex);

    // Assert that the question was deleted
    expect(component.filteredTestQuestions.length).toBe(0);
    expect(component.filteredTestQuestions[questionIndex]).toBeUndefined();
    expect(component.deletedTestQuestions.length).toBe(1);
    expect(component.deletedTestQuestions[0].isDeleted).toBe(true);

    // Assert that other properties are updated as expected
    expect(component.dsQuestions.data.length).toBe(0);
    expect(component.dsDeletedQuestions.data.length).toBe(1);
    expect(component.testDetailsForm.dirty).toBe(true);
  });

  it('should add a Question', async () => {
    // Mock data
    const questionIndex = 0;
    const crntQuestion: Question = {
      id: 1,
      testID: 1,
      question: 'Question 1',
      questionType: 1,
      mandatory: true,
      options: 'x,y,z',
      correctAnswers: '2',
      active: true,
      isDeleted: true,
    };
    const filteredTestQuestions: Question[] = [];
    const deletedTestQuestions: Question[] = [crntQuestion];

    // Set component properties
    component.filteredTestQuestions = filteredTestQuestions;
    component.deletedTestQuestions = deletedTestQuestions;

    // Call the deleteQuestion method
    component.addQuestion(questionIndex);

    // Assert that the question was deleted
    expect(component.deletedTestQuestions.length).toBe(0);
    expect(component.deletedTestQuestions[questionIndex]).toBeUndefined();
    expect(component.filteredTestQuestions.length).toBe(1);
    expect(component.filteredTestQuestions[0].isDeleted).toBe(false);

    // Assert that other properties are updated as expected
    expect(component.dsQuestions.data.length).toBe(1);
    expect(component.dsDeletedQuestions.data.length).toBe(0);
    expect(component.testDetailsForm.dirty).toBe(true);

  });

  it('should clese form', async () => {
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();

    fixture.detectChanges();
    await fixture.whenStable();

    component.closeForm();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/test')
  });

});